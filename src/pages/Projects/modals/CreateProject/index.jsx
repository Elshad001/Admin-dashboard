import { useState , useEffect ,  useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Select } from 'antd';
import { toast } from "react-toastify";
import { useCreateProjectMutation } from '@/redux/api/project/apiProject';
import { useLazyGetUsersQuery } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import './createProject.scss';




// eslint-disable-next-line react/prop-types
const CreateProject = ({ isModalOpen, handleOk, handleCancel }) => {

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [createProject, { error, isError, isSuccess }] = useCreateProjectMutation();
  const [ getUsers , result ] = useLazyGetUsersQuery();


useEffect(()=>
{
  getUsers();
},[]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        name: '',
      },
    }
  );


  const handleChangeEmployee = (value) => {
    setSelectedEmployees(value);
  };

  const newOptionsDataEmployees = useMemo(() => {
    return result?.data?.data?.map(item => ({
      id: item?.id,
      value: item.firstName,
      label: `${item.firstName} ${item?.lastName}`,
    }))
  }, [result?.data]);



  const onSubmit = (values) => {

    values.userIds = selectedEmployees
    createProject(values);
    handleOk();

  };

  useEffect(()=>
  {
     if (isSuccess) {
      toast.success('Created new Project successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
    
  },[isSuccess,isError,error])

  return (
    <>

      <Modal
        title="Create new Project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        className='view-modal'
        okText={'Save'}
      >
        <div className='edit-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-item'>
              <p>
                <label htmlFor='Project Name'>Project Name</label>
                <input {...register('name')} name='name' id='name' />
              </p>
            </div>
            <div className='form-item'>
              <label htmlFor='Project Name'>Employees</label>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                placeholder="Select employees"
                onChange={handleChangeEmployee}
                options={newOptionsDataEmployees?.map(employee => ({ value: employee.id, label: employee.label }))}
              />
            </div>
            <button type='submit'>Create</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default CreateProject