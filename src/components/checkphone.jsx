import React, { useEffect, useState } from "react";
import img from "../img/content/mobile.jpg";
import img1 from "../img/content/imei_hint_1.jpg";
import img2 from "../img/content/imei_hint_2.jpg";
import img3 from "../img/content/imei_hint_3.jpg";
import img4 from "../img/content/imei_hint_4.jpg";



const CheckPhone = () => {

	const [productDataDefault, setProductDataDefault] = useState({
		data: {
			Color: '',
			Description: '',
			IMEI: 0,
			Model: '',
			ProdCapacity:'',
		},
		status: "",
		grade: "",
		namesNeedPhotos: [],
		steps: {
			current: {
				number: 0,
				name: ""
			},
		}
	});

	const [checkSpec, setCheckSpec] = useState(0);
	const [button, setButton] = useState('disabled');

	const enable = () => {
		setCheckSpec(checkSpec + 1);
	}

	useEffect(() => {
		if(checkSpec === 3) {
			setButton('');
		};		
	},[checkSpec])

	const data = document.querySelectorAll('.check-it__item');
	for(let i = 0; i < data.length; i++) {
		data[i].style.display = 'flex';
	} 


	
    return(
        <div>
				<div className="form__step" id="check-device">
					<div className="form__container form__container-sm">
						<div className="form__content">
							<div className="form__column">
								<div className="form__container form__container--center">
									<img className="form__img form__img--border" src={img} alt="Телефон" width="450" height="450"/>
								</div>
							</div>
								<div className="tooltip form__column">
									<div className="
											form__container
											form__container--sm
											form__container--center">
										<h1 className="form__title">Проверьте устройство</h1>
										<div className="form__description">
											<p className="form__paragraph form__name"></p>
										</div>
										<label className="form__label form__label--select">
											<select className="form__select form__select--colors"></select>
										</label>
										<label className="form__label form__label--select">
											<select className="form__select form__select--memory"></select>
										</label>
										
											<input type="checkbox" name="DESCRIPTION_MATCHES" onClick={enable}/>
											    
											    Описание совпадает по модели, памяти, цвету <br/>
									
										
											<input className="form__input form__input--checkbox" type="checkbox" name="MOBILE_ON" onClick={enable}/>
										
											    Телефон включается <br/>
										
										
											<input className="form__input form__input--checkbox" type="checkbox" name="IMEI_MATCHES" onClick={enable}/>
											
											    Внешний IMEI есть и совпадает с внутренним <br/>
												<button>Как это проверить?</button>
									
										<div className="tooltip">
											<div className="check-it check-it--right">
												<div className="check-it__item" id="phone-android">
													<a className="form__link check-it__link smart-photo" href="../img/content/imei_hint_1.jpg"
														data-caption="Разблокируйте устройство и откройте приложение <Телефон>"
														data-group="how-check" >
														<img src={img1} alt="img1"/>
														
													</a>
													<div>
														<a className="smart-photo" href="../img/content/imei_hint_2.jpg"
															data-caption="Введите USSD-команду *#06#" data-group="how-check" aria-hidden="true">
															<img src={img2} alt="nuul" />
														</a>
														<a className="smart-photo" href="../img/content/imei_hint_3.jpg"
															data-caption="На дисплее отобразится внутренний IMEI устройства" data-group="how-check"
															aria-hidden="true">
															<img src={img3} alt="" />
														</a>
														<a className="smart-photo" href="../img/content/imei_hint_4.jpg"
															data-caption="Внешний IMEI указывается на устройстве где-то внешне: либо на задней крышке корпуса, либо на лотке для SIM, либо на наклейке под батареей"
															data-group="how-check" aria-hidden="true">
															<img src={img4} alt="" />
														</a>
													</div>
												</div>
											</div>
											<div className="tooltip__content">
												<p className="form__paragraph">
													Внутренний IMEI проверяется по запросу
													<a className="form__link form__link--bold" href="tel:*#06#">*#06#</a>
													Внешний IMEI находится либо на задней поверхности
													корпуса, либо на отке SIM-карты.
												</p>
											</div>
										</div>
										<button className="
													form__btn
													form__btn--fill-color-main
													form__btn--indent-bottom
													form__btn--resolve
												" type="button"
												disabled={button}>
											Принять
										</button>
										<button className="
													form__btn
													form__btn--fill-transparent
													form__btn--reject
												" type="button">
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



export default CheckPhone;
