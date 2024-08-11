import { useState, useEffect , useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal, Select } from 'antd';
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEmployeeSchema } from "@/validation";
import { useLazyGetTeamsQuery } from '@/redux/api/team/apiTeam';
import { useLazyGetRolesQuery } from '@/redux/api/user/apiUser';
import { useCreateUserMutation } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import './create.scss';



// eslint-disable-next-line react/prop-types
const CreateEmployee = ({ isModalOpen, handleOk, handleCancel }) => {


  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const profile = useSelector((state) => state.auth.profile)

  const handleChangeTeam = (value) => {
    setSelectedTeam(value);
  };

  const handleChangeRole = (value) => {
    setSelectedRole(value);
  };

  

  const [createUser, { error, isError, isSuccess }] = useCreateUserMutation();
  const [ getTeams, TeamsResult ] = useLazyGetTeamsQuery({ queryKey: " TeamsResult" });
  const [ getRoles, RolesResult ]  = useLazyGetRolesQuery({ queryKey: " RolesResult" });

useEffect(()=>
{

  getTeams();
  getRoles();

},[])


  const newOptionsDataTeams = useMemo(() => {
    return TeamsResult?.data?.map(item => ({
      id: item?.id ,
      value: item.name,
      label: item.name,
    }))
  }, [TeamsResult])






  const newOptionsDataRoles = useMemo(() => {
    return RolesResult?.data?.map(item => ({
      id: item?.id,
      value: item.name,
      label: item.name
    }))
  }, [RolesResult])




  const rolesDataForSuperAdmin = newOptionsDataRoles?.filter((role) => role?.label !== 'SuperAdmin')
  const rolesDataForAdmin = newOptionsDataRoles?.filter((role) => role?.label !== 'SuperAdmin' && role?.label !== 'Admin')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        teamId: '',
        roleId: ''
      },
      resolver: zodResolver(CreateEmployeeSchema),
    },

  );

  const onSubmit = (values) => {

    values.teamId = selectedTeam;
    values.roleId = selectedRole;
    createUser(values);
    handleOk();
  };


useEffect(()=>
{
  if (isSuccess) {
    toast.success('User created successfully')
  }
  else if (isError) {
    toast.error(error?.data?.message)
  }
},[isSuccess,isError,error])





  return (
    <>
      <Modal
        title="Create Employee"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={600}
        okText={'Save'}
      >
        <div>
          <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-item-wrapper'>
              <div className='form-item'>
                <label
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="firstName"
                  autoComplete="firstName"
                  {...register("firstName")}
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
                  Last Name
                </label>
                <input
                  id=" lastName"
                  type="text"
                  placeholder="lastName"
                  autoComplete="lastName"
                  {...register("lastName")}
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
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  autoComplete="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p >
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className='form-item'>
                <label
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="phone"
                  autoComplete="phone"
                  {...register("phone")}
                />
                {errors.email && (
                  <p >
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div className='form-item-wrapper'>
              <div className='form-item'>
                <label

                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  autoComplete="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p >
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className='form-item' >
                <label

                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p >
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
            <div className='form-item-wrapper'>
              <div className='form-item' >
                <label>
                  Team
                </label>
                <Select
                  mode='single'
                  style={{ width: '100%' }}
                  placeholder="Select a team"
                  onChange={handleChangeTeam}
                  options={newOptionsDataTeams?.map(team => ({ value: team.id, label: team.label }))}
                />
              </div>
              <div className='form-item'>
                <label>
                  Role
                </label>
                <Select
                  mode='single'
                  style={{ width: '100%' }}
                  placeholder="Select a role"
                  onChange={handleChangeRole}
                  options={
                    profile?.role === 'SuperAdmin' ? rolesDataForSuperAdmin?.map(role => ({ value: role?.id, label: role?.label })) : rolesDataForAdmin?.map(role => ({ value: role?.id, label: role?.label }))}
                />
              </div>
            </div>
            <button type='submit'>Create</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default CreateEmployee