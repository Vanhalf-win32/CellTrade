import React from "react";



const CheckBoxImei = ({enable}) => {
    return(
        <div class="flex items-center mb-4">
				<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500" type="checkbox" onClick={enable}/>
				<span class="ml-2 text-[20px]">Внешний IMEI есть и совпадает с внутренним</span>
        </div>
    )
}

export default CheckBoxImei;