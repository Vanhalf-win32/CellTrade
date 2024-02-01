import React from "react";
import { useEffect, useState } from "react";
import img from "../img/checkImei.png";
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
		<div class="flex justify-center">
			<div class='flex justify-center w-full h-full lg:w-[1920px] lg:h-[1146px]'>
				<div class="flex w-full h-full mt-[125px] p-4 lg:p-0 lg:w-[452px] lg:h-[915px]" >
					<form method="POST">
						<div class="ml-4 lg:ml-4 lg:w-[296px] lg:h-[53px] ">
							<h1 class=" text-black text-[42px]">
								Проверка IMEI
							</h1>						
						</div>
						<div class=" flex w-[299px] h-[29px] mt-4 ml-4 mb-4" >
							<h2 class=" text-gray-700 text-[20px]">
								Введите IMEI для проверки
							</h2>
						</div>
						<div class=" flex ml-4 mb-4 items-center">
							<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"  
								type="checkbox" onClick={event => setButEnable('')}/>
							<span class="ml-2 text-[20px]">Телефон</span>						
						</div>
						<div class=" flex ml-4 items-center">
							<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500" type="checkbox" onClick={event => setButEnable('')} />
							<span class="ml-2 text-[20px]">Смарт-часы</span>
						</div>
						<div class="w-full lg:w-[400px] h-[60px] mt-6">
							<label disabled='disable'>
								<input class="w-full h-full text-[20px] text-gray-700 p-2 pl-3 border-2 border-green-500 rounded-2xl"
									type="number" maxLength={15} name="IMEI" placeholder="IMEI" 
									disabled={butEnable}
									onChange={event => validateImei(event.target.value)}
								/>
							</label>
						</div>
						{invalidImei === 1 ? <InvalidImei/> : null}
						<div class="lg:w-[400px] lg:h-[60px]">
							<label class="flex justify-center mt-6">
								<button class="w-full h-full border-2 p-2 rounded-2xl bg-green-500 text-white text-[20px]" type="button"  onClick={getBaseImeiInfo} disabled={butEnable}>
									Проверить
								</button>
							</label>
						</div>
						<div class="flex justify-center mt-2">
							<img src={img} alt="Сканер" width="250" height="250"/>
						</div>
						<div class="lg:w-[450px] lg:h-[200px] mt-6">
							<p class=" w-full h-full p-3 text-[20px] rounded-xl bg-green-200">
								IMEI устройства можно проверить запросом USSD-команды
								<b>*#06#</b> в приложении "Телефон"
								<br/><br/>
								Отсканируйте штрих-код сканером или введите IMEI
								устройства вручную
							</p>						
						</div>
					</form>
				</div>
			</div>
		</div>
    );
};


export default CheckImei;
