import { useState, useEffect , useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Select } from 'antd';
import { useLazyGetProjectsForUserQuery } from '@/redux/api/project/apiProject';
import { useUpdateReportMutation } from '@/redux/api/report/apiReport';
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import './editDailyReport.scss';



// eslint-disable-next-line react/prop-types
const EditDailyReport = ({ isModalOpen, handleOk, handleCancel, selectedReport }) => {

  const [valueNote, setValueNote] = useState('');
  const [selectedProject, setSelectedProject] = useState([]);

  const [ updateReport,{ error , isError ,isSuccess }] = useUpdateReportMutation();


  const handleChangeProject = (value) => {
    setSelectedProject(value);
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
    values.id = selectedReport?.id
    values.projectId = selectedProject;
    values.note = valueNote;
    updateReport(values);
    handleOk();
  };



  useEffect(()=>
  {
     if (isSuccess) {
      toast.success('Report is updated successfully')
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
  },[isSuccess,isError,error])



  return (
    <>

      <Modal
        title="Edit Daily Report"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50, }}
        width={400}
        className='view-modal'
      >
        <div className='form-container'>
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


export default EditDailyReport