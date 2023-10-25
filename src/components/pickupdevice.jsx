import React from "react";
import { Link } from "react-router-dom";

const PickUpDevice = () => {
    return(
        <div>
            <div class="form__step" id="pick-up-device">
               <div class="form__container form__container--sm form__container--center">
                  <h2 class="form__subtitle form__subtitle--center">Заберите устройство</h2>
                    <div class="form__content">
                        <div class="form__item">
                            <div class="form__description">
                                <p class="form__paragraph">Подвтердите продукты</p>
                            </div>
                            <div class="custom-field">
                                <label class="custom-field__label custom-field__label--bold custom-field__label--checkbox">
                                    <input class="visually-hidden custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="CHECK_THE_QUALITY" />
                                            <span class="custom-field__checkbox-custom"></span>
                                                Я проверил качество
                                </label>
                            </div>
                            <div class="custom-field">
                                <label class="custom-field__label custom-field__label--bold custom-field__label--checkbox">
                                    <input class="visually-hidden custom-field__input custom-field__input--checkbox" type="checkbox" name="SIMCARD_IS_MISSING" />
                                        <span class="custom-field__checkbox-custom"></span>
                                        Симкарта отсутствует
                                </label>
                            </div>
                            <div class="custom-field">
                                <label class="custom-field__label custom-field__label--bold custom-field__label--checkbox">
                                    <input class="visually-hidden custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="UNLINKED_FROM_THE_DEVICE" />
                                            <span class="custom-field__checkbox-custom"></span>
                                                Все учетные записи Клиента отвязаны от устройства
                                </label>
                            </div>
                            <div class="custom-field">
                                <div class="check-it check-it--right">
                                    <div class="check-it__item check-it__item--no-indent-top" data-type-with-system="mobile-phone-android">
                                        <a class="form__link check-it__link smart-photo custom-underline"
                                            href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1_samsung.jpg"
                                                data-caption="Перейдите в меню [Настройки]" data-group="mobile-phone-android">
                                                    <img class="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1_samsung.jpg"alt=""/>
                                                        Как это проверить?
                                        </a>
                                        <div class="visually-hidden">
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2_samsung.jpg"
                                                data-caption="Выберите раздел [Учётные записи]" data-group="mobile-phone-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2_samsung.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3_samsung.jpg"
                                                data-caption="Выберите аккаунт, который хотите удалить" data-group="mobile-phone-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3_samsung.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4_samsung.jpg"
                                                data-caption="Нажмите кнопку [Меню] (внизу слева) или [Опции] (может выглядеть как [︙] вверху справа)"
                                                    data-group="mobile-phone-android" aria-hidden="true" tabindex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4_samsung.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_5_samsung.jpg"
                                                data-caption="Выберите пункт [Удалить учётную запись]" data-group="mobile-phone-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_5_samsung.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_6_samsung.jpg"
                                                data-caption="Убедитесь в том, что все учётные записи на устройстве отвязаны" data-group="mobile-phone-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_6_samsung.jpg" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="check-it__item check-it__item--no-indent-top" data-type-with-system="mobile-phone-ios">
                                        <a class="form__link check-it__link smart-photo custom-underline" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1.jpg"
                                            data-caption="Перейдите в приложение [Настройки]" data-group="mobile-phone-ios">
                                                <img class="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1.jpg" alt="" />
                                                    Как это проверить?
                                        </a>
                                        <div class="visually-hidden">
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2.jpg"
                                                data-caption="Выберите раздел учётной записи" data-group="mobile-phone-ios" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2.jpg" alt=""/>
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3.jpg"
                                                data-caption="Прокрутите вниз и нажмите кнопку [Выйти]" data-group="mobile-phone-ios"
                                                    aria-hidden="true" tabindex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4.jpg"
                                                data-caption="Введите пароль от учётной записи iCloud и нажмите [Выкл.]"
                                                    data-group="mobile-phone-ios" aria-hidden="true" tabindex="-1">
                                                     <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4.jpg" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div class="check-it__item check-it__item--no-indent-top" data-type-with-system="watch-android">
                                        <a class="form__link check-it__link smart-photo custom-underline"
                                            href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_1.jpg"
                                                data-caption="Откройте приложение 'Galaxy Wearable' на смартфоне Samsung" data-group="watch-android">
                                                    <img class="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_1.jpg" alt=""/>
                                                        Как это проверить?
                                        </a>
                                        <div class="visually-hidden">
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_2.jpg"
                                                data-caption="Выберите раздел 'Учётная запись и рез. копир.'" data-group="watch-android"
                                                    aria-hidden="true" tabindex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_2.jpg" alt="" />
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_3.jpg"
                                                data-caption="Нажмите кнопку 'Сбросить'" data-group="watch-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_3.jpg" alt=""/>
                                            </a>
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_4.jpg"
                                                data-caption="Подтвердите сброс" data-group="watch-android" aria-hidden="true" tabindex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_4.jpg" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div class="check-it__item check-it__item--no-indent-top" data-type-with-system="watch-ios">
                                        <a class="form__link check-it__link smart-photo custom-underline"
                                            href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_1.png"
                                                data-caption="Откройте приложение 'Apple Watch' на iPhone, перейдите на вкладку 'Мои часы' и нажмите кнопку информации рядом с часами"
                                                    data-group="watch-ios">
                                                        <img class="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_1.png" alt="" />
                                                            Как это проверить?
                                        </a>
                                        <div class="visually-hidden">
                                            <a class="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_2.png"
                                                data-caption="Выберите 'Разорвать пару с Apple Watch'. По завершении разрыва пары с Apple Watch выводится сообщение «Создать пару»"
                                                    data-group="watch-ios" aria-hidden="true" tabindex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_2.png" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <label class="custom-field__label custom-field__label--bold custom-field__label--checkbox">
                                    <input class="visually-hidden custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="RESET_TO_FACTORY" />
                                            <span class="custom-field__checkbox-custom"></span>
                                                Устройство сброшено к заводским установкам
                                </label>
                            </div>
                            <button class="visually-hidden btn btn--fill-color-main btn--indent-top btn--resolve" type="button" tabindex="-1">
                                    Принять устройство
                            </button>
                            <button class="btn btn--fill-transparent btn--indent-top btn--reject" type="button">
                                Отменить операцию
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link to='/consigagree'>Следующий шаг</Link>  
            </div>
            <div>
                <Link to='/totaldiscount'>Предыдущий шаг</Link>
            </div>  
        </div>
    );
};

export default PickUpDevice;