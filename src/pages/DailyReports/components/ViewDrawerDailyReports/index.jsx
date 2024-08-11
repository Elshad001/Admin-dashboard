import { Drawer } from 'antd';
import './viewDrawerDailyReports.scss';


// eslint-disable-next-line react/prop-types
const ViewDrawerDailyReports = ({ onClose, openView, viewReportData }) => {

  return (
    <>
      <Drawer onClose={onClose} open={openView}>
        <div className='report-details'>
          <p>
            <span>Name</span>
            <span>{viewReportData?.user}</span>
          </p>
          <p>
            <span>Project</span>
            <span>{viewReportData?.project}</span>
          </p>
          <p>
            <span>Created Date</span>
            <span>{viewReportData?.recordDate}</span>
          </p>
          <p>
            <span>Note</span>
            <span>{viewReportData?.text}</span>
          </p>
        </div>
      </Drawer>
    </>
  );
};
export default ViewDrawerDailyReports 
