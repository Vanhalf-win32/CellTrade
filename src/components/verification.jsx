import React, { useEffect, useState } from "react";
import Loader from "./utils/loader";
import axios from "axios";
import Cookies from 'js-cookie';
import Config from "./variables";


const Verification = ({props, setReshoots, onExit, onNextStep, onBackStep}) => {
	 const [bot, setBot] = useState ({ 
		"bot_status":"",
		"bot_message":"",
		"bot_grade":""
	});
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),		
		}
	});
	
	useEffect(() => {
		const interval = setInterval(() => {
			console.log('INTERVAL');
			const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData`,{});
			data.then((value) => {
				console.log('RESPONSE FOR BACK', value.data);
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
					FinalCondition: bot.bot_grade,
					LimitCondition: props.grade.LimitCondition,
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
						 TRADEIN_STATUS: 'Отказ от бота',			
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
        <div>
            <div className="form__step" id="verification">
				<div className="form__container form__container--sm form__container--center">
					<h1 className="form__title">Ожидается проверка в Celltrade</h1>
						<div className="form__content">
							<div className="form__column">
								<div className="counter"><br/>
                                <div className="form__title">
									<Loader/>
								</div><br/>
									{/* <svg class="counter__svg" width="150" height="150" viewBox="0 0 150 150">
										<circle class="counter__circle counter__circle--bg" cx="75" cy="75" r="65" />
										<circle class="counter__circle counter__circle--fill" cx="75" cy="75" r="65" />
									</svg> */}
									<div className="counter__number"></div>
                                  
								</div>
								<div className="form__description">
									<p className="form__paragraph">
										Если ожидание составило более 5 минут, пожалуйста,
										обратитесь в группу поддержки по Trade-In в мессенджере
									</p>
								</div>
							</div>
						</div>
				</div>
			</div> 
        </div>
    );
};

export default Verification;