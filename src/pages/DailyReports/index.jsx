import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Space, Table, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useLazyGetAllReportsQuery, useLazyGetReportsForUserQuery, useLazyGetReportByIdQuery, useLazyGetReportByIdForUserQuery } from '@/redux/api/report/apiReport';
import { FilterBarDailyReports, ViewDrawerDailyReports } from '@/pages/DailyReports/components';
import { EditDailyReport } from '@/pages/DailyReports/modals';
import { useModal } from '@/pages/Users/modals';
import { RenderIf } from '@/shared/components';
import { useLazyGetProfileQuery } from '@/redux/api/auth/apiAuth';
import './report.scss';


const columns = (handlerShow, profile) => {
  return [
    {
      title: 'Employee ',
      dataIndex: 'name',
      key: 'name',
      value: 'name'
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      value: 'projectName'
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      value: 'createdDate'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      value: 'note',
      render: (text) => <div dangerouslySetInnerHTML={{__html:text}}/>
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <>
          <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin' || profile?.role === 'Head'} >
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon'>
                  <EyeOutlined onClick={() => handlerShow(record , "view" )} style={{ fontSize: '16px' }} />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
          <RenderIf condition={profile?.role === 'Employee'}>
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon'>
                  <EyeOutlined onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }} />
                </span>
              </Tooltip>
              <Tooltip title="edit">
                <span className='edit-icon'>
                  <EditOutlined onClick={() => handlerShow(record ,"edit")} style={{ fontSize: '16px' }} />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
        </>
      ),
    },
  ];
}



const DailyReports = () => {

  const [getReportById, ReportByIdResult] = useLazyGetReportByIdQuery({ queryKey: "ReportById" });
  const [getReportByIdForUser, ReportByIdForUserResult] = useLazyGetReportByIdForUserQuery({ queryKey: "ReportByIdForUser" });
  const profile = useSelector((state) => state.auth.profile)
  const [getProfile,] = useLazyGetProfileQuery();
  const [getAllReports,] = useLazyGetAllReportsQuery(); 
  const [getReportsForUser,] = useLazyGetReportsForUserQuery(); 
  const showReports = useSelector((state) => state.dailyReports?.showReports);
  const showReportsForUser = useSelector((state) => state.dailyReports?.showReportsForUser);

  console.log(showReportsForUser);

  useEffect(() => {
    if (profile?.role === 'SuperAdmin' || profile?.role === 'Admin' || profile?.role === 'Head') {
      getAllReports();
    }
    else if (profile?.role === 'Employee') {
      getProfile();
      getReportsForUser();
    }
  }, [])

  const editModal = useModal();


  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  const onCloseView = () => {
    setOpenViewDrawer(false);
  };


  const crudView = {
    "edit": () => editModal.showModal(),
    "view": () => setOpenViewDrawer(true),
  }

  const handlerShow = (record, name = "") => {
    crudView[name]();
    if (profile?.role === 'SuperAdmin' || profile?.role === 'Admin' || profile?.role === 'Head') {
      getReportById(record?.key);
    }
    else if (profile?.role === 'Employee') {
      getReportByIdForUser(record?.key);
    }
  }

  const newReportsData = useMemo(() => {
    return showReports?.map(item => ({
      key: item?.id,
      name: item?.user,
      projectName: item?.project,
      createdDate: item?.recordDate,
      note: item?.text,
    }))
  }, [showReports])


  const selfReportsData = useMemo(() => {
    return showReportsForUser?.map(item => ({
      key: item?.id,
      name: item?.user,
      projectName: item?.project,
      createdDate: item?.recordDate,
      note: item?.text,
    }))
  }, [showReportsForUser])



  return (
    
    <div className='dailyReport'>
      <FilterBarDailyReports />
      <Table columns={columns(handlerShow, profile)} dataSource={profile?.role === 'Employee' ? selfReportsData : newReportsData} pagination={{ pageSize: 6 }} />
      <EditDailyReport isModalOpen={editModal.isModalOpen} handleOk={editModal.handleOk} handleCancel={editModal.handleCancel} selectedReport={ReportByIdForUserResult?.data} />
      <ViewDrawerDailyReports onClose={onCloseView} openView={openViewDrawer} viewReportData={profile?.role==='Employee' ? ReportByIdForUserResult?.data : ReportByIdResult?.data }   />
    </div>
  )
}


export default DailyReports;
