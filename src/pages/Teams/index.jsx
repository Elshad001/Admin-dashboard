import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { DeleteTeam, EditTeam } from '@/pages/Teams/modals';
import { useModal } from '@/pages/Users/modals';
import { FilterBarTeams } from '@/pages/Teams/components';
import { ViewDrawerTeams } from '@/pages/Teams/components';
import { useLazyGetTeamsQuery } from '@/redux/api/team/apiTeam';
import { RenderIf } from '@/shared/components';
import { useLazyGetTeamByIdQuery } from '@/redux/api/team/apiTeam';
import './teams.scss';



const columns = ( handlerShow, profile) => {
  return [
    {
      title: 'Team Name',
      dataIndex: 'teamName',
      key: 'teamName',
      value: 'teamName'
    },

    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <>
          <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'} >
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon' onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }}>
                  <EyeOutlined />
                </span>
              </Tooltip>
              <Tooltip title="edit">
                <span className='edit-icon' onClick={() => handlerShow(record,"edit")}>
                  <EditOutlined />
                </span>
              </Tooltip>
              <Tooltip title="delete" >
                <span className='actions-icon delete-icon' onClick={() => handlerShow(record,"delete")} >
                  <DeleteOutlined />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
          <RenderIf condition={profile?.role === 'Head'} >
            <Tooltip title="view">
              <span className='view-icon' onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }}>
                <EyeOutlined />
              </span>
            </Tooltip>
          </RenderIf>
        </>
      ),
    },
  ];
}


const Teams = () => {



  const profile = useSelector((state) => state.auth.profile)
  const deleteModal = useModal();
  const editModal = useModal();
  const [getTeams , resultTeams ] = useLazyGetTeamsQuery({ queryKey: "resultTeams" });
  const [ getTeamById , result ] = useLazyGetTeamByIdQuery();
  const [openViewDrawer, setOpenViewDrawer] = useState(false);


useEffect(()=>
{
  getTeams();
},[]);


  const newTeamsData = useMemo(() => {
    return resultTeams?.data?.map(item => ({
      id: item?.id,
      key: item.name,
      teamName: item.name,
    }))
  }, [resultTeams])

  
  const onCloseView = () => {
    setOpenViewDrawer(false);
  };

  const crudView = {
    "edit":() =>editModal.showModal(),
    "delete":() =>deleteModal.showModal(),
    "view":() => setOpenViewDrawer(true),
  }

  const handlerShow = (record,name = "") => {
      crudView[name](); 
      getTeamById(record?.id);
  }

  
  return (

    <div className='teams'>
      <FilterBarTeams />
      <Table columns={columns(handlerShow, profile)} dataSource={newTeamsData} />
      <DeleteTeam isModalOpen={deleteModal.isModalOpen} handleOk={deleteModal.handleOk} handleCancel={deleteModal.handleCancel} deleteTeamData={result?.data} />
      <EditTeam isModalOpen={editModal.isModalOpen} handleOk={editModal.handleOk} handleCancel={editModal.handleCancel} editTeamData={result?.data} />
      <ViewDrawerTeams onClose={onCloseView} openView={openViewDrawer} viewTeamData={result?.data} />
    </div>
  )
}


export default Teams;
