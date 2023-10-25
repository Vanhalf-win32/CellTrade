import React from "react";
import { Link } from "react-router-dom";
import img from "../img/content/smashed.jpg";
import img1 from "../img/content/no-smashed.jpg";

const CheckDisplay = () => {
    return(
        <div class="form" action="" method="POST">
            <div class="form__step" id="check-defect">
				<div class="form__container">
					<h1 class="form__title">
						Экран не разбит / нет дефектов матрицы?
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__container form__container--center">
								<img class="form__img form__img--center form__img--fix-height" src={img} alt="" width="450" height="450" />
									<button class="
												form__btn
												form__btn--fill-red
												form__btn--center
												form__btn--indent-top
												form__btn--reject
												" type="button">
											Экран разбит и/или имеет выгорания
									</button>
							</div>
						</div>
						<div class="form__column">
							<div class="form__container form__container--center">
								<img class="form__img form__img--center form__img--fix-height" src={img1} alt="" width="450" height="450" />
									<button class="
										form__btn
										form__btn--fill-green
										form__btn--center
										form__btn--indent-top
										form__btn--resolve
										" type="button">
										Экран не разбит и не имеет выгораний
									</button>
							</div>
						</div>
						</div>
				</div>
				
            </div>
            <div>
                <Link to='/prelimdiscount'>Следующий шаг(prelimdiscount)</Link><br/> 
                <Link to='/checkdefect'>Следующий шаг(checkdefect)</Link> 
            </div>
            <div>
                <Link to='/checkphone'>Предыдущий шаг</Link>
            </div>
        </div>
    );
};




export default CheckDisplay;
