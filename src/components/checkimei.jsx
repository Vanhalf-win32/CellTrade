import React from "react";
import { useEffect, useState } from "react";
import img from "../img/content/scanner.jpg";
import axios from "axios";
import imei from "node-imei";
import Config from "./variables";
import InvalidImei from "./utils/invalidImei";


const CheckImei = ({onNextStep}) => {
	
	const [invalidImei, setInvalidImei] = useState(0);
	const [getImei, setGetImei] = useState({"post": {"imei": 0}});
	const [getSpec, setGetSpec] = useState({});
	const [butEnable, setButEnable] = useState('disable');
	const [productDataDefault, setProductDataDefault] = useState({
		data: {
			Color: '',
			Description: '',
			IMEI: 0,
			Model: '',
			ProdCapacity:'',
		},
		grade: {
			CustomerCondition: '',
			FinalCondition: '',
			LimitCondition: '',
		},
		namesNeedPhotos: [],
		steps: {
			current: {
				number: 2,
				name: "checkPhone",
			},
		}
	});
	const [productData, setProductData] = useState({
			post: {
				PRODUCT_DATA: JSON.stringify(),
				FULL_SPEC: '' ,
				CHECKING_DEVICE: 0,
				CRM_STATUS: '',	
				TRADEIN_STATUS: '',		
			}
		});

		const validateImei = (event) => {
			const IMEI = new imei();
			if (event) {
				if(IMEI.isValid(event) && event.length === 15) {
					setGetImei({...getImei, post:{ imei: + event}});
					setInvalidImei(0);
				}else {
					setInvalidImei(1);
				}
			}
		};
		
	
 	const getBaseImeiInfo = () => {
		const responseImei = axios.post
			(	
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getBaseImeiInfo`,
				getImei,
			)
			responseImei.then((value) => {
				if(value.data.data.STATUS === false) {
					alert(value.data.data.MESSAGE)
				} else if(value.data.data.Brand !== "Apple") {
					const data = axios.post(
						`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getDeviceSpecs`,
						{		
							post: {
								Manufacturer: value.data.data.Manufacturer,
								Model: value.data.data.Model,
							  }
						});
						data.then((value) => {
							setGetSpec(value.data);
							setProductDataDefault({...productDataDefault, 
								data: {
									Color: value.data.data.Color,
									Description: value.data.data.Description,
									IMEI: value.data.data.IMEI,
									Model: value.data.data.Model,
									ProdCapacity: value.data.data.ProdCapacity,
									Manufacturer:value.data.data.Brand, 
									LoSToleNStatus: value.data.data.LoSToleNStatus,
								}
							})		
						})
				} else {
					setGetSpec(value.data);
					setProductDataDefault({...productDataDefault, 
						data: {
							Color: value.data.data.Color,
							Description: value.data.data.Description,
							IMEI: value.data.data.IMEI,
							Model: value.data.data.Model,
							ProdCapacity: value.data.data.ProdCapacity,
							Manufacturer:value.data.data.Brand, 
							LoSToleNStatus: value.data.data.LoSToleNStatus,
						}
					})
				}
			});
	};

		useEffect(() => {
			if(productDataDefault.data.IMEI) {
				checkProductData();
			}
		},[productDataDefault.data.IMEI]);		

		const checkProductData = () => {
			if( productDataDefault.data.Manufacturer = "Apple") {
				setProductData({
						post: {
							PRODUCT_DATA: JSON.stringify(productDataDefault),
							FULL_SPECS: productDataDefault.data.Manufacturer
							+' '+
							productDataDefault.data.Model
							+' '+
							productDataDefault.data.ProdCapacity
							+' '+
							productDataDefault.data.Color
							,
							CHECKING_DEVICE : productDataDefault.data.IMEI,
							DEVICE_INFO: JSON.stringify(productDataDefault.data),
							CRM_STATUS: 'partnercheck',
							TRADEIN_STATUS:	'newtradein',		
						}
					});	
			} else {
					setProductData({
						post: {
							PRODUCT_DATA: JSON.stringify(productDataDefault),
							FULL_SPECS: productDataDefault.data.Manufacturer +' '+ productDataDefault.data.Model,
							CHECKING_DEVICE : productDataDefault.data.IMEI,
							DEVICE_INFO: JSON.stringify(productDataDefault.data),
							CRM_STATUS: 'partnercheck',
							TRADEIN_STATUS:	'newtradein',		
						}
					});	
				}	
		};
		useEffect(() => {
			if (productData.post.CHECKING_DEVICE) {
					const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
						productData,
						);
						data.then((value) => { 
							onNextStep({...productDataDefault,
								element_id : value.data.data.ELEMENT_ID,
								product_sessid: value.data.data.PRODUCT_SESSID,
								message: value.data.data.MESSAGE,
							});
						});
				}	
				
		},[productData]);


    return(
        <div class='flex justify-center'>
            <form method="POST">
						<div class="">
							<h1 class="flex justify-center mt-20 mb-4 tracking-tight text-gray-900 lg:text-5xl">Проверка IMEI</h1>
								<div class="">
									<div class="">
										<h2 class="flex justify-center mt-5 mb-10 lg:text-2xl">Введите IMEI для проверки</h2>
									</div>
									<div class="flex flex-col ml-20 text-lg">
										<div class="flex w-32 mb-1">
											<input type="radio" name="RADIO_NUMBERS" onClick={event => setButEnable('')}/>
											<h2 class="pl-3 ">Телефон</h2>
										</div>
										<div class="flex w-32">
											<input type="radio" name="RADIO_NUMBERS" onClick={event => setButEnable('')} />
											<h2 class="pl-3 ">Смарт-часы</h2>
										</div>
									</div>
									<label class="flex justify-center" disabled='disable'>
										<input class="w-72 mt-5 text-gray-700 p-2 pl-3 border-2 border-green-500 rounded-2xl"
											type="number" maxLength={15} name="IMEI" placeholder="IMEI" 
											disabled={butEnable}
											onChange={event => validateImei(event.target.value)}
										/>
									</label>
									{invalidImei === 1 ? <InvalidImei/> : null}
									<label class="flex justify-center mt-2">
										<button class="border-2 w-72 p-2 rounded-2xl bg-green-500" type="button"  onClick={getBaseImeiInfo} disabled={butEnable}>
											Проверить
										</button>
									</label>
									<div>
										 <div class="flex justify-center mt-10 ml-20">
											<img src={img} alt="Сканер" width="350" height="350"/>
										</div>
										<div class="flex flex-col mt-10">
											<p class="ml-20 mb-5 p-2 rounded-xl bg-green-200 w-96">
												IMEI устройства можно проверить запросом USSD-команды
												*#06#
												в приложении "Телефон".
											</p>
											<p class=" ml-20 bg-green-200 p-2 rounded-xl w-96">
												Отсканируйте штрих-код сканером или введите IMEI
												устройства вручную
											</p>
										</div>
									</div>
								</div>
						</div>
				</form>
        </div>
    );
};


export default CheckImei;
