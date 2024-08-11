import Header from '@/shared/layout/Header'
import PrivateRoute from './PrivateRouter'
import SideMenu from '@/shared/layout/SideMenu'
import { useSelector } from 'react-redux'
import Login from './Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import RenderIf from '@/shared/components/RenderIf'



const Router = () => {

   
    const TOKEN = useSelector((state) => state.auth?.token)
    const isDarkModeOpen = useSelector((state) => state.main.isDarkModeOpen);

    return (
        <>
            <RenderIf condition={TOKEN}>
                <div className={isDarkModeOpen ? 'app-container-dark' : 'app-container'}>
                    <SideMenu />
                    <div className={isDarkModeOpen ? 'main-content-dark' : "main-content"}>
                        <Header />
                        <PrivateRoute />
                    </div>
                </div>
            </RenderIf>
            <RenderIf condition={!TOKEN}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path="*" element={<Navigate to="/login"/>} />
                </Routes>
            </RenderIf>
        </>
    )
}

export default Router

