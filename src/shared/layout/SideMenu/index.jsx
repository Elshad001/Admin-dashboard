import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserOutlined, TeamOutlined, ProjectOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';
import { setLoggedOut } from "@/redux/features/auth/authSlice";
import { RenderIf } from '@/shared/components';
import './sidemenu.scss'
import logo from "@/shared/media/imgs/crocusoft-log2.png"

const SideMenu = () => {

   const dispatch = useDispatch();
   const isSideMenuOpen = useSelector((state) => state.main.isSideMenuOpen);
   const profile = useSelector((state) => state.auth.profile);

   const handleLogOut = () => {

      dispatch(setLoggedOut())
   }

   return (
      <div className={isSideMenuOpen ? 'sideMenu' : "closeSideMenu"}>
         <div className="menu-title">
            <img src={logo} alt="logo" className="logo" />
            {isSideMenuOpen ? <p>Crocusoft</p> : ''}
         </div>
         <div className="menu">
            <RenderIf condition={profile?.role === 'Employee'}>
               <ul>
                  <NavLink className={profile?.role === "Employee" ? 'link active' : "link"} activeclassname='active'  to='/dailyReports'>
                     {isSideMenuOpen ? <li>Daily Reports</li> : <li><FormOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
                  <NavLink className='link logout-link' activeclassname='active' to='/login'>
                     {isSideMenuOpen ? <li onClick={handleLogOut}>Logout</li> : <li onClick={handleLogOut}><LogoutOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
               </ul>
            </RenderIf>
            <RenderIf condition={profile?.role !== 'Employee'}>
               <ul>
                  <NavLink className='link' activeclassname='active' to="/">
                     {isSideMenuOpen ? <li>Employees</li> : <li><UserOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
                  <NavLink className='link' activeclassname='active' to='/teams'>
                     {isSideMenuOpen ? <li>Teams</li> : <li><TeamOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
                  <NavLink className='link' activeclassname='active' to='/projects'>
                     {isSideMenuOpen ? <li>Projects</li> : <li><ProjectOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
                  <NavLink className='link' activeclassname='active' to='/dailyReports'>
                     {isSideMenuOpen ? <li>Daily Reports</li> : <li><FormOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
                  <NavLink className='link logout-link' activeclassname='active' to='/login'>
                     {isSideMenuOpen ? <li onClick={handleLogOut}>Logout</li> : <li onClick={handleLogOut}><LogoutOutlined className="sidemenu-icon" /></li>}
                  </NavLink>
               </ul>
            </RenderIf>
         </div>
      </div>

   )
}


export default SideMenu
