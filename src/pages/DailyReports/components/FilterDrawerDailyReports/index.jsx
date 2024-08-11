import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer } from 'antd';
import { Select } from 'antd';
import { useLazyGetUsersQuery } from '@/redux/api/user/apiUser';
import { useLazyGetProjectsQuery } from '@/redux/api/project/apiProject';
import { useLazyGetFilteredReportsQuery } from '@/redux/api/report/apiReport';
import './filterDrawerDailyReports.scss';


// eslint-disable-next-line react/prop-types
const FilterDrawerDailyReports = ({ onClose, openDrawer }) => {


  const [getUsers, UsersResult] = useLazyGetUsersQuery({ queryKey: "Users Result" });
  const [getProjects, ProjectsResult] = useLazyGetProjectsQuery({ queryKey: "Projects Result" });
  const [getFilteredReports,] = useLazyGetFilteredReportsQuery();
  const [selectedUsers, setSelectedUsers] = useState('');
  const [selectedProjects, setSelectedProjects] = useState('');


  const handleChangeUsers = (value) => {
    setSelectedUsers(value);
  };


  const handleChangeProjects = (value) => {
    setSelectedProjects(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    // resolver: zodResolver(EditEmployeeSchema)
  });





  useEffect(() => {

    getUsers();
    getProjects();

  }, [])


  const newOptionsDataProjects = useMemo(() => {
    return ProjectsResult?.data?.map(item => ({
      id: item?.id,
      value: item.name,
      label: item.name
    }))
  }, [ProjectsResult])

  const newOptionsDataUsers = useMemo(() => {
    return UsersResult?.data?.data?.map(item => ({
      id: item?.id,
      value: item?.id,
      label: `${item.firstName} ${item.lastName}`
    }))
  }, [UsersResult])



  const onSubmit = (values) => {

    values.ProjectIds = { ...selectedProjects }
    values.UserIds = { ...selectedUsers }
    getFilteredReports(values);
    onClose();
  };




  return (
    <>
      <Drawer onClose={onClose} open={openDrawer} className='filter-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-item-wrapper'>
            <div className='form-item'>
              <label
                htmlFor="role"
              >
                User
              </label>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                name="user"
                placeholder="Select users"
                onChange={handleChangeUsers}
                options={newOptionsDataUsers?.map(role => ({ value: role.id, label: role.label }))}
              />
            </div>
          </div>
          <div className='form-item-wrapper'>
            <div className='form-item'>
              <label
                htmlFor="role"
              >
                Project
              </label>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                name="project"
                placeholder="Select projects"
                onChange={handleChangeProjects}
                options={newOptionsDataProjects?.map(role => ({ value: role.id, label: role.label }))}
              />
            </div>
          </div>
          <button type='submit'>Filter</button>
        </form>
      </Drawer>
    </>
  );
};
export default FilterDrawerDailyReports

