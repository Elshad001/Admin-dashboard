import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer, Select } from 'antd';
import { useLazyGetUsersQuery } from '@/redux/api/user/apiUser';
import { useLazyGetTeamsQuery } from '@/redux/api/team/apiTeam';
import { useLazyGetProjectsQuery } from '@/redux/api/project/apiProject';
import './filterDrawerEmployees.scss';




// eslint-disable-next-line react/prop-types
const FilterDrawerEmployees = ({ onClose, openDrawer }) => {

  const [getUsers,] = useLazyGetUsersQuery();


  const [selectedTeams, setSelectedTeams] = useState('');
  const [selectedProjects, setSelectedProjects] = useState('');

  const handleChangeTeam = (value) => {
    setSelectedTeams(value);
  };

  const handleChangeRole = (value) => {
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


  const [getTeams, TeamsResult] = useLazyGetTeamsQuery({ queryKey: " TeamsResult" });
  const [getRoles, ProjectsResult] = useLazyGetProjectsQuery({ queryKey: "Projects Result" });

  useEffect(() => {
    getTeams();
    getRoles();

  }, [])



  const newOptionsDataTeams = useMemo(() => {
    return TeamsResult?.data?.map(item => ({
      id: item?.id,
      value: item.name,
      label: item.name,
    }))
  }, [TeamsResult])




  const newOptionsDataProjects = useMemo(() => {
    return ProjectsResult?.data?.map(item => ({
      id: item?.id,
      value: item.name,
      label: item.name
    }))
  }, [ProjectsResult])




  const onSubmit = (values) => {

    values.TeamIds = { ...selectedTeams }

    values.ProjectIds = { ...selectedProjects }
    getUsers(values);
    onClose();
  };

  return (
    <>
      <Drawer onClose={onClose} open={openDrawer} className='filter-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-item-wrapper'>
            <div className='form-item'>
              <label
                htmlFor="firstName"
              >
                Name
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
                {...register("FirstName")}
              />
              {errors.firstName && (
                <p >
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className='form-item'>
              <label
                htmlFor="lastName"
              >
                Surname
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                autoComplete="lastName"
                {...register("LastName")}
              />
              {errors.lastName && (
                <p >
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div className='form-item-wrapper'>
            <div className='form-item'>
              <label
                htmlFor="team"
              >
                Team
              </label>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                name='team'
                placeholder="Select teams"
                onChange={handleChangeTeam}
                options={newOptionsDataTeams?.map(team => ({ value: team.id, label: team.label }))}
              />
            </div>
            <div className='form-item'>
              <label
                htmlFor="role"
              >
                Role
              </label>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                name="role"
                placeholder="Select projects"
                onChange={handleChangeRole}
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
export default FilterDrawerEmployees

