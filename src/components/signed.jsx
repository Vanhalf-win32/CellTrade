import React from "react";
import { Link } from "react-router-dom";
import img from "../img/content/barcode.png";

const Signed = () => {
    return(
        <div>
            <div class="form__step" id="contract-is-signed">
				<div class="form__container form__container--md form__container--center">
					<h1 class="form__title">Договор подписан</h1>
						<div class="form__content">
							<div class="form__column form__column--full-width">
								<div class="contract">
									<div class="contract__item">
										<div class="form__content">
											<div class="form__column">
												<p class="
													form__paragraph
													form__paragraph--xl
													form__paragraph--bold
													form__paragraph--no-wrap
													">
													50 813 &#8381;
												</p>
											</div>
											<div class="form__column form__column--no-indent-top-mobile">
												<button class="
													form__btn
													form__btn--fill-color-main
													form__btn--indent-top-mobile
													form__btn--resolve
													" type="submit">
													Завершить операцию
												</button>
											</div>
										</div>
									    <p class="form__paragraph form__paragraph--indent-top-desktop">
											Финальная скидка на покупку
										</p>
									</div>
									<div class="contract__item">
										<h4 class="list-title">
											Перед тем, как сдать своё устройство в Trade-In,
											рекомендуем:
										</h4>
											<ul class="list">
												<li class="list__item">
													на устройствах Appple: октлючить функцию "Найти
													iPhone";
												</li>
												<li class="list__item">
													сделать резервную копию на устройстве;
												</li>
												<li class="list__item">
													снять все защитные пленки/стёкла c экрана.
												</li>
											</ul>
									</div>
										<img class="form__img" src={img} alt="" aria-hidden="true" />
								</div>
							</div>
						</div>
				</div>
                <div>
                <Link to='/'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/consigagree'>Предыдущий шаг</Link>
            </div> 
			</div>        
         </div>
    );
};

export default Signed;
