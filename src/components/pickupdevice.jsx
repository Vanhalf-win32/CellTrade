import axios from "axios";
import React, { useEffect, useState } from "react";


const PickUpDevice = ({props, onNextStep}) => {
     const [button, setButton] = useState('disabled');
     const [spec, setSpec] = useState(0);
     const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
            "FINAL_PRICE": 	props.price,
            "FINAL_CONDITION:" : props.grade.FinalCondition,		
		}
	});
    
    axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData', 
        productData);

     useEffect(() => {
        if (spec === 4) {
            setButton('')
        }
     },[spec])

     const checkIcloud = () => {
        const data = axios.post(
            'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=checkIcloud', 
            {"post": {"device": props.data.IMEI}}
        );
        data.then((value) => {
            console.log('ICLOUD', value);
            if (value.data.data.STATUS === false) {
                onNextStep({
                    current: {
                        number: 10,
                        name: 'consigAgree'
                    }
                })
            } else {
                alert(value.data.data.MESSAGE)
            }
        })
     }



    return(
        <div>
            <div className="form__step" id="pick-up-device">
               <div className="form__container form__container--sm form__container--center">
                  <h1 className="form__subtitle form__subtitle--center">Заберите устройство</h1>
                    <div className="form__content">
                        <div className="form__item">
                            <div className="form__description">
                                <h3 className="form__paragraph">Подтвердите продукты</h3>
                            </div>
                            <div className="custom-field">
                                <label className="form__input form__input--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="CHECK_THE_QUALITY" onClick={() => {setSpec(spec + 1)}}/>
                                            <span className="custom-field__checkbox-custom"></span>
                                                Я проверил качество
                                </label>
                            </div>
                            <div className="custom-field">
                                <label className="form__input form__input--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox" name="SIMCARD_IS_MISSING" 
                                    onClick={() => {setSpec(spec + 1)}}/>
                                        <span className="custom-field__checkbox-custom"></span>
                                        Симкарта отсутствует
                                </label>
                            </div>
                            <div className="custom-field">
                                <label className="form__input form__input--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="UNLINKED_FROM_THE_DEVICE" onClick={() => {setSpec(spec + 1)}}/>
                                            <span className="custom-field__checkbox-custom"></span>
                                                Все учетные записи Клиента отвязаны от устройства
                                </label>
                            </div>
                            <label className="form__input form__input--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="RESET_TO_FACTORY" onClick={() => {setSpec(spec + 1)}}/>
                                            <span className="custom-field__checkbox-custom"></span>
                                                Устройство сброшено к заводским установкам
                                </label>
                            <div className="custom-field">
                                <div>
                                    <div className="check-it__item" 
                                    data-type-with-system="mobile-phone-android">
                                        <a href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1_samsung.jpg"
                                                data-caption="Перейдите в меню [Настройки]" data-group="mobile-phone-android">
                                                    <img className="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1_samsung.jpg"alt=""/>
                                                        Как это проверить?
                                        </a>
                                        <div className="visually-hidden">
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2_samsung.jpg"
                                                data-caption="Выберите раздел [Учётные записи]" data-group="mobile-phone-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2_samsung.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3_samsung.jpg"
                                                data-caption="Выберите аккаунт, который хотите удалить" data-group="mobile-phone-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3_samsung.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4_samsung.jpg"
                                                data-caption="Нажмите кнопку [Меню] (внизу слева) или [Опции] (может выглядеть как [︙] вверху справа)"
                                                    data-group="mobile-phone-android" aria-hidden="true" tabIndex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4_samsung.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_5_samsung.jpg"
                                                data-caption="Выберите пункт [Удалить учётную запись]" data-group="mobile-phone-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_5_samsung.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_6_samsung.jpg"
                                                data-caption="Убедитесь в том, что все учётные записи на устройстве отвязаны" data-group="mobile-phone-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_6_samsung.jpg" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="check-it__item" data-type-with-system="mobile-phone-ios">
                                        <a href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1.jpg"
                                            data-caption="Перейдите в приложение [Настройки]" data-group="mobile-phone-ios">
                                                <img className="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_1.jpg" alt="" />
                                                    Как это проверить?
                                        </a>
                                        <div className="visually-hidden">
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2.jpg"
                                                data-caption="Выберите раздел учётной записи" data-group="mobile-phone-ios" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_2.jpg" alt=""/>
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3.jpg"
                                                data-caption="Прокрутите вниз и нажмите кнопку [Выйти]" data-group="mobile-phone-ios"
                                                    aria-hidden="true" tabIndex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_3.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4.jpg"
                                                data-caption="Введите пароль от учётной записи iCloud и нажмите [Выкл.]"
                                                    data-group="mobile-phone-ios" aria-hidden="true" tabIndex="-1">
                                                     <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_4.jpg" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="check-it__item check-it__item--no-indent-top" data-type-with-system="watch-android">
                                        <a
                                            href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_1.jpg"
                                                data-caption="Откройте приложение 'Galaxy Wearable' на смартфоне Samsung" data-group="watch-android">
                                                    <img className="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_1.jpg" alt=""/>
                                                        Как это проверить?
                                        </a>
                                        <div className="visually-hidden">
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_2.jpg"
                                                data-caption="Выберите раздел 'Учётная запись и рез. копир.'" data-group="watch-android"
                                                     tabIndex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_2.jpg" alt="" />
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_3.jpg"
                                                data-caption="Нажмите кнопку 'Сбросить'" data-group="watch-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_3.jpg" alt=""/>
                                            </a>
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_4.jpg"
                                                data-caption="Подтвердите сброс" data-group="watch-android" aria-hidden="true" tabIndex="-1">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_s_4.jpg" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="check-it__item check-it__item--no-indent-top" data-type-with-system="watch-ios">
                                        <a
                                            href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_1.png"
                                                data-caption="Откройте приложение 'Apple Watch' на iPhone, перейдите на вкладку 'Мои часы' и нажмите кнопку информации рядом с часами"
                                                    data-group="watch-ios">
                                                        <img className="visually-hidden" src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_1.png" alt="" />
                                                            Как это проверить?
                                        </a>
                                        <div className="visually-hidden">
                                            <a className="smart-photo" href="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_2.png"
                                                data-caption="Выберите 'Разорвать пару с Apple Watch'. По завершении разрыва пары с Apple Watch выводится сообщение «Создать пару»"
                                                    data-group="watch-ios" aria-hidden="true" tabIndex="-1">
                                                        <img src="<?=SITE_TEMPLATE_PATH?>/img/content/unlock_hint_w_a_2.png" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div><br/>
                            </div>
                            <button className="
										form__btn
										form__btn--fill-color-main
										form__btn--indent-top
										form__btn--resolve" type="button" tabIndex="-1"
                                        disabled={button}
                                        onClick={() => {checkIcloud()}}
                                        >
                                    Принять устройство
                            </button>
                            <button className="
										form__btn
										form__btn--fill-color-main
										form__btn--indent-top
										form__btn--resolve" type="button">
                                Отменить операцию
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default PickUpDevice;