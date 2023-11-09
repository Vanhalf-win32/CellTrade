import React from "react";
import img from "../img/content/barcode.png";

const Signed = ({props, onNextStep}) => {
    return(
        <div>
            <div className="form__step" id="contract-is-signed">
				<div className="form__container form__container--md form__container--center">
					<h1 className="form__title">Договор подписан</h1>
						<div className="form__content">
							<div className="form__column form__column--full-width">
								<div className="contract">
									<div className="contract__item">
										<div className="form__content">
											<div className="form__column">
												<p className="
													form__paragraph
													form__paragraph--xl
													form__paragraph--bold
													form__paragraph--no-wrap
													">
													{props.price}
												</p>
											</div>
											<div className="form__column form__column--no-indent-top-mobile">
												<button className="
													form__btn
													form__btn--fill-color-main
													form__btn--indent-top-mobile
													form__btn--resolve
													" type="submit">
													Завершить операцию
												</button>
											</div>
										</div>
									    <p className="form__paragraph form__paragraph--indent-top-desktop">
											Финальная скидка на покупку
										</p>
									</div>
									<div className="contract__item">
										<h4 className="list-title">
											Перед тем, как сдать своё устройство в Trade-In,
											рекомендуем:
										</h4>
											<ul className="list">
												<li className="list__item">
													на устройствах Appple: октлючить функцию "Найти
													iPhone";
												</li>
												<li className="list__item">
													сделать резервную копию на устройстве;
												</li>
												<li className="list__item">
													снять все защитные пленки/стёкла c экрана.
												</li>
											</ul>
									</div>
										<img className="form__img" src={img} alt="" aria-hidden="true" />
								</div>
							</div>
						</div>
				</div>
			</div>        
         </div>
    );
};

export default Signed;
