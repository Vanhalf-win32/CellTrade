import React from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
    return(
        <div>
            <div class="form__step" id="thanks">
				<div class="form__container form__container--sm form__container--center">
					<h1 class="form__title">Спасибо!</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__description">
								<p class="form__paragraph">
									<b class="form__bold">Фото отправлено на проверку в Celltrade</b>
								</p>
							</div>
    						<div class="tooltip">
	            				<div class="tooltip__content">
    				        		<p class="form__paragraph">
	    					        	В течение нескольких минут результаты проверки будут
		    					        доступны в основном интерфейсе
			    			        </p>
				    	        </div>
				            </div>
			            </div>
		            </div>
			    </div>
		    </div>
            <div>
                <Link to='/verification'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/checkphoto'>Предыдущий шаг</Link>
            </div>            
        </div>
    );
};

export default Thanks;