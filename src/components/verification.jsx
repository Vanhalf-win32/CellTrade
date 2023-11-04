import React from "react";
import Loader from "./utils/loader";

const Verification = () => {
    return(
        <div>
            <div className="form__step" id="verification">
				<div className="form__container form__container--sm form__container--center">
					<h1 className="form__title">Ожидается проверка в Celltrade</h1>
						<div className="form__content">
							<div className="form__column">
								<div className="counter">  
                                <div><Loader/></div>
									{/* <svg class="counter__svg" width="150" height="150" viewBox="0 0 150 150">
										<circle class="counter__circle counter__circle--bg" cx="75" cy="75" r="65" />
										<circle class="counter__circle counter__circle--fill" cx="75" cy="75" r="65" />
									</svg> */}
									<div className="counter__number"></div>
                                  
								</div>
								<div className="form__description">
									<p className="form__paragraph">
										Если ожидание составило более 5 минут, пожалуйста,
										обратитесь в группу поддержки по Trade-In в мессенджере
									</p>
								</div>
							</div>
						</div>
				</div>
			</div> 
        </div>
    );
};

export default Verification;