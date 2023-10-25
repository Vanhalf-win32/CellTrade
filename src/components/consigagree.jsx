import React from "react";
import { Link } from "react-router-dom";

const ConsigAgree = () => {
    return(
        <div>
			<div class="form__step" id="consignment-agreements">
				<div class="form__container">
					<h1 class="form__title">
						Заполните инфомрацию для Договора Консигнации
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__container">
								<div class="form__description">
									<p class="form__paragraph">Укажите данные клиента</p>
									<p class="form__paragraph">
										Усдостоверение личности: Паспорт
									</p>
								</div>
								<fieldset class="form__fieldset">
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="PASSPORT_SERIES"
											placeholder="Серия" required />
											<span class="error"></span>
									</label>
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="PASSPORT_NUMBER"
											placeholder="Номер" required />
											<span class="error"></span>
									</label>
								</fieldset>
								<label class="form__label">
									<input class="form__input form__input--text" type="text" name="NAME" placeholder="Имя" required />
										<span class="error"></span>
								</label>
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="SURNAME" placeholder="Фамилия"
											required />
										<span class="error"></span>
								</label>
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="PATRONYMIC" placeholder="Отчество"
											required />
				    							<span class="error"></span>
									</label>
									<fieldset class="form__fieldset">
										<label class="form__label">
											<input class="form__input form__input--text" type="text" name="PLACE_OF_BIRTH"
												placeholder="Место рождения" required />
												<span class="error"></span>
										</label>
										<label class="form__label">
											<input class="form__input form__input--text" type="text" name="DATE_OF_BIRTH"
												placeholder="Дата рождения" required />
											<span class="error"></span>
										</label>
									</fieldset>
							</div>
						</div>
						<div class="form__column form__column--no-indent-top-mobile">
							<div class="form__container">
								<fieldset class="form__fieldset">
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="DEPARTAMENT_CODE"
												placeholder="Код подразделения" />
												<span class="error"></span>
									</label>
									<label class="form__label">
										<input class="form__input form__input--text" type="text" name="WHEN_ISSUED"
											placeholder="Когда выдан" />
											<span class="error"></span>
									</label>
								</fieldset>
								<label class="form__label">
									<input class="form__input form__input--text" type="text" name="ISSIED_BY"
										placeholder="Кем выдан" />
										<span class="error"></span>
								</label>
									<label class="form__label">
										<textarea class="form__textarea" name="PLACE_OF_RESIDENCE"
											placeholder="Адрес прописки"></textarea>
											<span class="error"></span>
					    			</label>
									<fieldset class="form__fieldset">
										<label class="form__label">
											<input class="form__input form__input--text" type="email" name="EMAIL" placeholder="E-mail" />
											<span class="error"></span>
										</label>
										<label class="form__label">
											<input class="form__input form__input--text" type="text" name="PHONE"
												placeholder="Контактный телефон" />
												<span class="error"></span>
										</label>
									</fieldset>
										<label class="form__label form__label--checkbox">
											<input class="
												visually-hidden
												form__input form__input--checkbox
											" type="checkbox" name="DESCRIPTION_MATCHES" />
											<span class="form__checkbox-custom"></span>
											Отказаться от рассылки
										</label>
							</div>
						</div>
					</div>
					<div class="form__content">
						<div class="form__column">
							<button class="
									form__btn
									form__btn--fill-color-main
									form__btn--indent-bottom
									form__btn--resolve
					    			" type="submit">
									Подписать договор
							</button>
						</div>
						<div class="form__column form__column--no-indent-top-mobile">
							<button class="
								form__btn form__btn--fill-transparent form__btn--reject
								" type="button">
										Отменить проверку
							</button>
				        </div>
			        </div>
		        </div>
	        </div>
            <div>
                <Link to='/contract'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/pickupdevice'>Предыдущий шаг</Link>
            </div>          
        </div>
    )
}

export default ConsigAgree;