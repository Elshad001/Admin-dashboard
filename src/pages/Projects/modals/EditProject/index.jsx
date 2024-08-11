import { useState , useEffect , useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Modal ,Select } from 'antd';
import { toast } from "react-toastify";
import { useUpdateProjectMutation } from '@/redux/api/project/apiProject';
import { useLazyGetUsersQuery } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import './editProject.scss';

// eslint-disable-next-line react/prop-types
const EditProject = ({ isModalOpen, handleOk, handleCancel, editProjectData }) => {

  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
  const [selectedUsersForDelete, setSelectedUsersForDelete] = useState([]);


  const handleChangeToAdd = (value) => {
    setSelectedUsersToAdd(value);
  };

  const handleChangeForDelete = (value) => {
    setSelectedUsersForDelete(value);
  };


  const [ getUsers,result ] = useLazyGetUsersQuery();
  const [updateTeam,{error, isError, isSuccess}] = useUpdateProjectMutation();

useEffect(()=>
{
  getUsers();
},[])



  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {

    values.projectId = editProjectData?.id;
    values.userIdsToAdd=selectedUsersToAdd;
    values.userIdsToDelete=selectedUsersForDelete;
    updateTeam(values);
    handleOk();
  };

  useEffect(()=>
  {
    if (isSuccess) {
      toast.success('Project updated successfully');
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
    
  },[isSuccess,isError,error])

  const optionsDataToAdd = useMemo(() => {
    return result?.data?.data?.map(item => ({
      id: item?.id,
      value: `${item.firstName} ${item.lastName} `,
      label: `${item.firstName} ${item.lastName} `,
    }))
  }, [editProjectData])

  useEffect(() => {
    reset({
      name: editProjectData?.name
    });
  }, [editProjectData]);
  

  const optionsDataForDelete = useMemo(() => {
    return editProjectData?.users?.map(item => ({
      id: item?.id,
      value:  `${item.firstName} ${item.lastName} `,
      label: `${item.firstName} ${item.lastName} `
    }))
  }, [editProjectData])



  return (
    <>
      <Modal
        title="Update Project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        className='view-modal'
      >
        <div className='edit-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-item'>
              <label htmlFor='name'>Project Name</label>
              <input {...register('name')} name='name' id='name' />
            </div>
            <div className='form-item'>
              <label>Select Employees to Add</label>
              <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder="Select employees"
                  onChange={handleChangeToAdd}
                  options={optionsDataToAdd?.map(team => ({ value: team.id, label: team.label }))}
                />
            </div>
            <div className='form-item'>
              <label>Select Employees for Delete</label>
              <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder="Select employees"
                  onChange={handleChangeForDelete}
                  options={optionsDataForDelete?.map(team => ({ value: team.id, label: team.label }))}
                />
            </div>
            <button>Update</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default EditProject