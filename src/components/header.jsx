import React from "react";
import img from "../img/svg/logo.svg";


const Header = () => {
    return(
        <div class="header @@if (context.mod) { header--@@mod }">
	            <div class="header__content">
		            <div class="header__row header__row--fill-dark">
			            <div class="container">
				            <div class="header__container header__container--no-padding">
					            <div class="header__point">Huawei Охотный ряд</div>
					            <nav class="nav">
						            <ul class="nav__list">
							            <li class="nav__list-item">
								            <a class="nav__link" href="#0">Новая оценка</a>
							            </li>
							            <li class="nav__list-item">
								            <a class="nav__link" href="#0">Принятые устройства</a>
							            </li>
							            <li class="nav__list-item">
								            <a class="nav__link" href="#0">Ждут курьера</a>
							            </li>
							            <li class="nav__list-item nav__list-item--border-left">
								            <a class="nav__link" href="#0">Выйти</a>
							            </li>
						            </ul>
					            </nav>
                            </div>
					        <div class="toggle-menu-wrapper">
						        <button
                                    class="toggle-menu"
                                    id="toggle-menu"
                                    aria-label="Переключатель отображения меню"
                                    aria-pressed="false"
                                    aria-expanded="false"
                                    tabindex="0">
							            <span class="toggle-menu__line"></span>
						        </button>
					        </div>
					        <div class="dropdown-menu">
						        <ul class="dropdown-menu__list">
							        <li class="dropdown-menu__item">
								        <a class="dropdown-menu__link" href="#0">Новая оценка</a>
							        </li>
							        <li class="dropdown-menu__item">
								        <a class="dropdown-menu__link" href="#0">Принятые устройства</a>
							        </li>
							        <li class="dropdown-menu__item">
								        <a class="dropdown-menu__link" href="#0">Ждут курьера</a>
							        </li>
							        <li class="dropdown-menu__item">
								        <a class="dropdown-menu__link" href="#0">Выйти</a>
							        </li>
						        </ul>
					        </div>
				        </div>
			        </div>
		        </div>
		        <div class="header__row">
			        <div class="container">
				        <div class="header__container header__container--bottom">
					        <a class="header__logo-wrap" href="/" aria-label="Перейти на главную">
						        <img
                                    class="header__logo"
                                    src={img}
                                    alt="Логотип"
                                    width="150"
                                    height="75"
						        />
					        </a>
                        </div>
					    <div class="header__info">
						    <span class="header__description">
                                Бесплатная линия поддержки (круглосуточно)
                            </span>
						        <a class="header__link" href="tel:+7(800)302-43-53">
                                    +7 (800) 302-43-53
                                </a>
						        <a class="header__link" href="tel:+7(495)175-43-33">
                                    +7 (495) 175-43-33</a>
					    </div>
				    </div>
			    </div>
        </div>
    );
};


export default Header;