import React from "react";



const CheckBoxImei = ({enable}) => {
    return(
        <div class="flex flex-col items-start">
            <label class="inline-flex mt-2 justify-center items-center rounded">
				<input class="w-6 h-6 rounded-full text-green-500 focus:ring-green-500" type="checkbox" onClick={enable}/>
				<span class="ml-2">Внешний IMEI есть и совпадает с внутренним</span>
			</label>
        </div>
    )
}

export default CheckBoxImei;