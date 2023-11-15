import React, { useEffect, useState } from "react";


const Selects = ({props, onCheckPhone}) => {


 	const [productDataDefault, setProductDataDefault] = useState(props);

	useEffect(() => {
		onCheckPhone(productDataDefault);
	},[productDataDefault]);

	const setSpecColors = (setColor) => {
		setProductDataDefault({...props, data:{
			Color: setColor,
			Description: props.data.Description,
			IMEI: props.data.IMEI,
			LoSToleNStatus: props.data.LoSToleNStatus,
			Manufacturer: props.data.Manufacturer,
			Model: props.data.Model,
			ProdCapacity: props.data.ProdCapacity,
		}})
	}

	const setSpecMemory = (setMemory) => {
		setProductDataDefault({...props, data:{
			Color: props.data.Color,
			Description: props.data.Description,
			IMEI: props.data.IMEI,
			LoSToleNStatus: props.data.LoSToleNStatus,
			Manufacturer: props.data.Manufacturer,
			Model: props.data.Model,
			ProdCapacity: setMemory,
		}});
	}

	console.log('PDD', productDataDefault);

    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/>
				<select onClick={(event) => {setSpecColors(event.target.value)}}>
					{ typeof props.data.Color === 'object' 
						? 
						props.data.Color.map((color) => (
							<option key={color} value={color}>
								{color}
							</option>
						)) 
						: 
						<option value={props.data.Color}>{props.data.Color}</option>}
				</select>
			</label><br/>
			<label className="form__label form__label--checkbox form__label--bold">
				Select memory
				<br/>
				<select onClick={(event) => {setSpecMemory(event.target.value)}}>
					{typeof props.data.ProdCapacity === 'object' 
						? 
						props.data.ProdCapacity.map((memory) => (
							<option key={memory} value={memory}>{memory}</option>
						)) 
						: 
						<option key={props.data.ProdCapacity} value={props.data.ProdCapacity}>{props.data.ProdCapacity}</option>
					} 
				</select>
			</label>
        </div>
    );
};

export default Selects;
