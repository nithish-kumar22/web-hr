import { useEffect, useState } from "react";
import "./App.css";
import { response } from "express";
const App = () => {
  const [text, setText] = useState("Send OTP");
  const [OTPSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch("http://localhost:5000/api/post", {
    //   method: "POST",
    //   body: JSON.stringify({ number: mobileNumber }),
    // })
    //   .then((response) => {
    //     response.text();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  });

  const sendOTP = () => {
    if (mobileNumber !== "" && mobileNumber.length === 10) {
      setOTPSent(true);
      setText("Login");
      setError("");
    } else {
      setError("Enter valid mobile number");
    }
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  return (
    <div className="container">
      <div className="login-container">
        <img
          src={require("./assets/gp_logo.webp")}
          style={{ width: 100, height: 70 }}
        />
        <p className="login-text">Login</p>
        <input
          placeholder="Enter mobile number"
          type="tel"
          onChange={handleMobileNumberChange}
        />
        {error !== "" && <p style={{ color: "red" }}>{error}</p>}
        {OTPSent && (
          <input
            placeholder="Enter OTP"
            type="tel"
            onChange={(text) => setOTP(text)}
          />
        )}
        <button className="login-button" onClick={() => sendOTP()}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default App;
