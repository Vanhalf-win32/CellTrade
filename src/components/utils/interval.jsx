import React, { useEffect, useState } from "react";

const Interval = ({setEnableButton}) => {
    const [seconds, setSeconds] = useState(60);
    const [timerActive, setTimerActive] = useState(true);
  
    useEffect(() => {
      if (seconds > 0 && timerActive) {
        setTimeout(setSeconds, 1000, seconds - 1);
      } else {
        setEnableButton();
        setTimerActive(false);
        setTimerActive(true);
      }
    }, [ seconds, timerActive]);
  
    return(
        <div>
            <p className="form__paragraph form__paragraph--indent-top-desktop">
				Повторная отправка СМС возможна через {seconds} ...
			</p>
        </div>
    )
}

export default Interval;