import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ForgotPassword } from "@/pages/Login/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/api/auth/apiAuth";
import { LoginSchema } from "@/validation";
import "react-toastify/dist/ReactToastify.css";
import './loginForm.scss';

const LoginForm = () => {


  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [login, result] = useLoginMutation();




  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: zodResolver(LoginSchema),
    }
  );

  const handleSubmitForm = (data) => {
    login(data);
  };


  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  useEffect(() => {
    if (result?.error) {
      toast.error(result?.error?.data?.message);
    }
  }, [result])

  return (
    <>
      {
        showForgotPassword ? (
          <div className="forgot-password">
            <ForgotPassword />
          </div>
        ) :
          (
            <div className="loginForm">
              <div className="loginFormTitle">
                <h3>Welcome Back</h3>
                <p>Sign in to continue to Crocusoft</p>
              </div>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div>
                  <label
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p >
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div >
                  <label

                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    autoComplete="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p >
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div>
                  <a
                    href="#test"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </a>
                </div>
                <button type='submit'>Sign In</button>
              </form>
            </div>

          )}
    </>

  );
};

export default LoginForm;



