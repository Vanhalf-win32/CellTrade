import React from "react";


const TotalDiscount = () => {
    return(
        <div>
			<div className="form__step" id="total-discount">
				<div className="form__container">
					<h1 className="form__title form__title--center">
						Итоговая сумма скидки
					</h1>
					<div className="form__content">
						<div className="form__column">
							<div className="form__description form__description--center">
								<p className="form__paragraph form__paragraph--xl form__name"></p>
									<p className="form__paragraph form__paragraph--bold">
										Состояние устройства:Name
										<span className="form__device-state">Отличное</span>
									</p>
									<p className="form__paragraph form__paragraph--bold">
										Дефект:
										<span className="form__state-defects">дефектов нет</span>
									</p>
							</div>
							<table className="table">
								<caption className="table__caption">
									Сумма без учёта скидки
								</caption>
								<thead className="table__head">
									<tr className="table__row">
										<th className="table__header"></th>
										<th className="table__header">Отличное</th>
										</tr>
								</thead>
								<tbody className="table__body">
									<tr className="table__row">
										<td className="table__data" data-cell="">
											Цена CellTrade
										</td>
	    									<td className="table__data" data-cell="Отличное">
												50 814 &#8381;
											</td>
									</tr>
								</tbody>
							</table>
							<div className="
								form__container
								form__container--sm
								form__container--center
								">
								<button className="
									form__btn
									form__btn--center
									form__btn--fill-color-main
									form__btn--indent-top
									form__btn--indent-bottom
									form__btn--resolve
									" type="button">
									Клиент согласен
								</button>
								<button className="
									form__btn
									form__btn--center
									form__btn--fill-transparent
									form__btn--reject
									" type="button">
									Клиент отказался
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>            
    );
};

export default TotalDiscount;