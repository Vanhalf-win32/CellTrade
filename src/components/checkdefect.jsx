import React from "react";
import { Link } from "react-router-dom";

const CheckDefect = () => {
    return(
        <div>
			<div class="" id="check-defect-device">
				<div class="form__container form__container--center">
					<h1 class="form__title form__title--center">
						Проверьте дефекты устройства
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__description form__alert">
								<p class="form__paragraph">
									<b class="form__bold">Обратите внимание</b>, что перед
										проверкой экрана с него необходимо
										<b class="form__bold">снять все защитные элементы</b>:
										плёнки, защитные стекла и т.п.
								</p>
							</div>
							<div class="defects-list">
								<div class="defects-list__item">
									<label class="form__label form__label--bold form__label--checkbox">
										<input class="visually-hidden form__input form__input--checkbox" type="checkbox" name="SCREEN_IS_BROKEN" />
											<span class="form__checkbox-custom"></span>
											Экран разбит или есть отслоения
									</label>
									<a class="defects-list__link defects-list__link--no-indent-top-mobile smart-photo"
                                        href="img/content/samsung_cracked_screen2.jpg" data-caption="Экран разбит или есть отслоения"
										data-group="examples-1" aria-hidden="true">
										<img class="visually-hidden" src="img/content/samsung_cracked_screen2.jpg" alt="" />
										Примеры
									</a>
									<div class="visually-hidden">
										<a class="smart-photo" href="img/content/samsung_otsloenie1.jpg"
											data-caption="Экран разбит или есть отслоения" data-group="examples-1" aria-hidden="true">
											<img src="img/content/samsung_otsloenie1.jpg" alt="" />
										</a>
									</div>
								</div>
								<div class="defects-list__item">
									<label class="form__label form__label--bold form__label--checkbox">
										<input class="
											visually-hidden
											form__input form__input--checkbox
											" type="checkbox" name="SCREEN_WITH_IMAGE" />
											<span class="form__checkbox-custom"></span>
												Экран с различными повреждениями (потёртости,
												царапины)
									</label>
										<a class="
											defects-list__link
											defects-list__link--no-indent-top-mobile
											smart-photo
											" href="img/content/samsung_small_scratches1.jpg"
											data-caption="Экран с различными повреждениями (потертости, царапины)" data-group="examples-2"
											aria-hidden="true">
											<img class="visually-hidden" src="img/content/samsung_small_scratches1.jpg" alt="" />
											Примеры
										</a>
									    <div class="visually-hidden">
											<a class="smart-photo" href="img/content/samsung_big_scratches1.jpg"
												data-caption="Экран с различными повреждениями (потертости, царапины)" data-group="examples-2"
												aria-hidden="true">
												<img src="img/content/samsung_big_scratches1.jpg" alt="" />
											</a>
										</div>
								</div>
								<div class="defects-list__item">
									<label class="form__label form__label--bold form__label--checkbox">
										<input class="visually-hidden form__input form__input--checkbox" type="checkbox" name="DETECTIVE_PIXELS" />
											<span class="form__checkbox-custom"></span>
											Есть выгорания, битые пиксели, полосы, пятна
									</label>
										<a class="defects-list__link defects-list__link--no-indent-top-mobile smart-photo" 
                                            href="img/content/burnout_samsung.jpg" data-caption="Есть выгорания, битые пиксели, полосы, пятна"
											data-group="examples-3" aria-hidden="true">
											<img class="visually-hidden" src="img/content/burnout_samsung.jpg" alt="" />
											Примеры
										</a>
										<div class="visually-hidden">
											<a class="smart-photo" href="img/content/remaining_picture.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/remaining_picture.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/bad_pixels_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/bad_pixels_samsung.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/samsung_lines2.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_lines2.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/lines_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/lines_samsung.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/flaws_samsung.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/flaws_samsung.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/samsung_flaws3.jpg"
										    	data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_flaws3.jpg" alt="" />
											</a>
											<a class="smart-photo" href="img/content/samsung_flaws2.jpg"
												data-caption="Есть выгорания, битые пиксели, полосы, пятна" data-group="examples-3"
												aria-hidden="true">
												<img src="img/content/samsung_flaws2.jpg" alt="" />
											</a>
										</div>
									</div>
									<div class="defects-list__item">
										<label class="form__label form__label--bold form__label--checkbox">
											<input class="
												visually-hidden
												form__input form__input--checkbox
												" type="checkbox" name="CASE_IS_DAMAGED" />
												<span class="form__checkbox-custom"></span>
												Корпус имеет видемые повреждения
										</label>
										<a class="
											defects-list__link
											defects-list__link--no-indent-top-mobile
											smart-photo
											" href="img/content/body_cracks_big_samsung.jpg" data-caption="Корпус имеет видимые повреждения"
											data-group="examples-4" aria-hidden="true">
											<img class="visually-hidden" src="img/content/body_cracks_big_samsung.jpg" alt="" />
											Примеры
										</a>
											<div class="visually-hidden">
												<a class="smart-photo" href="img/content/body_cracks_small_samsung.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_cracks_small_samsung.jpg" alt="" />
												</a>
												<a class="smart-photo" href="img/content/body_attrictions_samsung.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_attrictions_samsung.jpg" alt="" />
												</a>
												<a class="smart-photo" href="img/content/body_small_scratches3.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/body_small_scratches3.jpg" alt="" />
												</a>
												<a class="smart-photo" href="img/content/samsung_glass1.jpg"
													data-caption="Корпус имеет видимые повреждения" data-group="examples-4" aria-hidden="true">
													<img src="img/content/samsung_glass1.jpg" alt="" />
												</a>
											</div>
										</div>
									</div>
									<div class="
												form__container
												form__container--sm
												form__container--center
											">
										<button class="
													form__btn
													form__btn--fill-color-main
													form__btn--center
													form__btn--indent-top
													form__btn--indent-bottom
													form__btn--resolve
												" type="button">
											Далее
										</button>
										<button class="
													form__btn
													form__btn--center
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
                        <Link to='/checkphoto'>Следующий шаг</Link>  
                    </div>
                    <div>
                        <Link to='/checkdisplay'>Предыдущий шаг</Link>
                    </div>
        </div>
    );
};

export default CheckDefect;