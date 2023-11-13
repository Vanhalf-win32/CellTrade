import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";

const TotalDiscount = ({props, onExit, onNextStep}) => {
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),
            FINAL_PRICE: props.price, //TODO::
            FINAL_CONDITION : props.grade.FinalCondition,
			TRADEIN_STATUS: 'Фотографии проверены',			
		}
	});
	axios.post(
		`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData
	);
	console.log("props", props);

	const [defect, setDefect] = useState('');
	const [finalPrice, setFinalPrice] = useState(0);
	const [condition, setCondition] = useState('Отличное')
	const [getPrice, setGetPrice] = useState({
		post: {
			"Manufacturer": "",
			"Model": "",
			"Memory": "",
			"Condition": ""
		}
	});
	

		useEffect(() => {
			if(getPrice.post.Condition === 'C') {
				setCondition('Хорошее');
				const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getFinalPrice`,
				 getPrice);
				 data.then((value) => {
					setFinalPrice(value.data.data.FINAL_PRICE);
					setDefect(props.bot.bot_message);
				 })
			} else if (getPrice.post.Condition === 'D') {
				setCondition('Плохое');
				const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getFinalPrice`,
				getPrice);
				data.then((value) => {
					setFinalPrice(value.data.data.FINAL_PRICE);
					setDefect(props.bot.bot_message);
					
				})
			}
		},[getPrice]);		
		
		useEffect(() => {
				setGetPrice({
					post: {
						"Manufacturer": props.data.Manufacturer,
						"Model": props.data.Model,
						"Memory": props.data.ProdCapacity,
						"Condition": props.grade.FinalCondition,
					}
				});
		},[]);

		const clientAgree = () => {
			axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
				{
					post: {
						PRODUCT_DATA: JSON.stringify(props),
						TRADEIN_STATUS:	'Согласие с итоговой ценой',			
					}
				}
			);
			onNextStep(
				{
					current: {
						number: 9,
						name: 'pickUpDevice'
					}
				},
					finalPrice
			)
		};

		const aborted = () => {
			const data = axios.post(
			   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
				{
					post: {
						PRODUCT_DATA: JSON.stringify(props),
						TRADEIN_STATUS:	'Отказ от итоговой цены',			
					}
				}
		   );
		   data.then((value) => {
			if(value.data.status === "success") {
				Cookies.remove('PRODUCT_SESSID');
				onExit();
			}
		})
		   onExit();
	   };

    return(
        <div>
			<div className="form__step" id="total-discount">
				<div className="form__container">
					<h1 className="form__title form__title--center">
						Итоговая сумма скидки
					</h1>
					<div className="form__content">
						<div className="form__column">
							<div className="form__description form__description--center">
								<p className="form__paragraph form__paragraph--xl form__name"></p>
									<p className="form__paragraph form__paragraph--bold">
										Состояние устройства:
										<span className="form__device-state"> {condition}</span>
									</p>
									<p className="form__paragraph form__paragraph--bold">
										{defect}
										<span className="form__state-defects"></span>
									</p>
							</div>
							<table className="table">
								<caption className="table__caption">
									Сумма без учёта скидки
								</caption>
								<thead className="table__head">
									<tr className="table__row">
										<th className="table__header"></th>
										<th className="table__header">{condition}</th>
										</tr>
								</thead>
								<tbody className="table__body">
									<tr className="table__row">
										<td className="table__data" data-cell="">
											Цена CellTrade
										</td>
	    									<td className="table__data" data-cell="Отличное">
												{finalPrice}
											</td>
									</tr>
								</tbody>
							</table>
							<div className="
								form__container
								form__container--sm
								form__container--center
								">
								<button className="
									form__btn
									form__btn--center
									form__btn--fill-color-main
									form__btn--indent-top
									form__btn--indent-bottom
									form__btn--resolve
									" type="button"
									onClick={clientAgree}>
									Клиент согласен
								</button>
								<button className="
									form__btn
									form__btn--center
									form__btn--fill-transparent
									form__btn--reject
									" type="button"
									onClick={aborted}>
									Клиент отказался
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>            
    );
};

export default TotalDiscount;