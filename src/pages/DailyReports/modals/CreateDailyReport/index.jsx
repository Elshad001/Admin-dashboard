import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { useCreateReportMutation } from '@/redux/api/report/apiReport';
import { useLazyGetProjectsForUserQuery } from '@/redux/api/project/apiProject';
import ReactQuill from 'react-quill';
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import './createDailyReport.scss';


// eslint-disable-next-line react/prop-types
const CreateDailyReport = ({ isModalOpen, handleOk, handleCancel }) => {

  const [valueNote, setValueNote] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [createReport,{error,isError ,isSuccess}] = useCreateReportMutation();

  const handleChangeProject = (id) => {
    setSelectedProjectId(id);
  };

  const [getProjectsForUser, result] = useLazyGetProjectsForUserQuery();


  useEffect(() => {
    getProjectsForUser();

  }, [])

  const newOptionsDataProjects = useMemo(() => {
    return result?.data?.map(item => ({
      id: item?.id,
      value: item?.name,
      label: item?.name,
    }))
  }, [result?.data])



  const {
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = (values) => {

    values.projectId = selectedProjectId;
    values.text = valueNote;
    createReport(values);
    handleOk();
  };

  useEffect(()=>
  {
    if (isSuccess) {
      toast.success('Report created successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
  },[isSuccess,isError,error])

  return (
    <>

      <Modal
        title="Create Employee"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        className='view-modal'
      >
        <div className='edit-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>
                <label>Select Project</label>
                <Select
                  mode='single'
                  style={{ width: '100%' }}
                  placeholder="Select a project"
                  onChange={handleChangeProject}
                  options={newOptionsDataProjects?.map(item => ({ value: item?.id, label: item.label }))}
                />
              </p>
              <div>
                <label>Note</label>
                <ReactQuill theme="snow" value={valueNote} onChange={setValueNote} />
              </div>
            </div>
            <button type='submit'>Save</button>
          </form>
        </div>
      </Modal>
    </>
  );

}


export default CreateDailyReport