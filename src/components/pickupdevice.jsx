import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import CheckPickUpDevice from "./utils/checkPickUpDevice";


const PickUpDevice = ({props, onExit, onNextStep}) => {
     const [howCheck, setHowCheck] = useState(0);
     const [button, setButton] = useState('disabled');
     const [spec, setSpec] = useState(0);
     const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
            "FINAL_PRICE": 	props.price,	
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
        axios.post(
            'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
            {
                post: {
                    PRODUCT_DATA: JSON.stringify(props),
                    TRADEIN_STATUS:	'Принятие устройства',			
                }
            }
        );
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
        });
     };


     const aborted = () => {
        const data = axios.post(
           'http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData',
            {
                post: {
                    PRODUCT_DATA: JSON.stringify(props),
                    TRADEIN_STATUS:	'Отказ при итоговой проверке',			
                }
            }
       );
       data.then((value) => {
        if(value.data.status === "success") {
            Cookies.remove('PRODUCT_SESSID');
            onExit();
        }
    })
       onExit();
   };

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
                                <label className="form__label form__label--bold form__label--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="CHECK_THE_QUALITY" onClick={() => {setSpec(spec + 1)}}/>
                                            <span className="custom-field__checkbox-custom"></span>
                                                Я проверил качество
                                </label>
                            </div>
                            <div className="custom-field">
                                <label className="form__label form__label--bold form__label--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox" name="SIMCARD_IS_MISSING" 
                                    onClick={() => {setSpec(spec + 1)}}/>
                                        <span className="custom-field__checkbox-custom"></span>
                                        Симкарта отсутствует
                                </label>
                            </div>
                            <div className="custom-field">
                                <label className="form__label form__label--bold form__label--checkbox">
                                    <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                        name="UNLINKED_FROM_THE_DEVICE" onClick={() => {setSpec(spec + 1)}}/>
                                            <span className="custom-field__checkbox-custom"></span>
                                                Все учетные записи Клиента отвязаны от устройства
                                </label>
                            </div>
                            <label className="form__label form__label--bold form__label--checkbox">
                                 <input className="custom-field__input custom-field__input--checkbox" type="checkbox"
                                    name="RESET_TO_FACTORY" onClick={() => {setSpec(spec + 1)}}/>
                                     <span className="custom-field__checkbox-custom"></span>
                                   Устройство сброшено к заводским установкам 
                            </label>
                            <div>
                               {howCheck === 1 ? <CheckPickUpDevice/> : null}
                            </div>
                            <div className="defects-list__item">
                                <button className="form__link check-it__link smart-photo"
                                onClick={() => {setHowCheck(1)}}>
                                    Как это проверить?
                                </button>
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
										form__btn--resolve" type="button"
                                        onClick={aborted}>
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