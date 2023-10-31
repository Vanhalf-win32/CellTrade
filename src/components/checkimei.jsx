import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/content/scanner.jpg";
import axios from "axios";
import CheckPhone from "./checkphone";




const CheckImei = () => {

	// const imei = require('node-imei');

	const [productDataDefault, setProductDataDefault] = useState({
		data: {
			Color: '',
			Description: '',
			IMEI: '',
			Model: '',
			ProdCapacity:'',
		},
		device: {
			numbers: "",
				name: "",
				type: "",
				system: "",
				vendor: "",
				model: "",
				state: ""
		},
		status: "",
		grade: "",
		namesNeedPhotos: [],
		steps: {
			current: {
				number: 0,
				name: ""
			},
			checkDevice: {
					currentCheckboxes: []
			},
			checkDefect: {
				currentBtn: ""
			},
			preliminaryDiscount: null,
			checkDefectDevice: {
				currentCheckboxes: []
			},
			checkPhotos: null,
			checkMarking: {
				currentPhotos: []
			},
			thanks: null,
			verification: null,
			totalDiscount: null,
			pickUpDevice: {
				currentCheckboxes: []
			},
			consignmentAgreements: {
				dataForm: null
			},
			contract: null,
			contractIsSigned: null,
		}
	});
	const [getImei, setGetImei] = useState({"post": {"imei": 0}});
	const [getSpec, setGetSpec] = useState({});
	const [butEnable, setButEnable] = useState('disable');
	const [productData, setProductData] = useState({
			post: {
				"PRODUCT_DATA": JSON.stringify(),
				"FULL_SPEC": '' ,
				"CHECKING_DEVICE" : 0,			
			}
		});

		
	
 	const checkImei= () => {
		const responseImei = axios.post(	
			'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getBaseImeiInfo',
				getImei,
			)
			responseImei.then((value) => {
				if(value.data.data.MESSAGE === 'Это устройство в чёрном списке!') {
					alert("Это устройство в чёрном списке!")
				} else (
					setGetSpec(value.data)
				) 
			});
			

		// if(getSpec.data.ProdCapacity === '' || getSpec.data.Color === '') {
		// 	const responseSpec = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getDeviceSpecs',
		// 		getSpec, 
		// 	)
		// 	responseSpec.then((value)=> {
		// 		console.log('TETS')
		// 		console.log(value)
		// 	})
		// }
		};
		
		console.log(getSpec)

	useEffect(() =>{
		// const setVision = document.querySelectorAll('.form__step');
		// setVision[0].style.display = 'flex';
	},[butEnable]);

	useEffect(() => {
		copyObjects(productDataDefault, getSpec);
			if(productDataDefault.data.IMEI) { 
			setProductData({...productData, 
					CHECKING_DEVICE: productDataDefault.data.IMEI, 
					FULL_SPEC: productDataDefault.data.Model,
					PRODUCT_DATA: JSON.stringify(productDataDefault)
				});
			const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
				productData,
				);
				data.then((value) => {
					console.log(value.data);
				});
		};
	},[getSpec]);

	function copyObjects(obj1, obj2){
		function copyObject(obj){
			var result = {};
			for (let key in obj) {
				if(typeof(obj[key]) != ''){
					result[key] = obj[key];
				}
				else {
					result[key] = copyObject(obj[key])
				}
			}
			return result;
		}
		for (let key in obj2){
			if(typeof(obj2[key]) != 'object'){
				obj1[key] = obj2[key];
			}
			else {
				obj1[key] = copyObject(obj2[key]);
			}
		}
		return obj1;
	}

    return(
        <div>
            <form className="form" action="" method="POST">
					<div className="form__step" id="check-numbers">
						<div className="form__container form__container--sm form__container--center">
							<h1 className="form__title form__title--center">Проверка IMEI</h1>
							<div className="form__content">
								<div className="form__column">
									<div className="form__description form__description--center">
										<p className="form__paragraph">Введите IMEI для проверки</p>
									</div>
									<label className="form__label form__label--radio">
										<input className="visually-hidden form__input form__input--radio" type="radio" name="RADIO_NUMBERS" onClick={event => setButEnable('')}/>
										<span className="form__radio-custom"></span>
										Телефон
									</label>
									<label className="form__label form__label--radio">
										<input className="visually-hidden form__input form__input--radio" type="radio" name="RADIO_NUMBERS" onClick={event => setButEnable('')} />
										<span className="form__radio-custom"></span>
										Смарт-часы
									</label>
									<label disabled='disable' className="form__label">
										<input className="form__input form__input--number form__input--numbers" 
											type="number" name="IMEI" placeholder="IMEI" 
											disabled={butEnable} 
											onChange={event => setGetImei({...getImei, post:{ imei: + event.target.value}})}
										/>
										<span className="error"></span>
									</label>
									<button className="
										form__btn
										form__btn--fill-color-main
										form__btn--indent-top
										form__btn--resolve" type="button"  onClick={checkImei} disabled={butEnable}>
										Проверить
									</button>
									<div className="tooltip">
										<img className="tooltip__img" src={img} alt="Сканер" width="350" height="350" />
										<div className="tooltip__content">
											<p className="form__paragraph">
												IMEI устройства можно проверить запросом USSD-команды
												<a className="form__link form__link--bold" href="tel:*#06#">*#06#</a>
												в приложении "Телефон"
											</p>
											<p className="form__paragraph">
												Отсканируйте штрих-код сканером или введите IMEI
												устройства вручную
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
        </div>
    );
};


export default CheckImei;
