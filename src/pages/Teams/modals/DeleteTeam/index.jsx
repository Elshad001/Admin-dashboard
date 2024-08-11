import { useEffect } from 'react';
import { Modal } from 'antd';
import { toast } from "react-toastify";
import { useDeleteTeamMutation } from '@/redux/api/team/apiTeam';
import "react-toastify/dist/ReactToastify.css";
import "./deleteTeam.scss"


// eslint-disable-next-line react/prop-types
const DeleteTeam = ({ isModalOpen, handleOk, handleCancel , deleteTeamData }) => {
  
  const [deleteTeam,{error,isError ,isSuccess}] = useDeleteTeamMutation();


  const handleDeleteTeam = () => {

      deleteTeam(deleteTeamData?.id);
      handleOk();
  }

  useEffect(()=>
  {
    if (isSuccess) {
      toast.error('Team deleted ')
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
        className='view-modal'
        okText={'Ok'}
        okButtonProps={{ style: { backgroundColor: 'blue' } }}
      >
          <div className="delete-modal">
            <p>Are you sure?</p>
            <div className='delete-buttons'>
              <button onClick={handleCancel} className='delte-btn'>No</button>
              <button onClick={handleDeleteTeam}  className='delte-btn'>Yes</button>
            </div>
          </div>
      </Modal>
    </>
  );

}


export default DeleteTeam
