import { useState , useEffect , useMemo, } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Select } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { EditEmployeeSchema } from "@/validation";
import { useLazyGetTeamsQuery } from '@/redux/api/team/apiTeam';
import { useLazyGetRolesQuery, useUpdateUserMutation } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import './edit.scss';

// eslint-disable-next-line react/prop-types
const EditEmployee = ({ isModalOpen, handleOk, handleCancel, editUserData }) => {

  const [updateUser, { error, isError, isSuccess }] = useUpdateUserMutation();


  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const handleChangeTeam = (value) => {
    setSelectedTeam(value);
  };

  const handleChangeRole = (value) => {
    setSelectedRole(value);
  };

  
  const [ getTeams, TeamsResult ] = useLazyGetTeamsQuery({ queryKey: " TeamsResult" });
  const [ getRoles, RolesResult ]  = useLazyGetRolesQuery({ queryKey: " RolesResult" });

  useEffect(()=>
  {
    getTeams(); 
    getRoles();
    
  },[])

 

  const newOptionsDataTeams = useMemo(() => {
    return TeamsResult?.data?.map(item => ({
      id: item?.id,
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



  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(EditEmployeeSchema)
  });

  useEffect(() => {
    reset(
    editUserData,
    );
  }, [editUserData]);

  const onSubmit = (values) => {

    values.id =  editUserData?.id
    values.teamId = selectedTeam;
    values.roleId = selectedRole;
    updateUser(values);
    handleOk();
  };


  useEffect(()=>
  {
    if (isSuccess) {
      toast.success('User updated successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }

  },[isSuccess,isError,error])
  

  return (
    <>
      <Modal
        title="Update Employee"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={600}
        okText={'Save'}
      >
        <div className='edit-form'>
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
                  placeholder="firstName"
                  type="text"
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
                  Surname
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
                {errors.phone && (
                  <p >
                    {errors.phone?.message}
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
                  mode='single'
                  style={{ width: '100%' }}
                  name='team'
                  placeholder="Select a team"
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
                  mode='single'
                  style={{ width: '100%' }}
                  name="role"
                  placeholder="Select a role"
                  onChange={handleChangeRole}
                  options={newOptionsDataRoles?.map(role => ({ value: role.id, label: role.label }))}
                />
              </div>
            </div>
            <button type='submit'>Update</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default EditEmployee