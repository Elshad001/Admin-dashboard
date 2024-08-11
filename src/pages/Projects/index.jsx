import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Space, Table, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { EditProject } from '@/pages/Projects/modals';
import { useModal } from '@/pages/Users/modals';
import { FilterBarProjects, ViewDrawerProjects } from '@/pages/Projects/components';
import { useLazyGetProjectsQuery , useLazyGetProjectByIdQuery } from '@/redux/api/project/apiProject';
import { RenderIf } from '@/shared/components';
import './projects.scss';



const columns = ( handlerShow , profile) => {
  return [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      value: 'projectName'
    },

    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <>
          <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}>
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon'>
                  <EyeOutlined onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }} />
                </span>
              </Tooltip>
              <Tooltip title="edit">
                <span className='edit-icon'>
                  <EditOutlined onClick={() => handlerShow(record,"edit")} />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
          <RenderIf condition={profile?.role === 'Head'}>
            <Tooltip title="view">
              <span className='view-icon'>
                <EyeOutlined onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }} />
              </span>
            </Tooltip>
          </RenderIf>
        </>
      ),
    },
  ];
}


const Projects = () => {



  const profile = useSelector((state) => state.auth.profile)
  const [ getProjectById , result ] = useLazyGetProjectByIdQuery();
  const [ getProjects, ] = useLazyGetProjectsQuery();
  const editModal = useModal();
  const showProjects = useSelector((state) => state.project.showProjects);
  

useEffect(()=>
{
  getProjects();
},[])



  const newProjectsData = useMemo(() => {
    return showProjects?.map(item => ({
      id: item?.id,
      key: item.name,
      projectName: item.name,
    }))
  }, [showProjects])


  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  const onCloseView = () => {
    setOpenViewDrawer(false);
  };

const crudView = {
  'view': () =>  setOpenViewDrawer(true),
  'edit': () =>   editModal.showModal(),
}


 const handlerShow = (record ,name) => {
    crudView[name]();
    getProjectById(record?.id)
  };

  return (

    <div className='projects'>
      <FilterBarProjects />
      <Table columns={columns(handlerShow , profile)} dataSource={newProjectsData} pagination={{ pageSize: 6 }} />
      <EditProject isModalOpen={editModal.isModalOpen} handleOk={editModal.handleOk} handleCancel={editModal.handleCancel} editProjectData={result?.data} />
      <ViewDrawerProjects onClose={onCloseView} openView={openViewDrawer} viewProjectData={result?.data} />
    </div>
  )
}


export default Projects;
