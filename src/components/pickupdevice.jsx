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
            if (value.data.data.STATUS !== true) { 
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
        <div class="flex justify-center">
            <div class="flex justify-center w-full h-full p-4 lg:p-0 lg:w-[1920px] lg:h-[1146px]">
                <div class="w-full h-full mt-10 lg:w-[394px] lg:h-[510px] lg:mt-[125px]">
                    <div class="mb-4 tracking-tight text-gray-900 text-[36px] lg:text-[41px]">
                        <h1>Заберите устройство</h1>
                    </div>
                    <div class="mb-6">
                        <h2 class="text-[22px] text-gray-500">
                            Подтвердите продукты
                        </h2>                    
                    </div>
                    <div class="flex mb-4">
                        <input 
                            class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500" 
                            type="checkbox"
                            name="CHECK_THE_QUALITY" 
                            onClick={() => {setSpec(spec + 1)}}
                        />
                        <span class="ml-2 text-[20px]">Я проверил качество</span>
                    </div>
                    <div class="flex mb-4">
                        <input
                            class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"  
                            type="checkbox" 
                            name="SIMCARD_IS_MISSING" 
                            onClick={() => {setSpec(spec + 1)}}
                        />
                        <span class="ml-2 text-[20px]">SIM-карта отсутствует</span>
                    </div>
                    <div class="flex mb-2">
                        <input
                            class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"  
                            type="checkbox"
                            name="UNLINKED_FROM_THE_DEVICE" 
                            onClick={() => {setSpec(spec + 1)}}
                        />
                        <span class="ml-2 text-[20px]">Все учетные записи Клиента отвязаны от устройства</span>
                    </div>
                    <div class="flex mb-4">
                        <input
                            class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"
                            type="checkbox"
                            name="RESET_TO_FACTORY" 
                            onClick={() => {setSpec(spec + 1)}}
                        />
                        <span class="ml-2 text-[20px]">Устройство сброшено к заводским установкам </span>
                    </div>
                    <div >
                        <button
                            class="flex border-2 mt-3 w-34 h-10 p-2 rounded-lg  bg-green-500" 
                            onClick={() => {setHowCheck(1)}}
                        >
                        <span class="text-sm text-white">Как это проверить?</span>
                        </button>
                    </div>
                    <div class="flex justify-around lg:justify-between w-full h-[68px] mt-10 lg:mt-6">
                        <div class="flex justify-center w-[200px] lg:w-[256px] h-[68px] rounded-2xl bg-red-500">
                            <button 
                                class="text-white lg:text-[22px]"
                                type="button"
                                onClick={aborted}
                            >
                                Отменить операцию
                            </button>                        
                        </div>
                        <div class="flex justify-center w-[123px] h-[68px] ">
                            <button 
                                class="w-full lg:text-[22px] disabled:bg-gray-400 text-white rounded-2xl bg-green-500"
                                type="button" 
                                tabIndex="-1"
                                disabled={button}
                                onClick={() => {checkIcloud()}}
                            >
                                Далее
                            </button>
                        </div>                    
                    </div>                
                    <div class="size-45 mt-6">
                        {howCheck === 1 ? <ReactImageGallery items={images} showPlayButton={false}/> : null}
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default PickUpDevice;