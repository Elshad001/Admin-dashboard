import { Drawer } from 'antd';
import './viewDrawerProjects.scss';


// eslint-disable-next-line react/prop-types
const ViewDrawerProjects = ({ onClose, openView , viewProjectData}) => {


  return (
    <>
      <Drawer onClose={onClose} open={openView}>
      <div className='view-project'>
        <h3>Project  - {viewProjectData?.name}</h3>
        <div className='view-project-content'>
          <ul>
            {viewProjectData?.users?.map((user,index)=>(
              <li key={index}>{user?.firstName} {user?.lastName}</li>
            ))}
          </ul>
        </div>
       </div>
      </Drawer>
    </>
  );
};
export default ViewDrawerProjects
