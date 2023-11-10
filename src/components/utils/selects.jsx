import React from "react";


const Selects = ({props}) => {
    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/><select>
						<option value="colors">Black</option>
						<option value="someOption">White</option>
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
