import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "./variables";
import Examples1 from "./utils/examples1";
import Examples2 from "./utils/examples2";
import Examples3 from "./utils/examples3";
import Examples4 from "./utils/examples4";

const CheckDefect = ({props, onExit, onNextStep}) => {
	const [examples ,setExamples] = useState('');
	const [condition, setCondition] = useState('');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
			"CUSTOMER_CONDITION" : '',		
		}
	});
	

	useEffect(() => {
		setProductData({
			post: {
				"PRODUCT_DATA": JSON.stringify(props),
				"CUSTOMER_CONDITION" : condition,		
			}
		});
	},[condition]);

	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`, productData);

	const clientAgree = () => {
		if(condition === '') {
			axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,{
				post: {
					"CUSTOMER_CONDITION" : "B",		
				}
			});
		}
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'Согласие с проверкой дефектов',	
				}
			}
		);
		onNextStep(
			{
				current: { 
						number: 6,
						name: 'checkPhotos',
				}
				
			}, 
			{																
				CustomerCondition: props.grade.CustomerCondition,
				FinalCondition: '',
				LimitCondition: condition,
			},
		)
	};
	
	const aborted = () => {
		axios.post(
		   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'Отказ при проверке дефектов',			
				}
			}
	   );
	   onExit();
   };

    return(
        <div>
			<div className="" id="check-defect-device">
				<div className="form__container form__container--center">
					<h1 className="form__title form__title--center">
						Проверьте дефекты устройства
					</h1>
					<div className="form__content">
						<div className="form__column">
							<div className="form__description form__alert">
								<p className="form__paragraph">
									<b className="form__bold">Обратите внимание</b>, что перед
										проверкой экрана с него необходимо
										<b className="form__bold">снять все защитные элементы</b>:
										плёнки, защитные стекла и т.п.
								</p>
							</div>
							<div className="defects-list">
								<div className="defects-list__item">
									<label className="form__label form__label--bold form__label--checkbox">
										<input className="
											visually-hidden 
											form__input 
											form__input--checkbox" 
											type="checkbox" 
											name="SCREEN_IS_BROKEN"
											onClick={() => {condition === '' ? setCondition('D') : setCondition('') }} />
											<span className="form__checkbox-custom"></span>
											Экран разбит или есть отслоения
									</label>
									<button className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
									onClick={() => {setExamples("displayDamage")}}>
										Примеры
									</button>
								</div>
								<div className="defects-list__item">
									<label className="form__label form__label--bold form__label--checkbox">
										<input className="
											visually-hidden
											form__input 
											form__input--checkbox
											" type="checkbox" 
											name="SCREEN_WITH_IMAGE"
											onClick={() => {condition === '' ? setCondition('C') : setCondition('') }} />
											<span className="form__checkbox-custom"></span>
												Экран с различными повреждениями (потёртости,
												царапины)
									</label>
										<button className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
											onClick={() => {setExamples("displaySmallDefects")}} >
											Примеры
										</button>
								</div>
								<div className="defects-list__item">
									<label className="form__label form__label--bold form__label--checkbox">
										<input 
										className="
										visually-hidden 
										form__input 
										form__input--checkbox" 
										type="checkbox" 
										name="DETECTIVE_PIXELS"
										onClick={() => {condition === '' ? setCondition('D') : setCondition('') }} />
											<span className="form__checkbox-custom"></span>
											Есть выгорания, битые пиксели, полосы, пятна
									</label>
										<button className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
											onClick={() => {setExamples("displayBadPixels")}}>
											Примеры
										</button>
							
								</div>
									<div className="defects-list__item">
										<label className="form__label form__label--bold form__label--checkbox">
											<input className="
												visually-hidden
												form__input form__input--checkbox
												" type="checkbox" 
												name="CASE_IS_DAMAGED"
												onClick={() => {condition === '' ? setCondition('C') : setCondition('') }} />
												<span className="form__checkbox-custom"></span>
												Корпус имеет видемые повреждения
										</label>
										<button className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
											onClick={() => {setExamples("bodyVisibleDamage")}}>
											Примеры
										</button>
										</div>
									</div>
									{examples === 'displayDamage' ? <Examples1/> : null}
									{examples === 'displaySmallDefects' ? <Examples2/> : null}
									{examples === 'displayBadPixels' ? <Examples3/> : null}
									{examples === 'bodyVisibleDamage' ? <Examples4/> : null}
									<div className="
												form__container
												form__container--sm
												form__container--center
											">
										<button className="
													form__btn
													form__btn--fill-color-main
													form__btn--center
													form__btn--indent-top
													form__btn--indent-bottom
													form__btn--resolve
												" type="button"
												onClick={clientAgree}
										>
											Далее
										</button>
										<button className="
													form__btn
													form__btn--center
													form__btn--fill-transparent
													form__btn--reject
												" type="button"
												onClick={aborted}>
											Отклонить
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
        </div>
    );
};

export default CheckDefect;