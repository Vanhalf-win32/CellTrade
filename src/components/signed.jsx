import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import img from "../img/content/barcode.png";
import axios from "axios";

const Signed = ({props, onNextStep}) => {
	const [contract, setContract] = useState({
		"post": {
			"product_id": props.elemente_id,
		}
	})
	const [barCode, setBarCode] = useState('');
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),
			TRADEIN_STATUS:	'Договор подписан',
		}
	});
	const [getBarCode, setGetBarCode ] = useState(
		{
			"post": {
				"device": props.data.IMEI,
				"product_id": props.elemente_id,
			}
		  }
	)

	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
	productData);
    
	useEffect(() => {
		const data = axios.post(
			'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateBarcode',
		 	getBarCode
		);
		data.then((value) => {
			console.log("BARCODE", value);
			setBarCode(value.data.data.Barcode)
		});
	},[])

	const confirmContract = () => {
		const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=confirmContract',
			contract
		);
		data.then((value) => {
			console.log('CONFIRM_CONTRACT', value);
			if(value.data.data) {
				onNextStep()
			}
		});
	}
	return (
        <div>
            <div className="form__step" id="contract-is-signed">
				<div className="form__container form__container--md form__container--center">
					<h1 className="form__title">Договор подписан</h1>
						<div className="form__content">
							<div className="form__column form__column--full-width">
								<div className="contract">
									<div className="contract__item">
										<div className="form__content">
											<div className="form__column">
												<p className="
													form__paragraph
													form__paragraph--xl
													form__paragraph--bold
													form__paragraph--no-wrap
													">
													{props.price}
												</p>
											</div>
											<div className="form__column form__column--no-indent-top-mobile">
												<button className="
													form__btn
													form__btn--fill-color-main
													form__btn--indent-top-mobile
													form__btn--resolve
													" type="button"
													onClick={confirmContract}>
													Завершить операцию
												</button>
											</div>
										</div>
									    <p className="form__paragraph form__paragraph--indent-top-desktop">
											Финальная скидка на покупку
										</p>
									</div>
									<div className="contract__item">
										<h4 className="list-title">
											Перед тем, как сдать своё устройство в Trade-In,
											рекомендуем:
										</h4>
											<ul className="list">
												<li className="list__item">
													на устройствах Appple: октлючить функцию "Найти
													iPhone";
												</li>
												<li className="list__item">
													сделать резервную копию на устройстве;
												</li>
												<li className="list__item">
													снять все защитные пленки/стёкла c экрана.
												</li>
											</ul>
									</div>
									<img className="form__img" src={barCode} alt="" aria-hidden="true" />
								</div>
							</div>
						</div>
				</div>
			</div>        
         </div>
    );
};

export default Signed;
