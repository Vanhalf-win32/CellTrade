import React from "react";
import { Link } from "react-router-dom";


const CheckPhone = () => {
    return(
        <div>
				<div class="form__step" id="check-device">
					<div class="form__container form__container-sm">
						<div class="form__content">
							<div class="form__column">
								<div class="form__container form__container--center">
									<img class="form__img form__img--border" src="img/content/mobile.jpg" alt="Телефон" width="450" height="450"/>
								</div>
							</div>
								<div class="form__column">
									<div class="
											form__container
											form__container--sm
											form__container--center">
										<h1 class="form__title">Проверьте устройство</h1>
										<div class="form__description">
											<p class="form__paragraph form__name"></p>
										</div>
										<label class="form__label form__label--select">
											<select class="form__select form__select--colors"></select>
										</label>
										<label class="form__label form__label--select">
											<select class="form__select form__select--memory"></select>
										</label>
										<label class="
													form__label form__label--checkbox form__label--bold">
											<input class="visually-hidden form__input form__input--radio" type="checkbox" name="DESCRIPTION_MATCHES" />
											    <span class="form__checkbox-custom"></span>
											    Описание совпадает по модели, памяти, цвету
										</label>
										<label class="form__label form__label--checkbox form__label--bold">
											<input class="visually-hidden form__input form__input--checkbox" type="checkbox" name="MOBILE_ON" />
											<span class="form__checkbox-custom"></span>
											    Телефон включается
										</label>
										<label class="form__label form__label--checkbox form__label--bold">
											<input class="visually-hidden form__input form__input--checkbox" type="checkbox" name="IMEI_MATCHES" />
											<span class="form__checkbox-custom"></span>
											    Внешний IMEI есть и совпадает с внутренним
										</label>
										<div class="tooltip">
											<div class="check-it check-it--right">
												<div class="check-it__item" id="phone-android">
													<a class="form__link check-it__link smart-photo" href="img/content/imei_hint_1.jpg"
														data-caption="Разблокируйте устройство и откройте приложение <Телефон>"
														data-group="how-check">
														<img class="visually-hidden" src="../img/content/imei_hint_1.jpg" alt="" />
														Как это проверить?
													</a>
													<div class="visually-hidden">
														<a class="smart-photo" href="../img/content/imei_hint_2.jpg"
															data-caption="Введите USSD-команду *#06#" data-group="how-check" aria-hidden="true">
															<img src="../img/content/imei_hint_2.jpg" alt="nuul" />
														</a>
														<a class="smart-photo" href="../img/content/imei_hint_3.jpg"
															data-caption="На дисплее отобразится внутренний IMEI устройства" data-group="how-check"
															aria-hidden="true">
															<img src="../img/content/imei_hint_3.jpg" alt="" />
														</a>
														<a class="smart-photo" href="../img/content/imei_hint_4.jpg"
															data-caption="Внешний IMEI указывается на устройстве где-то внешне: либо на задней крышке корпуса, либо на лотке для SIM, либо на наклейке под батареей"
															data-group="how-check" aria-hidden="true">
															<img src="../img/content/imei_hint_4.jpg" alt="" />
														</a>
													</div>
												</div>
											</div>
											<div class="tooltip__content">
												<p class="form__paragraph">
													Внутренний IMEI проверяется по запросу
													<a class="form__link form__link--bold" href="tel:*#06#">*#06#</a>
													Внешний IMEI находится либо на задней поверхности
													корпуса, либо на отке SIM-карты.
												</p>
											</div>
										</div>
										<button class="
													visually-hidden
													form__btn
													form__btn--fill-color-main
													form__btn--indent-bottom
													form__btn--resolve
												" type="button">
											Принять
										</button>
										<button class="
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
                    <div>
                        <Link to='/checkdisplay'>Следующий шаг</Link>  
                    </div>
                    <div>
                        <Link to='/checkimei'>Предыдущий шаг</Link>
                    </div>
    </div>
    );
};



export default CheckPhone;
