import React, { useState } from "react";


const Selects = ({props, onCheckPhone}) => {
	console.log('PDD', props);

    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/>
				<select>
					{typeof props.data.COLORS === 'object' ? props.data.COLORS.map((color) => (
						<option key={color} value={color} 
						onClick={ (event) => {onCheckPhone({
							COLORS: event.target.value,
						})}}> 
							{color}
						</option>
					)) : <option value={props.data.COLORS}>{props.data.COLORS}</option>}
				</select>
			</label><br/>
			<label className="form__label form__label--checkbox form__label--bold">
				Select memory
				<br/>
				<select>
						{typeof props.data.MEMORY === 'object' ? props.data.MEMORY.map((memory) => {
							<option key={memory} value={memory}>{memory} 
							onClick={ (event) => {onCheckPhone({
								ProdCapacity: event.target.value,
							})}}
							</option>
						}) : <option key={props.data.MEMORY} value={props.data.MEMORY}>{props.data.MEMORY}</option>} 
				</select>
			</label>
        </div>
    );
};

export default Selects;
