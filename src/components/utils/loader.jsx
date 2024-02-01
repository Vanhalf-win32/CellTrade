import React, { useEffect, useRef, useState } from "react";



export default function Loader() {

    const Ref = useRef(null);
    const [timer, setTimer] = useState("0:00");
    
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9
                    ? minutes
                    : minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        setTimer("0:00");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds());
        deadline.setMinutes(deadline.getMinutes() + 5);
        return deadline;
    };
 
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 

    return (
        <div class=" flex justify-center w-[317px] h-[192px]">
            <h2 class="text-[100px]">{timer}</h2>
        </div>
    );
}