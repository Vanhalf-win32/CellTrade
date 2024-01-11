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



const CheckPhone = ({ props, onExit, onNextStep }) => {
	const images = [{ original: img1, }, { original: img2, }, { original: img3, }, { original: img4, },];
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
		if (productDataDefault.data.Manufacturer !== 'Apple') {
			setSelects(1);
		} else if (checkSpec === 3) {
			setButton('');
		} else if (productDataDefault.data.Manufacturer === 'Xiaomi') {
			setStateBox(0);
			enable();
		}
	}, [checkSpec]);

	function checkProductData() {
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS: 'precheck',
				}
			},
		);
		onNextStep({
			current: {
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
					TRADEIN_STATUS: 'rejectedatfirststep',
				}
			}
			,
		);
		data.then((value) => {
			if (value.data.status === "success") {
				Cookies.remove('PRODUCT_SESSID');
				onExit();
			}
		});
	};

	return (
		<div class="flex justify-center">
			<div>
				<div>
					<img src={img} alt="Телефон" width="450" height="450" />
				</div>
			</div>
			<div>
				<div class="flex flex-col justify-center">
					<h1 class="flex justify-center mt-20 tracking-tight text-gray-900 lg:text-5xl"> Проверьте устройство</h1>
					<h2 class="flex justify-center mt-10 mb-4 tracking-tight text-gray-900 lg:text-4xl"> {props.data.Description}</h2>
					{selects === 1 ? <Selects props={productDataDefault} onCheckPhone={onCheckPhone} /> : null}
					<div class="flex flex-col items-start">
						<label class="inline-flex mt-2 justify-center items-center rounded">
							<input class="w-6 h-6 rounded-full text-green-500 focus:ring-green-500" type="checkbox" name="DESCRIPTION_MATCHES" onClick={enable} />
							<span class="ml-2">Описание совпадает по модели, памяти, цвету</span>
						</label>
						<label class="inline-flex mt-2 justify-center items-center rounded">
							<input class="w-6 h-6 rounded-full text-green-500 focus:ring-green-500" type="checkbox" name="MOBILE_ON" onClick={enable} />
							<span class="ml-2">Телефон включается</span>
						</label>
					</div>
					{stateBox === 1 ? <CheckBoxImei enable={enable} /> : null}
					{getImages === 1 ? <ReactImageGallery items={images} showPlayButton={false} /> : null}
					<div class="mt-2">
						<label>
							<button class=" flex border-2 mt-3 w-34 h-10 p-2 rounded-lg  bg-green-500" type="button" onClick={() => setGetImages(1)}>
								<span class="text-sm">Как это проверить?</span>
							</button>								
						</label>
					</div>
						<div class="flex flex-col justify-center mt-5 bg-green-300 rounded-xl w-80">
							<p class="p-2">
								Внутренний IMEI проверяется <br/> по запросу
								<b>*#06#</b>
							</p>
							<p class="p-2 ">
								Внешний IMEI находится либо на <br/>
								задней поверхности корпуса, либо<br/> 
								на отке SIM-карты.								
							</p>
						</div>
					<div class="flex justify-around">
						<label>
							<button class="border-2 w-48 mt-5 p-2 disabled:bg-gray-400 rounded-2xl bg-green-500" type="button" disabled={button} onClick={checkProductData}>
								Принять
							</button>						
						</label>
						<label>
							<button class="border-2 w-48 mt-5 p-2 rounded-2xl bg-red-500" type="button" onClick={aborted}>
								Отклонить
							</button>						
						</label>						
					</div>

				</div>
			</div>
		</div>
	);
};



export default CheckPhone;
