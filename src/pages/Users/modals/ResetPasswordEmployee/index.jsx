import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";
import { useResetPasswordMutation } from '@/redux/api/user/apiUser';
import { ResetPasswordSchema } from '@/validation';
import "react-toastify/dist/ReactToastify.css";
import './resetPasswordEmployee.scss';

// eslint-disable-next-line react/prop-types
const ResetPasswordEmployee = ({ isModalOpen, handleOk, handleCancel, resetPasswordData }) => {

  
  const [resetPassword, { error, isError, isSuccess }] = useResetPasswordMutation();




  const onSubmit = (values) => {

    values.userId = resetPasswordData?.id
    resetPassword(values);
    handleOk();

  };

  useEffect(()=>
  {
    if (isSuccess) {
      toast.success('New password created successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }

  },[isSuccess,isError,error])
  

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        newPassword: ''
      },
      resolver: zodResolver(ResetPasswordSchema),
    }
  );

  return (
    <>
      <Modal
        title="Reset Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        className='view-modal'
        okText={'Save'}
      >
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-item-wrapper'>
              <div className='form-item'>
                <label

                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  autoComplete="newPassword"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p >
                    {errors.newPassword?.message}
                  </p>
                )}
              </div>
            </div>
            <button type='submit'>Save</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default ResetPasswordEmployee
