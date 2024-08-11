import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast } from "react-toastify";
import { useCreateTeamMutation } from '@/redux/api/team/apiTeam';
import "react-toastify/dist/ReactToastify.css";
import './createTeam.scss';

// eslint-disable-next-line react/prop-types
const CreateTeam = ({ isModalOpen, handleOk, handleCancel }) => {


  const [createTeam, { error, isError, isSuccess }] = useCreateTeamMutation();

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

  const onSubmit = (values) => {

    createTeam(values);
    handleOk();

  };

  useEffect(()=>
  {
     if (isSuccess) {
      toast.success('Created new Team successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
  },[isSuccess,isError,error])


  return (
    <>

      <Modal
        title="Create new Team"
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
            <p>
              <label htmlFor='Team Name'>Team Name</label>
              <input {...register('name')} name='name' id='name' />
            </p>
            <button type='submit'>Create</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default CreateTeam