import React from "react";
import { Link } from "react-router-dom";

const Contract = () => {
    return(
        <div>
            <div class="form__step" id="contract">
				<div class="form__container form__container--md form__container--center">
					<h1 class="form__title">Договор</h1>
						<div class="form__content">
							<div class="form__column form__column--full-width">
								<div class="contract">
									<div class="contract__item">
										<h3 class="form__subtitle">Устройства</h3>
											<p class="form__paragraph form__name"></p>
											<div class="contract__horizontal-items">
												<p class="form__paragraph">Общая цена</p>
												<p class="
														form__paragraph
														form__paragraph--bold
														form__paragraph--xl
														form__paragraph--right
														">
													50 813 &#8381;
												</p>
											</div>
									</div>
										<div class="contract__item">
											<h3 class="form__subtitle">Персональные данные</h3>
											<p class="form__paragraph form__paragraph--bold">
												Петров Петр Петрович
											</p>
											<p class="form__paragraph">
												01.01.2000, Москва, +7 (964) 580-58-19,
												south96@yandex.ru
											</p>
											<p class="form__paragraph form__paragraph--bold">
												Паспорт
											</p>
											<p class="form__paragraph">
												4545 346346 ОУФМС России по гор. Москве по району
												Беговой, 01.01.2013, 245-899, Москва, ул. Строителей,
												дом 2, кв. 14
											</p>
											<div class="form__content">
												<div class="form__column">
													<label class="form__label">
														<input class="
																form__input form__input form__input--number
																" type="number" name="CODE" placeholder="Код из СМС" />
													</label>
												</div>
												<div class="
															form__column form__column--no-indent-top-mobile
														">
													<button class="
																form__btn
																form__btn--fill-color-main
																form__btn--sm
																form__btn--resolve
															" type="button" disabled>
														Подтвердить
													</button>
												</div>
											</div>
											<p class="form__paragraph form__paragraph--indent-top-desktop">
												Повторная отправка СМС возможна через 2 минуты
											</p>
										</div>
								</div>
							</div>
						</div>
				</div>
			</div>
            <div>
                <Link to='/signed'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/consigagree'>Предыдущий шаг</Link>
            </div> 
        </div>
    );
};

export default Contract;