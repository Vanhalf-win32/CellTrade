import React, { useEffect, useState } from "react";
import Loader from "./utils/loader";
import axios from "axios";
import Cookies from 'js-cookie';
import Config from "./variables";


const Verification = ({props, setReshoots, onExit, onNextStep, onBackStep}) => {
	const [bot, setBot] = useState ({});
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),		
		}
	});
	
	useEffect(() => {
		const interval = setInterval(() => {
			const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData`,{});
			data.then((value) => {
				if(value.data.data.BOT_DATA !== '') { 
					clearInterval(interval);
					setBot(JSON.parse(value.data.data.BOT_DATA));
				}
			})
		}, 15000);
	},[]);

	useEffect(() => {				
		if(bot.bot_status === "accepted_tradein") {
			onNextStep({
					CustomerCondition: props.grade.CustomerCondition,
					FinalCondition: '',
					LimitCondition: bot.bot_grade,
			}, {
				current: {
					name: 'totalDiscount',
					number: 8,
				}
			},
			bot);
			alert(bot.bot_message);
		} else if (bot.bot_status === "reshoot_photos") {
			onBackStep();
			setReshoots(bot.bot_message);
			alert(bot.bot_message);
		} else if(bot.bot_status === "rejected_tradein") {
			alert(bot.bot_message);
			const data = axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
				 {
					 post: {
						 PRODUCT_DATA: JSON.stringify(props),
						//  TRADEIN_STATUS: 'Отказ от бота',			
					 }
				 }
			);
			data.then((value) => {
			 if(value.data.status === "success") {
				 Cookies.remove('PRODUCT_SESSID');
				 onExit();
			 }
		 })
			onExit();
		}
	},[bot]);


    return(
        <div class="flex justify-center">
            <div class=" w-[700px] h-[600px] mt-[127px] ">
				<div class=" flex justify-center w-[700px] h-[53px] " >
					<h1 class="tracking-tight text-gray-900 text-[40px]">
						Ожидается проверка в Celltrade
					</h1>
				</div>
				<div class="ml-[189px] mt-[126px] mr-[194px] mb-[138px]">
					<div class=" flex justify-center w-[317px] h-[192px]">
						<Loader/>
					</div>
				</div>
				<div class="w-[700px] h-[86px] rounded-xl bg-green-200">
					<p  class=" w-full h-full p-3 text-[20px] ">
						Если ожидание составило более 5 минут, пожалуйста,
						обратитесь в группу поддержки по Trade-In в мессенджере
					</p>
				</div>
			</div> 
        </div>
    );
};

export default Verification;