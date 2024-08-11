import { Drawer } from 'antd';
import { useLazyGetProjectsForUserQuery } from '@/redux/api/project/apiProject';
import './ViewDrawerEmployees.scss';
import { useEffect } from 'react';




// eslint-disable-next-line react/prop-types
const ViewDrawerEmployees = ({ onClose, openView, viewUserData }) => {

  const [getProjectsForUser, result] = useLazyGetProjectsForUserQuery();

  useEffect(() => {
    getProjectsForUser();
  }, [])



  return (
    <>
      <Drawer onClose={onClose} open={openView}>
        <div className='employee-details'>
          <p>
            <span>First Name</span>
            <span>{viewUserData?.firstName}</span>
          </p>
          <p>
            <span>Last Name</span>
            <span>{viewUserData?.lastName}</span>
          </p>
          <p>
            <span>Email</span>
            <span>{viewUserData?.email}</span>
          </p>
          <p>
            <span>Team</span>
            <span>{viewUserData?.team}</span>
          </p>
          <p>
            <span>Role</span>
            <span>{viewUserData?.role}</span>
          </p>
          <p>
            <span>Phone</span>
            <span>{viewUserData?.phone}</span>
          </p>
          <p>
            <span>Projects</span>
            <span>
              {
                viewUserData?.userProjects?.map((item, i) =>
                (
                  <p key={i}>{item?.project?.name}</p>
                ))
              }
            </span>
          </p>
        </div>
    </Drawer >
    </>
  );
};
export default ViewDrawerEmployees
