import React, { useState, useRef, useEffect } from "react";
import { Modal , Button } from "react-bootstrap";
import styles from "./Otp.module.css";
import classNames from "classnames";
// import Image from "next/image";
const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isFilled, setIsFilled] = useState(false);
  const [showNumericOnlyModal, setShowNumericOnlyModal] = useState(false);
  const [showSuccessModal , setshowSuccessModal] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    createRefArray(otp.length);
    inputRefs.current.forEach((ref) => ref.classList.add(styles.error));

  }, []);


  const changeHandler = (event, index) => {
    const value = event;
    if (!isNaN(value)) {
      const newOpt = [...otp];
      newOpt[index] = value;
      setOtp(newOpt);
      setIsFilled(newOpt.every((value) => value !== ""));
      if (value === "" && index === otp.length - 1) {
        inputRefs.current[index].classList.add(styles.error);
      } else {
        inputRefs.current[index].classList.remove(styles.error);
      }
      setShowNumericOnlyModal(false);
    } else {
      setShowNumericOnlyModal(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setOtp(new Array(6).fill(""));
    setIsFilled(false);
    setshowSuccessModal(true)
  };


  const createRefArray = (length) => {
    inputRefs.current = new Array(length)
      .fill()
      .map((_, index) => inputRefs.current[index] || React.createRef());
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex">
            {otp.map((data, index) => {
              const isFilledClass = data ? styles.filled : '';
              return (
                <input
                  className={classNames(styles.otpField, isFilledClass)}
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => changeHandler(e.target.value, index)}
                />
              )
            })}
          </div>

          <button type="submit" disabled={!isFilled}>
            Submit
          </button>
        </div>
      </form>

      {showNumericOnlyModal && (
        <Modal show={true}>
          <Modal.Header >
            <Modal.Title>خطا</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            شما فقط اعداد می توانید وارد کنید
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={()=>setShowNumericOnlyModal(false)}>متوجه شدم</button>
          </Modal.Footer>
        </Modal>

      )}



      {showSuccessModal && (
        <Modal show={true}>
          <Modal.Header >
            <Modal.Title>lموفقیت امیز</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           شما با موفقیت احراز هویت شده اید
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>setshowSuccessModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

    </>
  );
};

export default Otp;
