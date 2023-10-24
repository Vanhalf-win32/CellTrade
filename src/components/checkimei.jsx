import React from "react";
import { Link } from "react-router-dom";

const CheckImei = () => {
    return(
        <div>
            <form class="form" action="" method="POST">
					<div class="form__step" id="check-numbers">
						<div class="form__container form__container--sm form__container--center">
							<h1 class="form__title form__title--center">Проверка IMEI</h1>
							<div class="form__content">
								<div class="form__column">
									<div class="form__description form__description--center">
										<p class="form__paragraph">Введите IMEI для проверки</p>
									</div>
									<label class="form__label form__label--radio">
										<input class="visually-hidden form__input form__input--radio" type="radio" name="RADIO_NUMBERS" />
										<span class="form__radio-custom"></span>
										Телефон
									</label>
									<label class="form__label form__label--radio">
										<input class="visually-hidden form__input form__input--radio" type="radio" name="RADIO_NUMBERS" />
										<span class="form__radio-custom"></span>
										Смарт-часы
									</label>
									<label class="form__label">
										<input class="
										form__input form__input--number form__input--numbers
									" type="number" name="IMEI" placeholder="IMEI" disabled />
										<span class="error"></span>
									</label>
									<button class="
									form__btn
									form__btn--fill-color-main
									form__btn--indent-top
									form__btn--resolve
								" type="submit" disabled>
										Проверить
									</button>
									<div class="tooltip">
										<img class="tooltip__img" src="../img/content/scanner.jpg" alt="Сканер" width="350" height="350" />
										<div class="tooltip__content">
											<p class="form__paragraph">
												IMEI устройства можно проверить запросом USSD-команды
												<a class="form__link form__link--bold" href="tel:*#06#">*#06#</a>
												в приложении "Телефон"
											</p>
											<p class="form__paragraph">
												Отсканируйте штрих-код сканером или введите IMEI
												устройства вручную
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
                <div>
                    <Link to='/checkphone'>Следующий шаг</Link>  
                </div>
                <div>
                    <Link to='/login'>Предыдущий шаг</Link>
                </div>
        </div>
    );
};


export default CheckImei;