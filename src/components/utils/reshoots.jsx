import { defaults } from "autoprefixer";
import React from "react";



const Reshoots = ({reshoots, statusBot}) => {
    return(
        <div class="w-full h-full mb-5 lg:w-[632px] lg:h-[117px] mt-10 lg:mb-4lg:text-[20px]">
            <h2 class="p-3 bg-red-100 rounded-xl">
                    Внимание! Загружаемое качество фотографии<br/>
                     <b class="text-red-500">{reshoots}</b> плохого качества.
                    Пожалуйста, попробуйте сфотографировать  еще раз.
                {statusBot}
            </h2>						
    </div>
    );
};


export default Reshoots;