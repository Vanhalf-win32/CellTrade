import React, { useState } from "react";


const Selects = ({props}) => {
	const [test, setTest] = useState(props)
	console.log(test)


    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				{/* <br/><select>
					{typeof test.Color.map ? test.Color.map((color) => (
						<option key={color} value={color}>{color}</option>
					)) : <option value={test.Color}>{test.Color}</option>}
					</select> */}
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
