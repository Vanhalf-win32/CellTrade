import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";
import DiscountsDevices from "./utils/discountsDevices";

const TotalDiscount = ({props, onExit, onNextStep}) => {
	const [onPrelimsDiscounts, setOnPrelimsDiscounts] = useState(0);
	const [finalCondition, setFinalCondition] = useState('');
	const [discountsDevices, setDiscountsDevices] = useState({});
	const [defect, setDefect] = useState('');
	const [finalPrice, setFinalPrice] = useState(0);
	const [condition, setCondition] = useState('Отличное')
	const [getPrice, setGetPrice] = useState({
		post: {
			"Manufacturer": "",
			"Model": "",
			"Memory": "",
			"Condition": ""
		}
	});
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),
            FINAL_PRICE: props.price,
			TRADEIN_STATUS: 'photoschecked',
			LIMIT_CONDITION: props.grade.LimitCondition,			
		}
	});
	
	axios.post(
		`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData
	);

	useEffect(() => {
		if(props.grade.CustomerCondition && props.grade.LimitCondition) {
	  		if(props.grade.CustomerCondition === 'D') {			
				axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  	{post: {"FINAL_CONDITION" : "D",}});
			  	setFinalCondition('D');		 
		} else if(props.grade.CustomerCondition === 'C' && props.grade.LimitCondition === 'D') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "D",}});
			  setFinalCondition('D');		 
		} else if(props.grade.CustomerCondition === 'C' && props.grade.LimitCondition === 'C') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "C",}});
			  setFinalCondition('C');		 
		} else if(props.grade.CustomerCondition === 'C' && props.grade.LimitCondition === 'B') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "C",}});
			  setFinalCondition('C');		 
		} else if(props.grade.CustomerCondition === 'B' && props.grade.LimitCondition === 'D') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "D",}});
			  setFinalCondition('D');		 
		} else if(props.grade.CustomerCondition === 'B' && props.grade.LimitCondition === 'C') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "C",}});
			  setFinalCondition('C');		 
		} else if(props.grade.CustomerCondition === 'B' && props.grade.LimitCondition === 'B') {
			axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			  {post: {"FINAL_CONDITION" : "B",}});
			  setFinalCondition('B');		 
		}
	}
	},[]);
	
	  
		useEffect(() => {
			if(getPrice.post.Condition === 'C') {
				setCondition('Хорошее');
				const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getFinalPrice`,
				 getPrice);
				 data.then((value) => {
					setFinalPrice(value.data.data.FINAL_PRICE);
					setDefect(props.bot.bot_message);
					setDiscountsDevices(value);
					setOnPrelimsDiscounts(1);
				 })
			} else if (getPrice.post.Condition === 'D') {
				setCondition('Плохое');
				const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getFinalPrice`,
				getPrice);
				data.then((value) => {
					setFinalPrice(value.data.data.FINAL_PRICE);
					setDefect(props.bot.bot_message);
					setDiscountsDevices(value);
					setOnPrelimsDiscounts(1);
				})
			} else if (getPrice.post.Condition === 'B') {
				setCondition('Отличное');
				const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getFinalPrice`,
				getPrice);
				data.then((value) => {
					setFinalPrice(value.data.data.FINAL_PRICE);
					setDefect(props.bot.bot_message);
					setDiscountsDevices(value);
					setOnPrelimsDiscounts(1);
				})
			}
		},[getPrice]);		
		
		useEffect(() => {
			const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData`,{});
			data.then((value) => {
				setGetPrice({
					post: {
						"Manufacturer": props.data.Manufacturer,
						"Model": props.data.Model,
						"Memory": props.data.ProdCapacity,
						"Condition": finalCondition,
					}
				});
			})	
		},[finalCondition]);

		const clientAgree = () => {
			axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
				{
					post: {
						PRODUCT_DATA: JSON.stringify(props),
						TRADEIN_STATUS:	'clientagree',			
					}
				}
			);
			onNextStep(
				{
					current: {
						number: 9,
						name: 'pickUpDevice'
					}
				},
					finalPrice
			)
		};

		const aborted = () => {
			const data = axios.post(
			   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
				{
					post: {
						PRODUCT_DATA: JSON.stringify(props),
						TRADEIN_STATUS:	'clientdisagree',			
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
	   };

    return(
        <div class="flex justify-center">
			<div class="flex justify-center w-full h-full lg:w-[1920px] lg:h-[1146px]">
				<div class="w-full h-full mt-10 p-4 lg:p-0 lg:w-[804px] lg:h-[787px] lg:mt-[125px]">
					<div class="mb-4 tracking-tight text-gray-900 text-[34px] lg:text-[44px]">
						<h1>
							Итоговая сумма скидки
						</h1>					
					</div>
					<div>
						<h2>
							<b class="mr-1">Состояние устройства:</b> {condition}
						</h2>
					</div>
					<div>
						<h2>
							<b class="mr-1">Дефект:</b> {defect}
						</h2>
					</div>
					<div class="w-1/2 lg:w-full mt-8 text-green-500">
						<h2>
							Сумма без учёта дополнительной скидки
						</h2>
					</div>
					<div class="flex justify-end mt-4 lg:mt-0">
						<p class="lg:w-[100px] h-[30px] lg:text-[20px] mr-10">
							{condition}
						</p>
						<p class="lg:w-[100px] h-[30px] lg:text-[20px]">
							Рабочее
						</p>
					</div>
					<div class="flex items-center justify-between w-full h-14 lg:w-[795px] lg:h-[68px] border-2 border-green-500 rounded-2xl mt-2">
						<div class="">
							<h2 class="lg:text-[20px] ml-4" >
								Цена  CellTrade
							</h2>
						</div>
						<div class="flex">
							<div class="flex justify-center w-[100px] h-[30px]">
								<p class="lg:text-[20px]">
									{finalPrice} ₽
								</p>							
							</div>
							<div class=" flex justify-center w-[100px] h-[30px] mr-4 border-l-2 border-l-green-500">
								<p class="lg:text-[20px]">
									₽
								</p>
							</div>
						</div>
					</div>
					<div class=" flex items-center w-full mt-8 mb-6 lg:mb-0 lg:w-[461px] lg:h-[58px] lg:mt-6">
						<p class="text-green-500">
							Сумма с учетом дополнительной скидки,<br/>
							при покупке следующих моделей
						</p>
					</div>
					<div>
						{onPrelimsDiscounts === 1 ? <DiscountsDevices discountsDevices={discountsDevices}/> : null}
					</div>
					<div class="flex justify-around w-full mt-6 lg:mt-0 lg:justify-start">
						<div class="flex justify-center text-white mr-4 w-[150px] h-14 lg:text-[20px] lg:w-[224px] lg:h-[68px] bg-green-500 rounded-2xl">
							<button class=""
								type="button"
								onClick={clientAgree}>
								Клиент согласен
							</button>						
						</div>
						<div class="flex justify-center text-white w-[150px] lg:text-[20px] lg:w-[224px] lg:h-[68px] bg-red-500 rounded-2xl">
							<button
								type="button"
								onClick={aborted}>
								Клиент отказался
							</button>							
						</div>
					</div>
				</div>
			</div>
        </div>            
    );
};

export default TotalDiscount;