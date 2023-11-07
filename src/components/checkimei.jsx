import React from "react";
import { useEffect, useState } from "react";
import img from "../img/content/scanner.jpg";
import axios from "axios";
import CheckPhone from "./checkphone";




const CheckImei = ({onNextStep}) => {

	// const imei = require('node-imei');

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
				number: 1,
				name: "checkPhone"
			},
		}
	});
	const [productData, setProductData] = useState({
			post: {
				"PRODUCT_DATA": JSON.stringify(),
				"FULL_SPEC": '' ,
				"CHECKING_DEVICE" : 0,			
			}
		});
		
	
 	const getBaseImeiInfo= () => {
		const responseImei = axios.post(	
			'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getBaseImeiInfo',
				getImei,
			)
			responseImei.then((value) => {
				if(value.data.data.MESSAGE === 'Это устройство в чёрном списке!') {
					alert("Это устройство в чёрном списке!")
				} else {
					setGetSpec(value.data);
					setProductDataDefault({...productDataDefault, 
						data: {
							Color: value.data.data.Color,
							Description: value.data.data.Description,
							IMEI: value.data.data.IMEI,
							Model: value.data.data.Model,
							ProdCapacity: value.data.data.ProdCapacity,
							Manufacturer:'Apple', // TODO:
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

			setProductDataDefault({...productDataDefault, 
				steps:{
					current: {
						name: "checkPhone",
						number: 1,
					}
				}});	
				setProductData({
						post: {
							PRODUCT_DATA: JSON.stringify(productDataDefault),
							FULL_SPEC: productDataDefault.data.Model,
							CHECKING_DEVICE : productDataDefault.data.IMEI, 			
						}
					});		
		};
		useEffect(() => {
			if (productData.post.CHECKING_DEVICE) {
					const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
						productData,
						);
							data.then((value) => { 
								console.log('RESPONS CHECK IMEI',value.data);
								onNextStep({...productDataDefault,
									elemente_id : value.data.data.ELEMENT_ID,
									product_sessid: value.data.data.PRODUCT_SESSID,
									message: value.data.data.MESSAGE
								});
							});
				}	
				
		},[productData]);




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
										form__btn--resolve" type="button"  onClick={getBaseImeiInfo} disabled={butEnable}>
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
