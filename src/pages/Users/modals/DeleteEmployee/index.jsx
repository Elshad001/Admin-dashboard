import { useEffect } from 'react';
import { Modal } from 'antd';
import { toast } from "react-toastify";
import { useDeleteUserMutation } from '@/redux/api/user/apiUser';
import "react-toastify/dist/ReactToastify.css";
import "./deleteEmployee.scss"




// eslint-disable-next-line react/prop-types
const DeleteEmployee = ({ isModalOpen, handleOk, handleCancel, deleteEmployeeData }) => {

 
  const [deleteUser, { error, isError, isSuccess }] = useDeleteUserMutation();



  const deleteItem = [deleteEmployeeData?.id];


  const handleDeleteUser = () => {

    deleteUser(deleteItem);
  
    handleOk();

  }

  useEffect(()=>
  {
    if (isSuccess) {
      toast.error('User deleted')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
  },[isSuccess,isError,error])
  

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50 }}
        width={500}
        okText={'Ok'}
        okButtonProps={{ style: { backgroundColor: 'blue' } }}
      >
        <div className="delete-modal">
          <p>Are you sure?</p>
          <div className='delete-buttons'>
            <button onClick={handleCancel} className='delte-btn'>No</button>
            <button onClick={handleDeleteUser} className='delte-btn'>Yes</button>
          </div>
        </div>
      </Modal>
    </>
  );

}


export default DeleteEmployee
