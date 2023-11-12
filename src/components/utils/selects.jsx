import React, { useState } from "react";


const Selects = ({props}) => {
	const [test, setTest] = useState({
		
			"status": "success",
			"data": {
				"COLORS": [
					"carbon_black",
					"glacier_blue"
				],
				"MEMORY": [
					"64"
				],
				"DEVICE_TYPE": "mobile_phone",
				"DEVICE_OS": "Android",
				"STATUS": true
			},
			"errors": []
		
	})



    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/><select>
					{typeof test.data.COLORS.map ? test.data.COLORS.map((color) => (
						<option key={color} value={color}>{color}</option>
					)) : <option value={test.data.COLORS}>{test.data.COLORS}</option>}
					</select>
			</label><br/>
			<label className="form__label form__label--checkbox form__label--bold">
				Select memory
				<br/><select>
		        		<option value="someOption">64gb</option>
						<option value="someOption">128gb</option>
					</select>
			</label>
        </div>
    );
};

export default Selects;
