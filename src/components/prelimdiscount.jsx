import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";
import DiscountsDevices from "./utils/discountsDevices";

const PrelimDiscount = ({props, onExit, onNextStep}) => {
	const [deviceConditionB, setDeviceConditionB] = useState('');
	const [deviceConditionC, setDeviceConditionC] = useState('');
	const [onPrelimsDiscounts, setOnPrelimsDiscounts] = useState(0);
	const [discountsDevices, setDiscountsDevices] = useState({});
	const [gradePriceB, setGradePriceB] = useState(0);
	const [gradePriceC, setGradePriceC] = useState(0);
	const [gradePriceD, setGradePriceD] = useState(0);
	const [condition, setCondition] = useState('');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(),			
		}
	});

	const [getPrice, setGetPrice] = useState({
		post: {
			Manufacturer: "",
			Model: "",
			Memory: "",
			Condition: ""
		}
	})

	useEffect(()=> {
		if(props.grade.PreliminaryCondition === 'D') {
			setDeviceConditionB('Плохое');
			setCondition('Экран разбит и/или имеет выгорания');
			setGetPrice({
				post: {
					Manufacturer: props.data.Manufacturer,
					Model: props.data.Model,
					Memory: props.data.ProdCapacity,
					Condition: props.grade.PreliminaryCondition,
				}
			})
		} else if (props.grade.PreliminaryCondition === 'C') {
			setDeviceConditionB('Отличное')
			setDeviceConditionC('Хорошее');
			setCondition('Экран не разбит и не имеет выгораний');
			setGetPrice({
				post: {
					Manufacturer: props.data.Manufacturer,
					Model: props.data.Model,
					Memory: props.data.ProdCapacity,
					Condition: props.grade.PreliminaryCondition,
				}
			})
		}
	},[]);

	useEffect(() => {
		if (getPrice.post.Condition !== "") {
			const data = axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getPreliminaryPrice`,
				getPrice
			);
			data.then((value) => {
				setGradePriceB(value.data.data.GRADE_PRICE_B);
				setGradePriceC(value.data.data.GRADE_PRICE_C);
				setGradePriceD(value.data.data.GRADE_PRICE_D);
				setDiscountsDevices(value);
				setOnPrelimsDiscounts(1);
			});
		}
	},[getPrice]);
	useEffect(() => {
		setProductData({
			"PRODUCT_DATA": JSON.stringify(props),
		})
	},[getPrice]);

	const clientAgree = () => {
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'acceptedpreprice',			
				}
			}
		);
		onNextStep(
			{
				current: {
					number: 5,
					name: 'checkDefect',
				}
			}
		)
	};

	const aborted = () => {
		const data = axios.post(
		   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'rejectedpreprice',			
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
				<div class="flex bg-slate-500">
					<h1>
						Предварительная сумма скидки
					</h1>
					<h2>
						{props.data.Description}
					</h2>
					<div>
						<div>
							<div>
								<p>
									<span><b>Состояние устройства:</b></span>
								</p>
									<h2>{condition}</h2>
							</div>
								<table>
									<caption>
										Сумма без дополнительной скидки
									</caption>
									<thead>
										<tr>
											<th></th>
											<th>{deviceConditionC}</th>
											<th>{deviceConditionB}</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												Цена SmartPrice
											</td>
											<td>
												{gradePriceC}
											</td>
											<td>
												{gradePriceB}{gradePriceD}
											</td>
										</tr>
									</tbody>
								</table>
								{onPrelimsDiscounts === 1 ? <DiscountsDevices discountsDevices={discountsDevices}/>	: null}						
								<div className="form__container	form__container--sm	form__container--center">
									<button type="button"
										onClick={clientAgree}>
										Клиент согласен
									</button>
									<button type="button"
										onClick={aborted}>
										Клиент отказался
									</button>
								</div>
						</div>
					</div>
				</div>
    );
};

export default PrelimDiscount;
