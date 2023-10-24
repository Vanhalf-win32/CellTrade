import React from "react";
import '../style/style.min.css';
import { Link } from 'react-router-dom';


const Index = () => {
    return(
        <div>
            <div></div>
                <div class="preloader preloader--main preloader--show">
                    <div class="preloader__fragment">
                        <svg class="circle" viewBox="0 0 100 100" width="100" height="100">
                            <g class="circle__blend">
                                <path class="circle__path" d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" />
                            </g>
                        </svg>
                    </div>
                </div>
            <div class="wrapper">

                <div class="page">
                    <div class="container">
                        <form action="" method="POST">
                            <div class="
                                    form__container form__container--sm form__container--center
                                ">
                                <h1 class="form__title">Вход</h1>
                                <div class="form__content">
                                    <div class="form__column form__column--center">
                                        <label class="form__label">
                                            <input class="form__input form__input--text" type="text" name="LOGIN" placeholder="Логин" />
                                        </label>
                                        <label class="form__label">
                                            <input class="form__input form__input--text" type="password" name="PASSWORD" placeholder="Пароль" />
                                        </label>
                                        <button class="
                                                    form__btn
                                                    form__btn--fill-color-main
                                                    form__btn--indent-top
                                                    form__btn--resolve
                                                " type="submit">
                                                Войти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Link to='/checkimei'>Следующий шаг</Link> 
            </div>
            <div>
                <Link to='/checkimei'>Предыдущий шаг</Link>
            </div>
        </div>     
    );
};


export default Index;