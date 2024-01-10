import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import img from "../img/content/checkdevice.png";
import axios from "axios";
import Selects from "./utils/selects";
import CheckBoxImei from "./utils/checkboxImei";
import Config from "./variables";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../img/content/imei_hint_1.jpg";
import img2 from "../img/content/imei_hint_2.jpg";
import img3 from "../img/content/imei_hint_3.jpg";
import img4 from "../img/content/imei_hint_4.jpg";



const CheckPhone = ({props, onExit, onNextStep}) => {
	const images = [{original: img1,},{original: img2,},{original: img3,},{original: img4,},];
	const [stateBox, setStateBox] = useState(1);
	const [productDataDefault, setProductDataDefault] = useState(props);
	const [getImages, setGetImages] = useState(0);
	const [selects, setSelects] = useState(0);
	const [checkSpec, setCheckSpec] = useState(0);
	const [button, setButton] = useState('disabled');

	const onCheckPhone = (getSpecs) => {
		setProductDataDefault(getSpecs);
	}
	const enable = () => {
		setCheckSpec(checkSpec + 1);
	}
	useEffect(() => {
		if(productDataDefault.data.Manufacturer !== 'Apple') {
			setSelects(1);
		} else if(checkSpec === 3) {
		setButton('');
		} else if(productDataDefault.data.Manufacturer === 'Xiaomi') {
			setStateBox(0);
			enable();
		}
	},[checkSpec]);
	
	 function checkProductData() {
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'precheck',			
				}
			},
		);
		onNextStep({
			current:{
				number: 3,
				name: 'checkDisplay',
			}
		});
	}

	const aborted = () => {
		 const data = axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'rejectedatfirststep',			
				}
			}
		,
		);
		data.then((value) => {
			if(value.data.status === "success") {
				Cookies.remove('PRODUCT_SESSID');
				onExit();
			}
		});	
	};

    return(
        <div>
			<div>
				<div>
					<div>
						<div>
							<div>
								<img src={img} alt="Телефон" width="450" height="450"/>
							</div>
						</div>
							<div>
								<div>
										<h1> Проверьте устройство</h1>
										<h2> {props.data.Description}</h2>
										<div>
											<p></p>
										</div>
										{selects === 1 ? <Selects props={productDataDefault} onCheckPhone={onCheckPhone}/> : null}
										<label>
											<input type="checkbox" name="DESCRIPTION_MATCHES" onClick={enable}/>
											<span>Описание совпадает по модели, памяти, цвету</span>
										</label>
										<label>
											<input type="checkbox" name="MOBILE_ON" onClick={enable}/>
											<span>Телефон включается</span>
										</label>
										{stateBox === 1 ? <CheckBoxImei enable={enable}/> : null}
										{getImages === 1 ? <ReactImageGallery 
															items={images}
															showPlayButton={false}
															/> : null}
										<div>
											<button>"
												onClick={() => setGetImages(1)}>
												Как это проверить?
											</button>
											<div>
												<p>
													Внутренний IMEI проверяется по запросу
													<a href="tel:*#06#">*#06#</a>
													Внешний IMEI находится либо на задней поверхности
													корпуса, либо на отке SIM-карты.
												</p>
											</div>
										</div>
										<button type="button"
												disabled={button} onClick={checkProductData}>
											Принять
										</button>
										<button type="button"
												onClick={aborted}>
											Отклонить
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					
    	</div>
    );
};



export default CheckPhone;
