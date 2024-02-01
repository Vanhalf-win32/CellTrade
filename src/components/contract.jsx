import axios from "axios";
import React, { useEffect, useState } from "react";
import Interval from "./utils/interval";
import Config from "./variables";

const Contract = ({ props, onNextStep, onBackStep}) => {
	const [enableButton, setEnableButton] = useState('disabled');	
	
	const [seconds, setSeconds] = useState(6);
	const [reContract, setReContract] = useState('');
	const [contract, setContract] = useState({
		"post" : {
			client: JSON.stringify({
				"SURNAME": props.fio.family,
				"NAME": props.fio.name,
				"PATRONYMIC": props.fio.otche,
				"DATE_OF_BIRTH": props.fio.date,
				"PLACE_OF_BIRTH": props.fio.place,
				"PHONE": props.fio.phone,
				"EMAIL": props.fio.email,
			}),
			device: JSON.stringify({
				"vendor": props.data.Manufacturer,
				"model": props.data.Model,
				"color": props.data.Color,
				"memory": props.data.ProdCapacity,
				"price": props.price,
			}),
			"product_sessid": props.product_sessid,
			"product_id": props.element_id,
		}
	})
	
	const [button, setButton] = useState('disabled');
	const [getSms, setGetSms] = useState('');

	const [checkSms, setCheckSms] = useState({
		"post": {
			"product_id": props.element_id,
			"code": "",
		}
	});
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
		}
	});
	const [productID, setProductID] = useState(
		{
			"post": {
				phone: props.fio.phone,
				product_id: props.element_id,
			}
		}
	)

	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData);

	useEffect(() => {
		const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateContract`,
			contract);
		data.then((value) => {
			setGetSms(value.data.data.MESSAGE);
			 if (value.data.data.STATUS) {
				setButton('');
			}
		})
	}, [reContract]);
	
	const getCheckSms = () => {
		const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=checkSmsCode`,
			checkSms);
		data.then((value) => {
			if(value.data.data) {
				onNextStep({
					current: {
						number: 12,
						name: 'signed'
					}
				})
			} else {
				alert("Invalid code SMS");

			}
		})
	}

	return (
		<div class="flex justify-center">
			<div class="flex justify-center w-full h-full p-4 lg:p-0 lg:w-[1920px] lg:h-[1146px]">
				<div class="w-full h-full mt-10 lg:w-[476px] lg:h-[750px] lg:mt-[127px]">
					<div class="mb-4 tracking-tight text-gray-900 text-[44px]">
						<h1>
							Договор
						</h1>
					</div>
					<div class="mb-4">
						<h2 class="text-[20px] text-green-500">
							Устройства
						</h2>
					</div>
					<div>
						<h2 class="text-[20px]">
							Производитель: <b>{props.data.Manufacturer}</b>
						</h2>
					</div>
					<div>
						<h2 class="text-[20px]">
							Модель: <b>{props.data.Model}</b>
						</h2>
					</div>
					<div>
						<h2 class="text-[20px]">
							Память: <b>{props.data.ProdCapacity}</b>
						</h2>
					</div>
					<div>
						<h2 class="text-[20px]">
							Цвет: <b>{props.data.Color}</b>
						</h2>
					</div>
					<div class="mt-6 mb-4">
						<h2 class="text-[20px] text-green-500">
							Персональные данные
						</h2>
					</div>
					<div class="mb-2">
						<h2 class="text-[20px]">
							<b>{props.fio.family} {props.fio.name} {props.fio.otche}</b>
						</h2>
					</div>
					<div class="mb-6">
						<h2 class="text-[22px]">
							<b>{props.fio.phone}</b>
						</h2>
					</div>
					<div class="flex justify-between w-[335px] h-[68px] mb-6">
						<div class="flex justify-center w-[126px] h-[68px] ">
							<input
								class="w-full h-full border-green-500 rounded-2xl"
								type="number" 
								name="CODE" 
								placeholder="код из СМС"
								onChange={(event) => {
									setCheckSms({ 
										post: { 
											product_id: props.element_id, 
											code: event.target.value, 
										} 
									}) 
								}}
							/>
						</div>
						<div class="flex justify-center w-[193px] h-[68px] bg-green-500 rounded-2xl">
							<button
								class="text-[20px] text-white"
								type="button" 
								disabled={button}
								onClick={getCheckSms}>
								Подтвердить
							</button>
						</div>
					</div>
					<div class="flex justify-between w-full lg:w-[476px] h-[86px]">
						<div class="w-[277px] h-[86px] bg-green-200 rounded-2xl p-3 ">
							<p class="text-[20px]">
								Повторная отправка SMS возможна через
							</p>
						</div>
						<div class="flex justify-center w-[174px] h-[77px]">
							<Interval setEnableButton={setEnableButton}/>
						</div>
					</div>
					<div class="mt-4 lg:mt-2">
						<h2 class="text-[20px] text-green-500">
							{getSms}
						</h2>
					</div>
					<div class="flex justify-around lg:justify-between w-full mt-4 lg:w-[475px] h-[68px] lg:mt-2">
						<div class="flex justify-center lg:w-[333px] h-[68px]">
							<button 
								class="w-full p-2 rounded-2xl bg-green-500 text-white lg:text-[20px] disabled:bg-gray-400 "
								type="button"
								disabled={enableButton}
								onClick={() => {setReContract(Date.now())}}
							>
								Отправить СМС повторно
							</button>						
						</div>
						<div class="flex justify-center bg-red-500 rounded-2xl w-[126px] h-[68px]">
							<button 
								class="text-white lg:text-[20px]"
								type="button"
								onClick={onBackStep}
							>
								назад
							</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contract;
