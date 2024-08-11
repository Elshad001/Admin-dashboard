import { useState ,useEffect ,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IoLockClosedOutline } from 'react-icons/io5';
import { DeleteEmployee, EditEmployee ,useModal , ResetPasswordEmployee} from '@/pages/Users/modals';
import { FilterBarEmployees , ViewDrawerEmployees} from '@/pages/Users/components';
import { useLazyGetUsersQuery , useLazyGetUserByIdQuery } from '@/redux/api/user/apiUser';
import { useLazyGetProfileQuery } from '@/redux/api/auth/apiAuth';
import { RenderIf } from '@/shared/components';
import './users.scss';



const columns = ( handlerShow, profile) => {

  return [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <button className={text ? 'active-btn' : 'deactive-btn'}>{text ? 'active' : 'deactive'}</button>,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <div>
          <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}>
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon' onClick={() => handlerShow(record,"view")} >
                  <EyeOutlined />
                </span>
              </Tooltip>
              <Tooltip title="edit">
                <span className='edit-icon' onClick={() => handlerShow(record,"edit")} >
                  <EditOutlined />
                </span>
              </Tooltip>
              <Tooltip title="reset password" >
                <span className='reset-icon' onClick={() => handlerShow(record,"reset")} >
                  <IoLockClosedOutline size={17} />
                </span>
              </Tooltip>
              <Tooltip title="delete" >
                <span className='actions-icon delete-icon' onClick={() => handlerShow(record,"delete")} >
                  <DeleteOutlined />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
          <RenderIf condition={profile?.role === 'Head'}>
            <Space size="middle">
              <Tooltip title="view">
                <span className='view-icon' onClick={() => handlerShow(record,"view")} style={{ fontSize: '16px' }} >
                  <EyeOutlined />
                </span>
              </Tooltip>
            </Space>
          </RenderIf>
        </div>
      ),
    },
  ];
}


const Users = () => {

  const [ getUserById , result ] =  useLazyGetUserByIdQuery();
  const [ getProfile,] = useLazyGetProfileQuery();
  const [ getUsers,] = useLazyGetUsersQuery()
  const profile = useSelector((state) => state.auth.profile)
  const showEmployees = useSelector((state) => state.users.showEmployees);
  
  
  useEffect(() => {
    getProfile();
    getUsers();
  }, [])


  

const filteredDataForAdmin = showEmployees.filter((item) => item?.role!=='SuperAdmin' && item?.role!=='Admin');

  const Data = useMemo(() => {
    return  showEmployees?.map(item => ({
      key: item?.id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      role: item?.role,
      team: item?.team,
      status: item?.isActive
    }))
  }, [showEmployees])

  const DataForAdmin = useMemo(() => {
    return  filteredDataForAdmin?.map(item => ({
      key: item?.id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      role: item?.role,
      team: item?.team,
      status: item?.isActive
    }))
  }, [filteredDataForAdmin])

 

  const deleteModal = useModal();
  const editModal = useModal();
  const resetPasswordModal = useModal();
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  
  const onCloseView = () => {
    setOpenViewDrawer(false);
  };
  
  const crudView = {
    "view":() => setOpenViewDrawer(true),
    "edit":() => editModal.showModal(),
    "reset":() => resetPasswordModal.showModal(),
    "delete":() => deleteModal.showModal(),
  }

  const handlerShow = (record,name = "") => {
      crudView[name](); 
      getUserById(record?.key);
  }

  return (
    <div className='users'>
      <FilterBarEmployees />
      <Table columns={columns( handlerShow, profile)} dataSource={profile?.role==='Admin' ? DataForAdmin : Data } pagination={{ pageSize: 6 }} />
      <DeleteEmployee isModalOpen={deleteModal.isModalOpen} handleOk={deleteModal.handleOk} handleCancel={deleteModal.handleCancel} deleteEmployeeData={result?.data} />
      <EditEmployee isModalOpen={editModal.isModalOpen} handleOk={editModal.handleOk} handleCancel={editModal.handleCancel} editUserData={result?.data} />
      <ViewDrawerEmployees onClose={onCloseView} openView={openViewDrawer} viewUserData={result?.data} />
      <ResetPasswordEmployee isModalOpen={resetPasswordModal.isModalOpen} handleOk={resetPasswordModal.handleOk} handleCancel={resetPasswordModal.handleCancel} resetPasswordData={result?.data} />
    </div>
  )
}

export default Users;


