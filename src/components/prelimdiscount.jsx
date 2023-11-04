import React from "react";


const PrelimDiscount = ({props, onNextStep}) => {


    return(
        <div>
            <div className="" id="preliminary-discount">
				<div className="form__container form__container--center">
					<h1 className="form__title form__title--center">
						Предварительная сумма скидки
					</h1>
					<h2 className="form__title form__title--center">
						{props.data.Description}
					</h2>
					<div className="form__content">
						<div className="form__column">
							<div className="form__description form__description--center">
								<p className="form__paragraph form__paragraph--xl form__name"></p>
									<p className="form__paragraph form__paragraph--red">
										<b className="form__bold">Состояние устройства:<span className="form__device-state"></span></b>
									</p>
							</div>
								<table className="table">
									<caption className="table__caption">
										Сумма без дополнительной скидки
									</caption>
									<thead className="table__head">
										<tr className="table__row">
											<th className="table__header"></th>
											<th className="table__header">Отличное</th>
											<th className="table__header">Рабочее</th>
										</tr>
									</thead>
									<tbody className="table__body">
										<tr className="table__row">
											<td className="table__data" data-cell="">
												Цена SmartPrice
											</td>
											<td className="table__data" data-cell="Отличное">
												50 815 &#8381;
											</td>
											<td className="table__data" data-cell="Рабочее">
												41 547 &#8381;
											</td>
										</tr>
									</tbody>
								</table>
								<div className="form__container	form__container--sm	form__container--center">
									<button className="
										form__btn
										form__btn--fill-color-main
										form__btn--center
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

export default PrelimDiscount;