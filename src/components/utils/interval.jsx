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
        <div class="flex items-center justify-center text-[60px] lg:w-[128px] lg:h-[77px]  lg:text-[85px]">
        	 <p class="text-green-500">0:</p>{seconds}
			  </div>
    )
}

export default Interval;
