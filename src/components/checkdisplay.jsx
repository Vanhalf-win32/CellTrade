import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/content/smashed.jpg";
import img1 from "../img/content/no-smashed.jpg";
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
        <div className="form" action="" method="POST">
            <div className="form__step" id="check-defect">
				<div className="form__container">
					<h1 className="form__title">
						Экран не разбит / нет дефектов матрицы?
					</h1>
					<div className="form__content">
						<div className="form__column">
							<div className="form__container form__container--center">
								<img className="form__img form__img--center form__img--fix-height" src={img} alt="" width="450" height="450" />
									<button className="
												form__btn
												form__btn--fill-red
												form__btn--center
												form__btn--indent-top
												form__btn--reject
												" type="button" onClick={() => {setDisplay('damage')}}>
											Экран разбит и/или имеет выгорания
									</button>
							</div>
						</div>
						<div className="form__column">
							<div className="form__container form__container--center">
								<img className="form__img form__img--center form__img--fix-height" src={img1} alt="" width="450" height="450" />
									<button className="
										form__btn
										form__btn--fill-green
										form__btn--center
										form__btn--indent-top
										form__btn--resolve
										" type="button" onClick={() => {setDisplay('good')}}>
										Экран не разбит и не имеет выгораний
									</button>
							</div>
						</div>
						</div>
				</div>
            </div>
        </div>
    );
};

export default CheckDisplay;
