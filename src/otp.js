import React, { useState, useEffect } from "react";

const Otp = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState(new Array(0).fill(""));
  const [numIsValid, setNumIsValid] = useState(false);
  
  useEffect(() => {
    const newOtpArr = new Array(+number).fill("");
    setOtp(newOtpArr);
  }, [number]);

  const numberInputHandler = (event) => {
    if (event.target.value > 6) return;
    setNumber(event.target.value);
    if(number !== '' || number <= 6){
      setNumIsValid(true)
    }
  };
  
  const numChangeHandler = (event, id) => {
    setOtp([
      ...otp.map((data, index) => (index === id ? event.target.value : data)),
    ]);
    if (event.target.value && event.target.nextSibling) {
        event.target.nextSibling.focus();
    }
  };

  const clearOtpHandler = () => {
    setOtp([...otp.map((value) => "")]);
  };

  const verifyOtpHandler = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== +number) return;
    window.alert("Your OTP is " + enteredOtp);
  };

  const backSpaceHandler = (event) => {
    if (event.code === "Backspace" && event.target.previousSibling) {
      event.target.previousSibling.focus();
    }
  };

  const otpValue = otp.map((input, id) => {
    return (
      <input
        className="box"
        type="number"
        name="otp"
        maxLength='1'
        min="0"
        max="9"
        step="1"
        key={id}
        value={input}
        onChange={(event) => numChangeHandler(event, id)}
        onFocus={(event) => event.target.select()}
        onKeyDown={backSpaceHandler}
      />
    );
  });

  return (
    <div className="App">
      <h2>
        <label type="text">Enter the number of digits of OTP</label>
      </h2>
      <input
        className="box"
        type="number"
        maxLength="1"
        onChange={numberInputHandler}
      />
      {numIsValid && <div>
        <h2>Enter the OTP below</h2>
        {otpValue}
        <p>
          <button onClick={clearOtpHandler}>Clear</button>
          <span>
            <button onClick={verifyOtpHandler}>Verify OTP</button>
          </span>
        </p>
      </div>}
    </div>
  );
};

export default Otp;
