import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import img from "../img/checkPhone.png";
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
			<div class="flex justify-center w-full h-full lg:w-[1920px] lg:h-[1146px]">
				<div class="flex flex-col p-4 lg:p-0 lg:flex-row">
					<div class="w-full h-full mt-10 lg:mt-[127px] lg:w-[480px] lg:h-[610px]">
						<img src={img} alt="Телефон"/>
					</div>
					<div class="w-full h-full lg:mt-[127px] lg:w-[563px] lg:h-[610px]">
						<div>
							<h1 class="tracking-tight text-gray-900 text-[34px] lg:text-[44px]">
								 Проверьте устройство
							</h1>
						</div>
						<div>
							<h2 class="mb-4 tracking-tight text-gray-900 text-[26px] lg:text-[30px]">
								{props.data.Description}
							</h2>
						</div>
						<div>
							{selects === 1 ? <Selects props={productDataDefault} onCheckPhone={onCheckPhone} /> : null}
						</div>	
						<div class="flex items-center mb-4">
							<input 
								class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500" 
								type="checkbox" 
								name="DESCRIPTION_MATCHES" 
								onClick={enable} />
							<span class="ml-2 text-[20px]">
								Описание совпадает по модели, памяти, цвету
							</span>
						</div>
						<div class="flex items-center mb-4">
							<input 
								class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500" 
								type="checkbox" 
								name="MOBILE_ON" 
								onClick={enable} />
							<span class="ml-2 text-[20px]">Телефон включается</span>
						</div>
						<div>
							{stateBox === 1 ? <CheckBoxImei enable={enable} /> : null}
						</div>
						<div>
							<button 
								class="flex border-2 mt-3 lg:w-34 h-10 p-2 rounded-lg bg-green-500" 
								type="button" 
								onClick={() => setGetImages(1)}
							>
							<span class="text-sm text-white">Как это проверить?</span>
							</button>								
						</div>
						<div class="lg:w-[453px] lg:h-[201px] mt-4">
							<p class="w-full h-full p-2 bg-green-200 rounded-xl text-[20px]">
								Внутренний IMEI проверяется<br/>
								по запросу <b>*#06#</b>
								<br/><br/>
								Внешний IMEI находится либо на 
								задней поверхности корпуса, либо
								на отке SIM-карты.								
							</p>
						</div>
						<div class="flex justify-around lg:w-[453px] h-[58px] mt-6">
							<button class=" w-[134px] h-full border-2 p-2 text-[20px] disabled:bg-gray-400 rounded-2xl bg-green-500 text-white" type="button" disabled={button} onClick={checkProductData}>
								Далее
							</button>
							<button class=" w-[134px] h-full border-2 p-2 text-[20px] rounded-2xl bg-red-500 text-white" type="button" onClick={aborted}>
								Отклонить
							</button>	
						</div>
						<div class="mt-6">
							{getImages === 1 ? <ReactImageGallery items={images} showPlayButton={false}/> : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



export default CheckPhone;
