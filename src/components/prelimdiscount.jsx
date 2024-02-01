import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";
import DiscountsDevices from "./utils/discountsDevices";

const PrelimDiscount = ({props, onExit, onNextStep}) => {
	const [deviceConditionB, setDeviceConditionB] = useState('');
	const [deviceConditionC, setDeviceConditionC] = useState('');
	const [onPrelimsDiscounts, setOnPrelimsDiscounts] = useState(0);
	const [discountsDevices, setDiscountsDevices] = useState({});
	const [gradePriceB, setGradePriceB] = useState(0);
	const [gradePriceC, setGradePriceC] = useState(0);
	const [gradePriceD, setGradePriceD] = useState(0);
	const [condition, setCondition] = useState('');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(),			
		}
	});

	const [getPrice, setGetPrice] = useState({
		post: {
			Manufacturer: "",
			Model: "",
			Memory: "",
			Condition: ""
		}
	})

	useEffect(()=> {
		if(props.grade.PreliminaryCondition === 'D') {
			setDeviceConditionB('Плохое');
			setCondition('Экран разбит и/или имеет выгорания');
			setGetPrice({
				post: {
					Manufacturer: props.data.Manufacturer,
					Model: props.data.Model,
					Memory: props.data.ProdCapacity,
					Condition: props.grade.PreliminaryCondition,
				}
			})
		} else if (props.grade.PreliminaryCondition === 'C') {
			setDeviceConditionB('Отличное')
			setDeviceConditionC('Хорошее');
			setCondition('Экран не разбит и не имеет выгораний');
			setGetPrice({
				post: {
					Manufacturer: props.data.Manufacturer,
					Model: props.data.Model,
					Memory: props.data.ProdCapacity,
					Condition: props.grade.PreliminaryCondition,
				}
			})
		}
	},[]);

	useEffect(() => {
		if (getPrice.post.Condition !== "") {
			const data = axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getPreliminaryPrice`,
				getPrice
			);
			data.then((value) => {
				setGradePriceB(value.data.data.GRADE_PRICE_B);
				setGradePriceC(value.data.data.GRADE_PRICE_C);
				setGradePriceD(value.data.data.GRADE_PRICE_D);
				setDiscountsDevices(value);
				setOnPrelimsDiscounts(1);
			});
		}
	},[getPrice]);
	useEffect(() => {
		setProductData({
			"PRODUCT_DATA": JSON.stringify(props),
		})
	},[getPrice]);

	const clientAgree = () => {
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'acceptedpreprice',			
				}
			}
		);
		onNextStep(
			{
				current: {
					number: 5,
					name: 'checkDefect',
				}
			}
		)
	};

	const aborted = () => {
		const data = axios.post(
		   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'rejectedpreprice',			
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
					<div class="mb-4 tracking-tight text-gray-900 text-[36px] lg:text-[44px]" >
						<h1>
							Предварительная сумма скидки
						</h1>					
					</div>
					<div>
						<h2 class="mt-5 text-[26px] lg:text-[30px]">
							{props.data.Description}
						</h2>				
					</div>
					<div class="mt-4">
						<h2>
							<b class="mr-1">Состояние устройства:</b> {condition}
						</h2> 						
					</div>
					<div>
						<h2 class="w-1/2 lg:w-full mt-8 text-green-500">
							Сумма без учета дополнительной скидки
						</h2>		
					</div>
					<div class="flex justify-end mt-4 lg:mt-0">
						<p class="mr-2 lg:w-[100px] h-[30px] lg:text-[20px] lg:mr-4">
							{deviceConditionC}
						</p>
						<p class="mr-2 lg:w-[100px] h-[30px] lg:text-[20px] lg:mr-6">
							{deviceConditionB}
						</p>
						<p class="mr-2 lg:w-[100px] h-[30px] lg:text-[20px]">
							Плохое 
						</p>
					</div>
					<div class="flex items-center justify-between w-full h-14 mt-2 lg:mt-2 lg:w-[795px] lg:h-[68px] border-2 border-green-500 rounded-2xl ">
						<div class="">
							<h2 class="lg:text-[20px] ml-4" >
								Цена  CellTrade
							</h2>
						</div>
						<div class="flex">
							<div class="flex justify-center mr-2 w-[50px] lg:mr-0 lg:w-[100px] lg:h-[30px]">
								<p class="lg:text-[20px]">
									{gradePriceC} ₽
								</p>							
							</div>
							<div class="flex justify-center mr-2 w-[50px] lg:w-[100px] lg:h-[30px] lg:mr-4 border-l-2 border-l-green-500">
								<p class="lg:text-[20px]">
									{gradePriceB} ₽
								</p>
							</div>
							<div class="flex justify-center mr-4 w-[50px] lg:w-[100px] lg:h-[30px] lg:mr-4 border-l-2 border-l-green-500">
								<p class="lg:text-[20px]">
									{gradePriceD} ₽
								</p>
							</div>
						</div>
					</div>
					<div class="flex items-center w-1/2 mt-8 lg:w-[461px] lg:h-[58px] lg:mt-6">
						<p class="text-green-500">
							Сумма с учетом дополнительной скидки,<br/>
							при покупке следующих моделей
						</p>
					</div>
					<div>
						{onPrelimsDiscounts === 1 ? <DiscountsDevices discountsDevices={discountsDevices}/>	: null}
					</div>
					<div class="flex w-full mt-6 lg:mt-0">
						<div class="flex justify-center w-full h-12 text-white mr-4 lg:text-[20px] lg:w-[224px] lg:h-[68px] bg-green-500 rounded-2xl">
							<button class=""
								type="button"
								onClick={clientAgree}>
								Клиент согласен
							</button>						
						</div>
						<div class=" flex justify-center w-full text-white lg:text-[20px] lg:w-[224px] lg:h-[68px] bg-red-500 rounded-2xl">
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

export default PrelimDiscount;
