import React from "react";
import { Link } from "react-router-dom";
import Loader from "./utils/loader";

const Verification = () => {
    return(
        <div>
            <div class="form__step" id="verification">
				<div class="form__container form__container--sm form__container--center">
					<h1 class="form__title">Ожидается проверка в Celltrade</h1>
						<div class="form__content">
							<div class="form__column">
								<div class="counter">  
                                <div><Loader/></div>
									{/* <svg class="counter__svg" width="150" height="150" viewBox="0 0 150 150">
										<circle class="counter__circle counter__circle--bg" cx="75" cy="75" r="65" />
										<circle class="counter__circle counter__circle--fill" cx="75" cy="75" r="65" />
									</svg> */}
									<div class="counter__number"></div>
                                  
								</div>
								<div class="form__description">
									<p class="form__paragraph">
										Если ожидание составило более 5 минут, пожалуйста,
										обратитесь в группу поддержки по Trade-In в мессенджере
									</p>
								</div>
							</div>
						</div>
				</div>
			</div>
            <div>
                <Link to='/totaldiscount'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/checkphoto'>Предыдущий шаг</Link>
            </div>   
        </div>
    );
};

export default Verification;