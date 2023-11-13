import React, { useState } from "react";


const Selects = ({props}) => {
	console.log("PDD", props);

    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/>
				<select>
					{typeof props.data.Color === 'object' ? props.data.Color.map((color) => (
						<option key={color} value={color}>{color}</option>
					)) : <option value={props.data.Color}>{props.data.Color}</option>}
				</select>
			</label><br/>
			<label className="form__label form__label--checkbox form__label--bold">
				Select memory
				<br/>
				<select>
						{typeof props.ProdCapacity === 'object' ? props.data.ProdCapacity.map((memory) => {
							<option key={memory} value={memory}>{memory}</option>
						}) : <option key={props.data.ProdCapacity} value={props.data.ProdCapacity}>{props.data.ProdCapacity}</option>} 
				</select>
			</label>
        </div>
    );
};

export default Selects;
