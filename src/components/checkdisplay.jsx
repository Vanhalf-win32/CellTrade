import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/11.png";
import img1 from "../img/22.png";
import axios from "axios";
import Config from "./variables";

const CheckDisplay = ({props, onNextStep}) => {
	const [display, setDisplay] = useState('');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),		
		}
	});
	
	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`, productData);

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
			PreliminaryCondition: ''
    	},
		namesNeedPhotos: [],
		steps: {
			current: {
				number: 2,
				name: "checkDisplay"
			},
		}
	});	

	useEffect(()=> {				
		if(display === 'damage') {
			setProductDataDefault({...props,
				grade: {
					CustomerCondition: '',
					FinalCondition: '',
					LimitCondition: '',
					PreliminaryCondition: 'D'
				},
				steps: {
					current: {
						number: 4,
						name: 'prelimDiscount',
					}
				}
			})
		};
		if (display === 'good') {
			setProductDataDefault({...props,
				grade: {
					CustomerCondition: '',
					FinalCondition: '',
					LimitCondition: '',
					PreliminaryCondition: 'C'
				},
				steps: {
					current: {
						number: 4,
						name: 'prelimDiscount',
					}
				}
			})
		}
	},[display]);

	useEffect(() => {
		if (productDataDefault.steps.current.number === 4) {
			setProductData({
				post: {
					"PRODUCT_DATA": JSON.stringify(productDataDefault),			
				}
			})
		}
	},[productDataDefault])
	
	useEffect(() => {
		if(productDataDefault.grade.PreliminaryCondition !== '') {
			checkProductData();
		}
		
	},[productDataDefault])

	const checkProductData = () => {
		const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData);
		data.then((value) => {
			onNextStep({...productDataDefault})
		})
	}

	return(
				<div class="flex justify-center" method="POST" >
					<div class="mt-36 mr-10">
						<div class="mt-1">
							<img src={img} alt="" width="468" height="450" />
						</div>
						<div class="w-80 ml-16">
							<label>
								<button class="border-2 w-full mt-5 p-2 rounded-2xl bg-red-500" type="button" onClick={() => {setDisplay('damage')}}>
									Экран разбит и/или имеет выгорания
								</button>
							</label>
						</div>
					</div>
					<div class="mt-36">
						<div >
							<img src={img1} alt="" width="400" height="455" />
						</div>
						<div class="w-80 ml-12">
							<label>
								<button class="border-2 w-full mt-5 p-2 rounded-2xl bg-green-500" type="button" onClick={() => {setDisplay('good')}}>
									Экран не разбит и не имеет выгораний
								</button>								
							</label>
						</div>
					</div>
				</div>
    );
};

export default CheckDisplay;
