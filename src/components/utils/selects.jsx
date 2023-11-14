import React, { useState } from "react";


const Selects = ({props, onCheckPhone}) => {
	const [test, setTest] = useState({
		"status": "success",
		"data": {
			"COLORS": [
				"carbon_black",
				"glacier_blue"
			],
			"MEMORY": [
				"64",
				"128",
			],
			"DEVICE_TYPE": "mobile_phone",
			"DEVICE_OS": "Android",
			"STATUS": true
		},
		"errors": []
	});
 	const [productDataDefault, setProductDataDefault] = useState(test);
	console.log('PDD',productDataDefault)

	const setSpecColors = (set) => {
		setProductDataDefault({...productDataDefault, data:{
			COLORS: set,
			DEVICE_OS: productDataDefault.data.DEVICE_OS,
			DEVICE_TYPE: productDataDefault.data.DEVICE_TYPE,
			STATUS: productDataDefault.data.STATUS,
			MEMORY: productDataDefault.data.MEMORY,
		}})
	}

	const setSpecMemory = (set) => {
		setProductDataDefault({...productDataDefault, data:{
			COLORS: productDataDefault.data.COLORS,
			DEVICE_OS: productDataDefault.data.DEVICE_OS,
			DEVICE_TYPE: productDataDefault.data.DEVICE_TYPE,
			STATUS: productDataDefault.data.STATUS,
			MEMORY: set,
		}})
	}

    return (
        <div>
     		<label className="form__label form__label--checkbox form__label--bold">
				Select colors 
				<br/>
				<select onClick={(event) => {setSpecColors(event.target.value)}}>
					{ typeof productDataDefault.data.COLORS === 'object' 
						? 
						productDataDefault.data.COLORS.map((color) => (
							<option key={color} value={color}>
								{color}
							</option>
						)) 
						: 
						<option value={productDataDefault.data.COLORS}>{productDataDefault.data.COLORS}</option>}
				</select>
			</label><br/>
			<label className="form__label form__label--checkbox form__label--bold">
				Select memory
				<br/>
				<select onClick={(event) => {setSpecMemory(event.target.value)}}>
					{typeof productDataDefault.data.MEMORY === 'object' 
						? 
						productDataDefault.data.MEMORY.map((memory) => (
							<option key={memory} value={memory}>{memory}gb</option>
						)) 
						: 
						<option key={productDataDefault.data.MEMORY} value={productDataDefault.data.MEMORY}>{productDataDefault.data.MEMORY}gb</option>
					} 
				</select>
			</label>
        </div>
    );
};

export default Selects;
