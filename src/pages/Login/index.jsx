import { LoginContent, LoginForm } from "@/pages/Login/components"
import "./login.scss"

// eslint-disable-next-line react/prop-types
const Login = () => {

  return (
    <div className="loginPage">
      <div className="loginLayout">
        <LoginContent />
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
