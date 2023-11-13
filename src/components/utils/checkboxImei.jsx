import React from "react";



const CheckBoxImei = ({enable}) => {
    return(
        <div>
            <label className="form__label form__label--checkbox form__label--bold">
				<input className="
							visually-hidden 
							form__input form__input--checkbox
							" type="checkbox" name="IMEI_MATCHES" onClick={enable}/>
					<span className="form__checkbox-custom"></span>
					Внешний IMEI есть и совпадает с внутренним
			</label>
        </div>
    )
}

export default CheckBoxImei;