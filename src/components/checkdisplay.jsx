import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import displayDamage_1 from "../img/displayDamage_1.png";
import displayDamage_2 from "../img/displayDemage_2.png";
import wellDisplay from "../img/wellDisplay.png";
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
			<div class="flex justify-center">
				<div class="flex justify-center w-full h-full p-4 lg:p-0 lg:w-[1920px] lg:h-[1146px]">
					<div class="flex flex-col mt-14 lg:flex-row lg:justify-between lg:w-[1000px] lg:h-[535px] lg:mt-[133px]">
							<div class="w-full h-full lg:w-[410px] ">
								<div class="flex justify-around w-full h-[300px]  lg:justify-between lg:h-[387px]">
									<img src={displayDamage_1} alt="damage"/>
									<img src={displayDamage_2} alt="damage"/>
								</div>
								<div class="w-full h-[68px] mt-8">
									<button 
										class="w-full h-[58px] p-2 rounded-xl text-white text-[18px] lg:text-[20px] bg-red-500"
										type="button" 
										onClick={() => {setDisplay('damage')}}
									>
										Экран разбит и/или имеет выгорания
									</button>
								</div>																
							</div>
							<div class="w-full h-full mt-8 lg:mt-0 lg:w-[410px] ">
									<div class="flex w-full lg:h-[400px] mt-[-12px]">
										<img src={wellDisplay} alt="wellDisplay"/>
									</div>
									<div class="w-full h-[68px] mt-8">
										<button 
											class="w-full h-[58px] p-2  rounded-xl text-white text-[18px] lg:text-[20px] bg-green-500 "
											type="button" 
											onClick={() => {setDisplay('good')}}
										>
											Экран не разбит и не имеет выгораний
										</button>							
									</div>										
							</div>						
					</div>
				</div>					
			</div>
    );
};

export default CheckDisplay;
