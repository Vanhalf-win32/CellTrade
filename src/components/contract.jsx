import axios from "axios";
import React, { useEffect, useState } from "react";
import Interval from "./utils/interval";

const Contract = ({ props, onNextStep }) => {	
	
	const [seconds, setSeconds] = useState(60);
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
			"product_id": props.elemente_id,
		}
	})
	const [button, setButton] = useState('disabled');
	const [getSms, setGetSms] = useState('');

	const [checkSms, setCheckSms] = useState({
		"post": {
			"product_id": props.elemente_id,
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
				product_id: props.elemente_id,
			}
		}
	)


  
    useEffect(() => {
      if (seconds > 0) {
        setTimeout(setSeconds, 1000, seconds - 1);
      } 
    }, [reContract]);

	
	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
		productData);

	useEffect(() => {
		const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateContract',
			contract);
		data.then((value) => {
			console.log('RESPOPNSE_SMS', value);
			setGetSms(value.data.data.MESSAGE);
			 if (value.data.data.STATUS) {
				setButton('');
			}
		})
	}, [reContract]);

	const getCheckSms = () => {
		const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=checkSmsCode',
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
		<div>
			<div className="form__step" id="contract">
				<div className="form__container form__container--md form__container--center">
					<h1 className="form__title">Договор</h1>
					<div className="form__content">
						<div className="form__column form__column--full-width">
							<div className="contract">
								<div className="contract__item">
									<h3 className="form__subtitle">Устройства</h3>
									{props.data.Description}
									<p className="form__paragraph form__name"></p>
									<div className="contract__horizontal-items">
										<p className="form__paragraph">Общая цена</p>
										<p className="
														form__paragraph
														form__paragraph--bold
														form__paragraph--xl
														form__paragraph--right
														">
											{props.price}
										</p>
									</div>
								</div>
								<div className="contract__item">
									<h3 className="form__subtitle">Персональные данные</h3>
									<p className="form__paragraph form__paragraph--bold">
										{props.fio.name} {props.fio.family} {props.fio.otche}
									</p>
									<p className="form__paragraph">
										{props.fio.date}, {props.fio.place}, {props.fio.phone}, {props.fio.email}
									</p>
									<div className="form__content">
										<div className="form__column">
											<label className="form__label">
												<input className="
															form__input form__input form__input--number
															" type="number" name="CODE" placeholder="Код из СМС"
													onChange={(event) => { setCheckSms({ post: { product_id: props.elemente_id, code: event.target.value, } }) }} />
											</label>
										</div>
										<div className="
												form__column form__column--no-indent-top-mobile
												">
											<button className="
														form__btn
														form__btn--fill-color-main
														form__btn--sm
														form__btn--resolve
												" type="button" disabled={button}
												onClick={getCheckSms}>
												Подтвердить
											</button>
										</div>
									</div>
									{getSms}
									<Interval/>
									<button className="
														form__btn
														form__btn--fill-color-main
														form__btn--sm
														form__btn--resolve
												" type="button"
												onClick={() => {setReContract(Date.now())}}>
										Отправить СМС повторно
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contract;