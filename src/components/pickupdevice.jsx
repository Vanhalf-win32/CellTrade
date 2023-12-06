import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from '../img/content/unlock_hint_1_samsung.jpg';
import img2 from '../img/content/unlock_hint_2_samsung.jpg';
import img3 from '../img/content/unlock_hint_3_samsung.jpg';
import img4 from '../img/content/unlock_hint_4_samsung.jpg';
import img5 from '../img/content/unlock_hint_5_samsung.jpg';
import img6 from '../img/content/unlock_hint_6_samsung.jpg';
import img7 from '../img/content/samsung_flaws3.jpg';
import img8 from '../img/content/unlock_hint_1.jpg';
import img9 from '../img/content/unlock_hint_2.jpg';
import img10 from '../img/content/unlock_hint_3.jpg';
import img11 from '../img/content/unlock_hint_4.jpg';
import img12 from '../img/content/unlock_hint_w_s_1.jpg';
import img13 from '../img/content/unlock_hint_w_s_2.jpg';
import img14 from '../img/content/unlock_hint_w_s_3.jpg';
import img15 from '../img/content/unlock_hint_w_s_4.jpg';
import img16 from '../img/content/unlock_hint_w_a_1.png';
import img17 from '../img/content/unlock_hint_w_a_2.png';


const PickUpDevice = ({props, onExit, onNextStep}) => {
    const images = [
        {original: img1},{original: img2},{original: img3},{original: img4},{original: img5},{original: img6},
        {original: img7},{original: img8},{original: img9},{original: img10},{original: img11},{original: img12},
        {original: img13},{original: img14},{original: img15},{original: img16},{original: img17},
    ];
    const [howCheck, setHowCheck] = useState(0);
    const [button, setButton] = useState('disabled');
    const [spec, setSpec] = useState(0);
    const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
            "FINAL_PRICE": 	props.price,	
		}
	});
    
    axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`, 
        productData);

     useEffect(() => {
        if (spec === 4) {
            setButton('')
        }
     },[spec])

     const checkIcloud = () => {
        axios.post(
            `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
            {
                post: {
                    PRODUCT_DATA: JSON.stringify(props),
                    TRADEIN_STATUS:	'Принятие устройства',			
                }
            }
        );
        const data = axios.post(
            `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=checkIcloud`, 
            {"post": {"device": props.data.IMEI}}
        );
        data.then((value) => {
            if (value.data.data.STATUS === true) { 
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
           `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
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
                               {howCheck === 1 ? <ReactImageGallery items={images} showPlayButton={false}/> : null}
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