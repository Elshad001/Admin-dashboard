import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSendOtpMutation, } from '@/redux/api/user/apiUser';
import { useForgotPasswordMutation } from '@/redux/api/user/apiUser';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import "react-toastify/dist/ReactToastify.css";
import './forgotPassword.scss';

const ForgotPassword = () => {

  const [sendOtp,] = useSendOtpMutation();
  const [forgotPassword, { error, isError, isSuccess }] = useForgotPasswordMutation();
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState("sendEmail");
  const navigate = useNavigate(true);

  const { register, handleSubmit, getValues, errors } = useForm();


  const handleSendEmail = (values) => {

    sendOtp(values);
    setStep("verifyOtp");
  };

  const handleVerifyOtp = () => {

    setStep("newPassword");

  };

  const handleChangePassword = () => {
    const { password, confirmPassword } = getValues();
    forgotPassword({ otp, password, confirmPassword });

  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password changed')
      navigate("/");
    }
    else if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isSuccess, isError, error])

  return (
    <div className='forgot-assword'>
      {step === "sendEmail" && (
        <form onSubmit={handleSubmit(handleSendEmail)} className='email-form'>
          <input name="email" type="email" placeholder="Email Adress" {...register("email")} className='email-input' />
          <button type="submit">Send</button>
        </form>
      )}
      {step === "verifyOtp" && (
        <form onSubmit={handleSubmit(handleVerifyOtp)} className='otp-form'>
          <OtpInput
            value={otp}
            width={100}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "50px",
              marginBottom: "10px",
              height: "50px",
              backgroundColor: "transparent",
              outline: "none",
              textAlign: "center"
            }}
          />
          <button type="submit">Verify</button>
        </form>
      )}
      {step === "newPassword" && (
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <input className='passwordInput' name="password" id='password' placeholder="New Password" {...register("password")} />
          <input className='passwordInput' name="confirmPassword" id='confirmPassword' placeholder="Confirm New Password" {...register("confirmPassword")} />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;


