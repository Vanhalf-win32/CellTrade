import React from "react";
import img_1 from "../img/create_photo_1.png";
import img_2 from "../img/create_photo_2.png";
import icon from "../img/icon.png";
import iconSend from "../img/iconSend.png";


const CreatePhotos = () => {
    return(
        <div class="flex justify-center">
            <div class="flex justify-center w-full h-full p-4 lg:w-[1920px] lg:h-[1146px]">
                <div class="w-full h-full lg:mr-[38px] lg:w-[620px] lg:h-[900px] lg:mt-[127px]">
                    <div>
                        <h1 class="tracking-tight text-gray-900 text-[36px] lg:text-[44px]">
                            Сфотографируйте устройство
                        </h1>
                    </div>
                    <div class="lg:mt-[60px] lg:w-[294px] lg:h-[391px]">
                        <img src={img_1} alt="create_photo"/>
                    </div>
                    <div class="flex justify-between lg:mt-[60px]">
                        <div>
                            <p class="lg:w-[261px] lg:h-[58px] text-[20px] text-green-500">
                                Фото задней панели устройства и SIM-лотка
                            </p>                            
                        </div>
                        <div class="flex items-center justify-around p-5 lg:w-[249px] lg:h-[68px] bg-green-600 rounded-2xl">
                            <img class="w-[51px] h-[43px]" src={icon} alt="icon"/>
                            <button class="text-white text-[20px]">
                                Сделать фото
                            </button>
                        </div>
                    </div>
                    <div class="mt-10 p-4 rounded-xl bg-green-100 lg:w-[620px] lg:h-[130px]">
                        <p class="text-[20px]">
                            На фото должны быть чётко различны надписи на
                            корпусе или IMEI. Если IMEI на SIM-лотке, просьба
                            положить рядом с телефоном SIM-лоток с IMEI.
                        </p>
                    </div>
                    <div class="mt-10 lg:w-[340px] lg:h-[68px] bg-green-600 rounded-2xl">
                        <button class="flex items-center justify-center p-2  w-full h-full text-white text-[20px]">
                            <img class="w-[46px] h-[46px] mr-5" src={iconSend} alt="iconSend"/>
                            Отправить фотографии
                        </button>
                    </div>
                </div>
                <div class="w-full h-full lg:ml-[38px] lg:mt-[236px] lg:w-[620px] lg:h-[800px]">
                    <div class="lg:mt-4 lg:w-[294px] lg:h-[391px]">
                        <img src={img_2} alt="create_photo"/>
                    </div>
                    <div class="flex justify-between lg:mt-[60px]">
                        <div>
                            <p class="lg:w-[261px] lg:h-[58px] text-[20px] text-green-500">
                                Фото передней панели устройства и IMEI
                            </p>                            
                        </div>
                        <div class="flex items-center justify-around p-5 lg:w-[249px] lg:h-[68px] bg-green-600 rounded-2xl">
                            <img class="w-[51px] h-[43px]" src={icon} alt="icon"/>
                            <button class="text-white text-[20px]">
                                Сделать фото
                            </button>
                        </div>
                    </div>
                    <div class="mt-10 p-4 rounded-xl bg-green-100 lg:w-[620px] lg:h-[130px]">
                        <p class="text-[20px]">
                            На фото должен быть виден IMEI устройства. <br/>
                            Откройте на устройстве Настройки или введите<br/> 
                            *#06#.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};


export default CreatePhotos;