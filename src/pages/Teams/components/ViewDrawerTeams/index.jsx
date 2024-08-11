import { Drawer } from 'antd';
import './viewDrawer.scss';


// eslint-disable-next-line react/prop-types
const ViewDrawerTeams = ({ onClose, openView ,viewTeamData }) => {


  return (
    <>
      <Drawer onClose={onClose} open={openView}>
       <div className='view-team'>
        <h3>Team  - {viewTeamData?.name}</h3>
        <div className='view-team-content'>
          <ul>
            {viewTeamData?.users?.map((user,index)=>(
              <li key={index}>{user?.firstName} {user?.lastName}</li>
            ))}
          </ul>
        </div>
       </div>
      </Drawer>
    </>
  );
};
export default ViewDrawerTeams
