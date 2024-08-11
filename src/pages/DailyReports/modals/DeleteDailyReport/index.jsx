import { Modal } from 'antd';
import './deleteDailyReport.scss'

// eslint-disable-next-line react/prop-types
const DeleteDailyReport = ({ isModalOpen, handleOk, handleCancel}) => {

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 0, right: -641, }}
        width={250}
        className='view-modal'
      >
        <div>
        <p>Are you sure?</p>
        <button>No</button>
        <button>Yes</button>
        </div>
      </Modal>
    </>
  );

}


export default DeleteDailyReport