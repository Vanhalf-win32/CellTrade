import React from "react";
import { Link } from "react-router-dom";

const TotalDiscount = () => {
    return(
        <div>
			<div class="form__step" id="total-discount">
				<div class="form__container">
					<h1 class="form__title form__title--center">
						Итоговая сумма скидки
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__description form__description--center">
								<p class="form__paragraph form__paragraph--xl form__name"></p>
									<p class="form__paragraph form__paragraph--bold">
										Состояние устройства:
										<span class="form__device-state">Отличное</span>
									</p>
									<p class="form__paragraph form__paragraph--bold">
										Дефект:
										<span class="form__state-defects">дефектов нет</span>
									</p>
							</div>
							<table class="table">
								<caption class="table__caption">
									Сумма без учёта скидки
								</caption>
								<thead class="table__head">
									<tr class="table__row">
										<th class="table__header"></th>
										<th class="table__header">Отличное</th>
										</tr>
								</thead>
								<tbody class="table__body">
									<tr class="table__row">
										<td class="table__data" data-cell="">
											Цена CellTrade
										</td>
	    									<td class="table__data" data-cell="Отличное">
												50 814 &#8381;
											</td>
									</tr>
								</tbody>
							</table>
							<div class="
								form__container
								form__container--sm
								form__container--center
								">
								<button class="
									form__btn
									form__btn--center
									form__btn--fill-color-main
									form__btn--indent-top
									form__btn--indent-bottom
									form__btn--resolve
									" type="button">
									Клиент согласен
								</button>
								<button class="
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
            <div>
                <Link to='/pickupdevice'>Следующий шаг(prelimdiscount)</Link><br/> 
            </div>
            <div>
                <Link to='/verification'>Предыдущий шаг</Link>
            </div>
        </div>            
    );
};

export default TotalDiscount;