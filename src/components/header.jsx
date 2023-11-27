import React from "react";
import img from "../img/svg/logo.svg";
import Cookies from 'js-cookie';


const Header = ({onExit}) => {

	const aborted = () => {
		Cookies.remove('PRODUCT_SESSID');
		onExit();
   };
	
    return(
        <div className="header @@if (context.mod) { header--@@mod }">
	            <div className="header__content">
		            <div className="header__row header__row--fill-dark">
			            <div className="container">
				            <div className="header__container header__container--no-padding">
					            <div className="header__point">Huawei Охотный ряд</div>
					            <nav className="nav">
						            <ul className="nav__list">
							            <li className="nav__list-item">
								            <button className="form__btn form__btn--fill-color-main"
											onClick={aborted}>
												Новая оценка
											</button>
							            </li>
							            <li className="nav__list-item">
								            <button className="form__btn form__btn--fill-color-main">Принятые устройства</button>
							            </li>
							            <li className="nav__list-item">
								            <button className="form__btn form__btn--fill-color-main">Ждут курьера</button>
							            </li>
							            <li className="nav__list-item nav__list-item--border-left">
								            <button className="form__btn form__btn--fill-color-main">Выйти</button>
							            </li>
						            </ul>
					            </nav>
                            </div>
				        </div>
			        </div>
		        </div>
		        <div className="header__row">
			        <div className="container">
				        <div className="header__container header__container--bottom">
					        <a className="header__logo-wrap" href="/" aria-label="Перейти на главную">
						        <img
                                    className="header__logo"
                                    src={img}
                                    alt="Логотип"
                                    width="150"
                                    height="75"
						        />
					        </a>
                        </div>
					    <div className="header__info">
						    <span className="header__description">
                                Бесплатная линия поддержки (круглосуточно)
                            </span>
						        <a className="header__link" href="tel:+7(800)302-43-53">
                                    +7 (800) 302-43-53
                                </a>
						        <a className="header__link" href="tel:+7(495)175-43-33">
                                    +7 (495) 175-43-33</a>
					    </div>
				    </div>
			    </div>
        </div>
    );
};


export default Header;
