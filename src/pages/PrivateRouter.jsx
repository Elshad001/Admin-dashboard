import { Routes ,Route} from "react-router-dom"
import routes from "@/shared/constants/routes"

const PrivateRouter = () => {
  return (
    <div>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  )
}

export default PrivateRouter
