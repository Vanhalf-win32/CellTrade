import React from "react";
import '../style/style.min.css';
import { Link } from "react-router-dom";

const PrelimDiscount = () => {
    return(
        <div>
            <div class="" id="preliminary-discount">
				<div class="form__container form__container--center">
					<h1 class="form__title form__title--center">
						Предварительная сумма скидки
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__description form__description--center">
								<p class="form__paragraph form__paragraph--xl form__name"></p>
									<p class="form__paragraph form__paragraph--red">
										<b class="form__bold">Состояние устройства:<span class="form__device-state"></span></b>
									</p>
							</div>
								<table class="table">
									<caption class="table__caption">
										Сумма без дополнительной скидки
									</caption>
									<thead class="table__head">
										<tr class="table__row">
											<th class="table__header"></th>
											<th class="table__header">Отличное</th>
											<th class="table__header">Рабочее</th>
										</tr>
									</thead>
									<tbody class="table__body">
										<tr class="table__row">
											<td class="table__data" data-cell="">
												Цена SmartPrice
											</td>
											<td class="table__data" data-cell="Отличное">
												50 815 &#8381;
											</td>
											<td class="table__data" data-cell="Рабочее">
												41 547 &#8381;
											</td>
										</tr>
									</tbody>
								</table>
								<div class="form__container	form__container--sm	form__container--center">
									<button class="
										form__btn
										form__btn--fill-color-main
										form__btn--center
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
                <Link to='/checkphoto'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/checkdisplay'>Предыдущий шаг</Link>
            </div>
        </div>
    );
};

export default PrelimDiscount;