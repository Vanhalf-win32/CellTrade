import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import checkForSigned from "../img/checkForSigned.png";
import axios from "axios";
import Config from "./variables";

const Signed = ({props, onNextStep}) => {
	const [contract, setContract] = useState({
		"post": {
			"product_id": props.element_id,
		}
	})
	const [barCode, setBarCode] = useState('');
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),
			TRADEIN_STATUS:	'contractsigned',
		}
	});
	const [getBarCode, setGetBarCode ] = useState(
		{
			"post": {
				"device": props.data.IMEI,
				"product_id": props.element_id,
			}
		  }
	)

	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
	productData);
    
	useEffect(() => {
		const data = axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateBarcode`,
		 	getBarCode
		);
		data.then((value) => {
			setBarCode(value.data.data.Barcode)
		});
	},[])

	const confirmContract = () => {
		const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=confirmContract`,
			contract
		);
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			 {
				 post: {
					 TRADEIN_STATUS: 'completedtradein',			
				 }
			 }
		);
		data.then((value) => {
			if(value.data.data) {
				Cookies.remove('PRODUCT_SESSID');
				onNextStep()
			}
		});
	}
	return (
        <div class="flex justify-center">
			<div class="flex justify-center w-full h-full p-4 lg:w-[1920px] lg:h-[1146px]">
				<div class=" mt-10 lg:mt-[127px] lg:w-[462] lg:h-[610px]">
					<div class="flex items-center mb-4">
						<div class="tracking-tight text-gray-900 text-[36px] lg:text-[42px]">
							<h1>
								Договор подписан
							</h1>
						</div>
						<div class="ml-2 mt-2">
							<img class="size-10" src={checkForSigned} alt="check"/>
						</div>
					</div>
					<div>
						<h2>
							{props.price}
						</h2>
					</div>
					<div class="lg:w-[452px] h-[87px] mt-4">
						<p class="text-[16px] lg:text-[20px]">
							Отсканируйте или скопируйте данный 
							штрих-код в свою систему и продолжите
							оформление продажи там
						</p>
					</div>
					<div class="lg:w-[460px] h-[162px] mt-6">
						<img src={barCode} alt="QRcode"/>
					</div>
					<div class="lg:w-[461px] lg:h-[356px] bg-green-200 rounded-2xl p-4 lg:text-[22px]">
						<p class="">
							<b>
								Перед тем, как сдать своё устройство в Trade-in,
								рекомендуем: 
							</b>	
						</p>
						<p class="mt-5">
							- На устройствах Apple отключить функцию "Найти Iphone";
						</p>
						<p class="mt-5">
							- Сделать резервную копию на устройстве;
						</p>
						<p class="mt-5">
							- Снять все защитные пленки/стекла с экрана.
						</p>
					</div>
					<div class="flex justify-center mt-6 rounded-2xl w-[200px] bg-green-500 lg:w-[287px] h-[68px] ">
						<button 
							class="text-white lg:text-[20px]"
							type="button"
							onClick={confirmContract}
						>
							Завершить операцию
						</button>
					</div>
				</div>
			</div>        
         </div>
    );
};

export default Signed;
