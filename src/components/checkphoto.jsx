import React, { useEffect, useState } from "react";
import img from "../img/content/qr-code.jpg";
import axios from "axios";


const CheckPhoto = ({props, reshoots, onNextStep}) => {
	
	const [qrCode, setQrCode] = useState('');
	const [statusBot, setStatusBot] = useState('');
	const [link, setLink] = useState('https://smartprice/su/hMG38w'); //TODO::
	const [productDataDefault, setProductDataDefault] = useState({props});
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),		
		}
	});
	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
	productData);

	useEffect(() => {
		const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateQRCode',{});
		data.then((value) => {
			console.log('QRCODE',value);
			setQrCode(value.data.data.QRCode);
			setLink(value.data.data.link);
		})
	},[]);

	useEffect(() => {
		setProductDataDefault({...props, 
			steps: {
				current : {
					number: 7,
					name: 'checkBOT',
				}
			}
		});	
	},[qrCode]);
	
	useEffect(() => {
		const interval = setInterval(() => {
			console.log('INTERVAL');
			const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData',{});
			data.then((value) => {
				console.log('RESPONSE_CHECK_PHOTOS', value);
				if(value.data.data.PHOTOS_UPLOADED_FLAG === 'Y') {
					onNextStep(props);
					clearInterval(interval);
				}
			})
		}, 5000);

	},[productDataDefault]);
	

    return (
        <div>
            <div className="" id="check-photos">
				<div className="form__container form__container--sm form__container--center">
					<h1 className="form__title form__title--center">
						Проверка фотографий устройства
					</h1>
					<h2 className="form__title form__title--center" >
						{statusBot}
					</h2>
					<div className="form__content">
						<div className="form__column">
							<div className="form__description">
								<p className="form__paragraph">
									<b className="form__bold">Перейдите по ссылке с помощью QR-кода, ссылки или
										номера заявки</b>
								</p>
								<h2 className="form__title form__title--center" style={{color: "red"}}>
									{reshoots}
								</h2>
								
							</div>
							<div className="
								form__container
								form__container--light-gray
								form__container--padding
								form__container--indent-bottom"
                                >
								<p className="form__paragraph">Сфотографируйте QR-код</p>
									<img className="form__img" src={qrCode} alt="" width="450" height="450"
										aria-hidden="true" />
							</div>
								<div className="
									form__container
									form__container--light-gray
									form__container--padding
									form__container--indent-bottom
									">
									<p className="form__paragraph">
										или перейдите по этой ссылке<br/>
											<a className="form__link form__link--bold"
												href={link}>{link}</a>		
									</p>
								
								</div>
						</div>
					</div>
				</div>
			</div>			
        </div>
    );
};

export default CheckPhoto;