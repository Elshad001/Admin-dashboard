import { useDispatch, useSelector } from 'react-redux';
import { AlignLeftOutlined, AlignRightOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSunnyOutline, IoMoonOutline, IoLockClosedOutline } from "react-icons/io5";
import { openDarkMode, closeDarkMode, openSideMenu, closeSideMenu } from '@/redux/features/main/mainSlice';
import { ChangePasswordEmployee } from '@/pages/Users/modals';
import { useModal } from '@/pages/Users/modals';
import './header.scss'



const Header = () => {

  const dispatch = useDispatch();
  const isDarkModeOpen = useSelector((state) => state.main.isDarkModeOpen);
  const isSideMenuOpen = useSelector((state) => state.main.isSideMenuOpen);
  const profile = useSelector((state) => state.auth.profile);

  const handleOpenSideMenu = () => {
    dispatch(openSideMenu());
  }

  const handleCloseSideMenu = () => {
    dispatch(closeSideMenu());
  }

  const handleOpenDarkMode = () => {
    dispatch(openDarkMode());
  }

  const handleCloseDarkMode = () => {
    dispatch(closeDarkMode());
  }


  const changePasswordModal = useModal();


  return (
    <div className={isDarkModeOpen ? 'header-dark' : 'header'}>

      <div>
        {
          isSideMenuOpen ? <AlignLeftOutlined onClick={handleOpenSideMenu} className='sidemenu-btn' /> : <AlignRightOutlined onClick={handleCloseSideMenu} className='sidemenu-btn' />
        }

      </div>
      <div className='header-left'>
        <div className='icons'>
          {
            isDarkModeOpen ? <IoSunnyOutline size={30} onClick={handleCloseDarkMode} />
              :
              <IoMoonOutline size={25} onClick={handleOpenDarkMode} />
          }
          <IoIosNotificationsOutline size={30} />
        </div>
        <div className='profile'>
          <Avatar size={44} icon={<UserOutlined />} className='avatar' />
          <div>
            <p>{profile?.firstName} {profile?.lastName}</p>
          </div>
          <IoLockClosedOutline size={22} onClick={changePasswordModal?.showModal} />
          <ChangePasswordEmployee isModalOpen={changePasswordModal.isModalOpen} handleOk={changePasswordModal.handleOk} handleCancel={changePasswordModal.handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default Header
