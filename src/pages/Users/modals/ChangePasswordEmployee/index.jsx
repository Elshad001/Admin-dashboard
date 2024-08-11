import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast } from "react-toastify";
import { useChangePasswordMutation } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import './changePasswordEmployee.scss';

// eslint-disable-next-line react/prop-types
const ChangePasswordEmployee = ({ isModalOpen, handleOk, handleCancel }) => {

 
  const [changePassword, { error, isError, isSuccess }] = useChangePasswordMutation();

  const onSubmit = (values) => {

    changePassword(values);
    handleOk();

  };

  useEffect(()=>
  {
     if (isSuccess) {
      toast.success('New Password created successfully')
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
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
    
    }
  );

  return (
    <>
      <Modal
        title="Change Password"
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

                  htmlFor="oldPassword"
                >
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  autoComplete="oldPassword"
                  {...register("oldPassword")}
                />
                {errors.oldPassword && (
                  <p >
                    {errors.newPassword?.message}
                  </p>
                )}
              </div>

            </div>
            <div className='form-item-wrapper'>
            </div>

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
            <div className='form-item-wrapper'>
              <div className='form-item'>
                <label

                  htmlFor="newPasswordConfirm"
                >
                  Confirm New Password
                </label>
                <input
                  id="newPasswordConfirm"
                  autoComplete="newPasswordConfirm"
                  {...register("newPasswordConfirm")}
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


export default ChangePasswordEmployee

