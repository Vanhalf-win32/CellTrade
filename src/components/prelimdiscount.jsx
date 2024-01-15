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
				<div class="flex flex-col">
					<h1 class="flex justify-center mt-20 mb-4 tracking-tight text-gray-900 lg:text-5xl">
						Предварительная сумма скидки
					</h1>
					<h2 class=" flex mt-5 justify-center lg:text-3xl">
						{props.data.Description}
					</h2>
					<div class="flex flex-col">
						<div class="flex justify-start ml-80 mt-10 w-1/2  lg:text-2xl">
							<h2 class="mr-2"><b>Состояние устройства:</b></h2> <p class="">{condition}</p> 
						</div>
						<div class=" flex justify-start w-1/2 ml-80">
							<span>
								<h2 class="mt-10 sm:text-2xl text-green-500">
									<b>Сумма без учета дополнительной скидки</b>
								</h2>
							</span>							
						</div>
							<div class="flex flex-col mt-5">
									<div class=" flex justify-between ml-80 w-1/2 ">
											<div></div>
											<div class="lg:text-2xl ml-36"><b>{deviceConditionC}</b></div>
											<div class="lg:text-2xl mr-2"><b>{deviceConditionB}</b></div>
									</div>
									<div class=" flex mt-5 justify-between ml-80 border-2 rounded-xl border-green-500 w-1/2 p-3 ">
											<div class="lg:text-2xl">
												Цена CellTrade
											</div>
											<div class="lg:text-2xl">
												{gradePriceC} ₽
											</div>
											<div class="lg:text-2xl">
												{gradePriceB} ₽{gradePriceD}
											</div>
									</div>
							</div>	
							{onPrelimsDiscounts === 1 ? <DiscountsDevices discountsDevices={discountsDevices}/>	: null}						
								<div class="flex justify-center">
									<div class="mr-5">
										<button class="border-2 w-full mt-5 p-3 text-white rounded-2xl bg-green-500" type="button"
											onClick={clientAgree}>
											Клиент согласен
										</button>
									</div>
									<div>
										<button class="border-2 w-full mt-5 p-3 text-white rounded-2xl bg-red-500" 
											type="button"
											onClick={aborted}>
											Клиент отказался
										</button>										
									</div>
								</div>
						</div>
				</div>
    );
};

export default PrelimDiscount;
