import React, { useEffect, useState } from "react";
import img1 from '../img/content/samsung_cracked_screen2.jpg';
import img2 from '../img/content/samsung_small_scratches1.jpg';
import img3 from '../img/content/burnout_samsung.jpg';
import img4 from '../img/content/samsung_big_scratches1.jpg';
import axios from "axios";

const CheckDefect = ({props, onExit, onNextStep}) => {
	const [condition, setCondition] = useState('B');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
			"LIMIT_CONDITION" : '',		
		}
	});

	useEffect(() => {
		setProductData({
			post: {
				"PRODUCT_DATA": JSON.stringify(props),
				"LIMIT_CONDITION" : condition,		
			}
		});
	},[condition]);

	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData', productData);

	const clientAgree = () => {
		axios.post(
			'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
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
		   'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
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
											onClick={() => {setCondition('D')}} />
											<span className="form__checkbox-custom"></span>
											Экран разбит или есть отслоения
									</label>
									<a className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
                                        href="img/content/samsung_cracked_screen2.jpg" data-caption="Экран разбит или есть отслоения"
										data-group="examples-1" aria-hidden="true">
										<img className="visually-hidden" src={img1} alt="" />
										Примеры
									</a>
									<div className="visually-hidden">
										<a className="smart-photo" href="img/content/samsung_otsloenie1.jpg"
											data-caption="Экран разбит или есть отслоения" data-group="examples-1" aria-hidden="true">
											<img src="img/content/samsung_otsloenie1.jpg" alt="" />
										</a>
									</div>
								</div>
								<div className="defects-list__item">
									<label className="form__label form__label--bold form__label--checkbox">
										<input className="
											visually-hidden
											form__input 
											form__input--checkbox
											" type="checkbox" 
											name="SCREEN_WITH_IMAGE"
											onClick={() => {setCondition('C')}} />
											<span className="form__checkbox-custom"></span>
												Экран с различными повреждениями (потёртости,
												царапины)
									</label>
										<a className="
											defects-list__link
											defects-list__link--no-indent-top-mobile
											smart-photo
											" href="img/content/samsung_small_scratches1.jpg"
											data-caption="Экран с различными повреждениями (потертости, царапины)" data-group="examples-2"
											aria-hidden="true">
											<img className="visually-hidden" src={img2} alt="" />
											Примеры
										</a>
									    <div className="visually-hidden">
											<a className="smart-photo" href="img/content/samsung_big_scratches1.jpg"
												data-caption="Экран с различными повреждениями (потертости, царапины)" data-group="examples-2"
												aria-hidden="true">
												<img src={img4} alt="" />
											</a>
										</div>
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
										onClick={() => {setCondition('D')}} />
											<span className="form__checkbox-custom"></span>
											Есть выгорания, битые пиксели, полосы, пятна
									</label>
										<a className="defects-list__link defects-list__link--no-indent-top-mobile smart-photo" 
                                            href="img/content/burnout_samsung.jpg" data-caption="Есть выгорания, битые пиксели, полосы, пятна"
											data-group="examples-3" aria-hidden="true">
											<img className="visually-hidden" src={img3} alt="" />
											Примеры
										</a>
										<div className="visually-hidden">
											<a className="smart-photo" href="img/content/remaining_picture.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/remaining_picture.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/bad_pixels_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/bad_pixels_samsung.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/samsung_lines2.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_lines2.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/lines_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/lines_samsung.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/flaws_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/flaws_samsung.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/samsung_flaws3.jpg"
										    	data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_flaws3.jpg" alt="" />
											</a>
											<a className="smart-photo" href="img/content/samsung_flaws2.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_flaws2.jpg" alt="" />
											</a>
										</div>
									</div>
									<div className="defects-list__item">
										<label className="form__label form__label--bold form__label--checkbox">
											<input className="
												visually-hidden
												form__input form__input--checkbox
												" type="checkbox" 
												name="CASE_IS_DAMAGED"
												onClick={() => {setCondition('C')}} />
												<span className="form__checkbox-custom"></span>
												Корпус имеет видемые повреждения
										</label>
										<a className="
											defects-list__link
											defects-list__link--no-indent-top-mobile
											smart-photo
											" href="img/content/body_cracks_big_samsung.jpg" data-caption="Корпус имеет видимые повреждения"
											data-group="examples-4" aria-hidden="true">
											<img className="visually-hidden" src="img/content/body_cracks_big_samsung.jpg" alt="" />
											Примеры
										</a>
											<div className="visually-hidden">
												<a className="smart-photo" href="img/content/body_cracks_small_samsung.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_cracks_small_samsung.jpg" alt="" />
												</a>
												<a className="smart-photo" href="img/content/body_attrictions_samsung.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_attrictions_samsung.jpg" alt="" />
												</a>
												<a className="smart-photo" href="img/content/body_small_scratches3.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_small_scratches3.jpg" alt="" />
												</a>
												<a className="smart-photo" href="img/content/samsung_glass1.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/samsung_glass1.jpg" alt="" />
												</a>
											</div>
										</div>
									</div>
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