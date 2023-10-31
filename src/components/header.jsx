import React from "react";
import img from "../img/svg/logo.svg";


const Header = () => {
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
								            <a className="nav__link" href="#0">Новая оценка</a>
							            </li>
							            <li className="nav__list-item">
								            <a className="nav__link" href="#0">Принятые устройства</a>
							            </li>
							            <li className="nav__list-item">
								            <a className="nav__link" href="#0">Ждут курьера</a>
							            </li>
							            <li className="nav__list-item nav__list-item--border-left">
								            <a className="nav__link" href="#0">Выйти</a>
							            </li>
						            </ul>
					            </nav>
                            </div>Name
					        <div className="toggle-menu-wrapper">
						        <button
                                    className="toggle-menu"
                                    id="toggle-menu"
                                    aria-label="Переключатель отображения меню"
                                    aria-pressed="false"
                                    aria-expanded="false"
                                    tabIndex="0">
							            <span className="toggle-menu__line"></span>
						        </button>
					        </div>
					        <div className="dropdown-menu">
						        <ul className="dropdown-menu__list">
							        <li className="dropdown-menu__item">
								        <a className="dropdown-menu__link" href="#0">Новая оценка</a>
							        </li>
							        <li className="dropdown-menu__item">
								        <a className="dropdown-menu__link" href="#0">Принятые устройства</a>
							        </li>
							        <li className="dropdown-menu__item">
								        <a className="dropdown-menu__link" href="#0">Ждут курьера</a>
							        </li>
							        <li className="dropdown-menu__item">
								        <a className="dropdown-menu__link" href="#0">Выйти</a>
							        </li>
						        </ul>
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