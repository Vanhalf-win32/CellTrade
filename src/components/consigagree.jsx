import axios from "axios";
import React, { useEffect, useState } from "react";

const ConsigAgree = ({props, onNextStep}) => {
	const [fio, setFio] = useState({
		name: '',
		family: '',
		otche: '',
		date: 0,
		phone: 0,
		place: '',
		email: '',
	});
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),			
		}
	});

	axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
	 productData);


	 const getFIO = () => {
		setProductData({
			post: {
				PRODUCT_DATA: JSON.stringify(props),
				CLIENT_FIO: JSON.stringify(fio),
			}	
			})
		const data = axios.post(
				'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
			 	productData
			 );
			 data.then((value) => {
				console.log('CONS', value);
				console.log('FIO', fio)
				onNextStep({
					current: {
						number: 11,
						name: 'contract'
					}
				}, fio)
			 })
	}

    return(
        <div>
			<div className="form__step container" id="consignment-agreements">
				<div className="form__container">
					<h1 className="form__title">
						Заполните инфомрацию для Договора Консигнации
					</h1>
					<div className="form__content">
						<div className="form__column">
							<div className="form__container">
								<div className="form__description">
									<p className="form__paragraph">Укажите данные клиента</p>
									<p className="form__paragraph">
										Усдостоверение личности: Паспорт
									</p>
								</div>
								<label className="form__label">
									<input className="form__input form__input--text" type="text" name="NAME" placeholder="Имя" 
									required onChange={event => setFio({...fio, name: event.target.value})}/>
										<span className="error"></span>
								</label>
									<label className="form__label">
										<input className="form__input form__input--text" type="text" name="SURNAME" placeholder="Фамилия"
											required onChange={event => setFio({...fio, family: event.target.value})}/>
										<span className="error"></span>
								</label>
									<label className="form__label">
										<input className="form__input form__input--text" type="text" name="PATRONYMIC" placeholder="Отчество"
											required onChange={event => setFio({...fio, otche: event.target.value})}/>
				    							<span className="error"></span>
									</label>
									<fieldset className="form__fieldset">
										<label className="form__label">
											<input className="form__input form__input--text" type="text" name="DATE_OF_BIRTH"
												placeholder="Дата рождения" required onChange={event => setFio({...fio, date: event.target.value})}/>
											<span className="error"></span>
										</label>
										<label className="form__label">
											<input className="form__input form__input--text" type="text" name="PHONE"
												placeholder="Контактный телефон" onChange={event => setFio({...fio, phone: event.target.value})}/>
												<span className="error"></span>
										</label>
										<label className="form__label">
											<input className="form__input form__input--text" type="text" name="PHONE"
												placeholder="Место рождения" onChange={event => setFio({...fio, place: event.target.value})}/>
												<span className="error"></span>
										</label>
										<label className="form__label">
											<input className="form__input form__input--text" type="text" name="PHONE"
												placeholder="Email" onChange={event => setFio({...fio, email: event.target.value})}/>
												<span className="error"></span>
										</label>
									</fieldset>
							</div>
						</div>
					</div>
					<div className="form__content">
						<div className="form__column">
							<button className="
									form__btn
									form__btn--fill-color-main
									form__btn--indent-bottom
									form__btn--resolve
					    			" type="submit"
									onClick={getFIO}>
									Подписать договор
							</button>
						</div>
						<div className="form__column form__column--no-indent-top-mobile">
							<button className="
								form__btn form__btn--fill-transparent form__btn--reject
								" type="button">
										Отменить проверку
							</button>
				        </div>
			        </div>
		        </div>
	        </div>        
        </div>
    )
}

export default ConsigAgree;