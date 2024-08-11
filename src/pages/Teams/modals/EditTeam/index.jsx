import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast } from "react-toastify";
import { useUpdateTeamMutation } from '@/redux/api/team/apiTeam';
import "react-toastify/dist/ReactToastify.css";
import './editTeam.scss';



// eslint-disable-next-line react/prop-types
const EditTeam = ({ isModalOpen, handleOk, handleCancel , editTeamData }) => {


  const [updateTeam,{error,isError ,isSuccess}] = useUpdateTeamMutation();


  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    reset({
      name: editTeamData?.name
    });
  }, [editTeamData]);
  
  const onSubmit = (values) => {

      values.id=editTeamData?.id;
      updateTeam(values);
      handleOk();
  };

  useEffect(()=>
  {
    if (isSuccess) {
      toast.success('Team updated successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }

  },[isSuccess,isError,error])


  return (
    <>

      <Modal
        title="Update Team"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        okText={'Ok'}
      >
          <form onSubmit={handleSubmit(onSubmit)} className='edit-form'>
            <p>
                <label htmlFor='name'>Team Name</label>
                <input {...register('name')}  name='name' id='name'/>
            </p>
            <button type='submit'>Update Team</button>
          </form>
      </Modal>
    </>
  );

}


export default EditTeam