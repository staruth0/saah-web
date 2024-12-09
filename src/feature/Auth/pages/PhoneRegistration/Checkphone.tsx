import React, { useEffect, useState } from "react";
import "../../styles/authpages.scss";
import {useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import OTPInput from "../../components/OTPInput";
import { useGetPhoneCode, useVerifyPhoneCode } from "../../hooks/AuthHooks";

function Checkphone() {
  const { t } = useTranslation();
  
  const location = useLocation();
  const { phone } = location.state || {}; 

  //states
  const [otp,setOtp] = useState<string>('')

 // custom-hooks
  const codeGet = useGetPhoneCode()
  const codeVerify = useVerifyPhoneCode()


  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    codeVerify.mutate({phone, code: otp});
  
  };

  const handleOtpComplete = (otp: string) => {
       console.log("Complete OTP:", otp);
       setOtp(otp);
  };
  
    const handleCodeVerification = async () => {
      codeGet.mutate({phone});
    };

  useEffect(() => {
    if (phone) {
      console.log(phone);
      handleCodeVerification();
    }
    
  }, [phone]);

  return (
    <div className="register__phone__container">
      <div className="insightful__texts">
        <div>{t("CheckMessagesHeader")}</div>
        <div className="code__message">{t("CheckMessagesMessage")}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <OTPInput length={6} onComplete={handleOtpComplete} />
        {codeGet.error && <div>Fetching Code</div>}
        {codeVerify.error && (
          <div>An Error Occured While Verifying the code</div>
        )}
        <button type="submit">
          {codeVerify.isPending ? "Verifying....." : t("VerifyButton")}
        </button>
      </form>
      <div className="bottom__links">
        <div className="resend__text">
          {t("ResendPrompt")}
          <div className="bottom__link_resend">{t("ResendButton")}</div>
        </div>
      </div>
    </div>
  );
}

export default Checkphone;
