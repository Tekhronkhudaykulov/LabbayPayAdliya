import { useState, useEffect } from "react";

import "./style.css"; 
import { ASSETS } from "../../assets/images/assets";

const Notification = ({ message, onClose }: any) => {
  const [visible, setVisible] = useState(false);
  const [initialDelay, setInitialDelay] = useState(false);

  useEffect(() => {
    if (message) {
      setInitialDelay(true); 
      const showTimer = setTimeout(() => {
        setVisible(true);
      }, 500); 

      const hideTimer = setTimeout(() => {
        setVisible(false); 
      }, 5000); 

     
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [message]);
  useEffect(() => {
    if (!visible && initialDelay) {
      const hideTimer = setTimeout(() => {
        onClose(); 
      }, 500); 
      return () => clearTimeout(hideTimer);
    }
  }, [visible, initialDelay, onClose]);
  return (
    <div className={`notification ${visible ? "slide-down" : "slide-up"}`}>
      <div className="w-[90%] bg-white  slide-down-item  px-[20px] gap-x-[15px] py-[30px] rounded-[40px] mx-auto flex items-center">
        <img src={ASSETS.Notification} alt="" />
        <p className="text-[25px] text-center text-[green]">{message}</p>
      </div>
    </div>
  );
};

export default Notification;