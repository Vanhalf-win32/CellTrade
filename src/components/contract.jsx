import axios from "axios";
import React, { useEffect, useState } from "react";

const Contract = ({ props, onNextStep }) => {

	const [button, setButton] = useState('disabled');
	const [getSms, setGetSms] = useState('');
	const [min, setMin] = useState(60);
	const [checkSms, setCheckSms] = useState({
		"post": {
			"product_id": 26957,
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
				product_id: "26967", //TODO::
			}
		}
	)

	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
		productData);

	// let min = 60;
	// const interval = setInterval(() => {
	// 		min--;
	// 		console.log("MIN",min);

	// 		if(min === 0) {
	// 			clearInterval(interval);
	// 		} return min;
	// 	},1000);


	useEffect(() => {
		const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=sendSmsCode',
			productID);
		data.then((value) => {
			console.log('RESPOPNSE_SMS', value);
			setGetSms(value.data.data.MESSAGE);
			if (value.data.data.STATUS) {
				setButton('');
			}
		})
	}, [productData]);

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
				onNextStep({
					current: {   //TODO::
						number: 12,
						name: 'signed'
					}
				})
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
													onChange={(event) => { setCheckSms({ post: { product_id: 26957, code: event.target.value, } }) }} />
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
									<p className="form__paragraph form__paragraph--indent-top-desktop">
										Повторная отправка СМС возможна через {min}...
									</p>
									<button className="
														form__btn
														form__btn--fill-color-main
														form__btn--sm
														form__btn--resolve
												" type="button">
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