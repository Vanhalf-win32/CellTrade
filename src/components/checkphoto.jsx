import React, { useEffect, useState } from "react";
import img from "../img/qr-code.png";
import axios from "axios";
import Config from "./variables";
import img_mob from "../img/mobile.png";
import img_pc from "../img/desktop.png";



const CheckPhoto = ({props, reshoots, onNextStep}) => {
	
	const [qrCode, setQrCode] = useState('');
	const [statusBot, setStatusBot] = useState('');
	const [link, setLink] = useState('');
	const [productDataDefault, setProductDataDefault] = useState({props});
	const [productData, setProductData] = useState({
		post: {
			PRODUCT_DATA: JSON.stringify(props),	
		}
	});
	axios.post(
		`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData
	);

	useEffect(() => {
		const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=generateQRCode`,{});
		data.then((value) => {
			setQrCode(value.data.data.QRCode);
			setLink(value.data.data.link);
		})
	},[]);

	useEffect(() => {
		setProductDataDefault({...props, 
			steps: {
				current : {
					number: 7,
					name: 'checkBOT',
				}
			}
		});	
	},[qrCode]);
	
	useEffect(() => {
		const interval = setInterval(() => {
			const data = axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData`,{});
			data.then((value) => {
				if(value.data.data.PHOTOS_UPLOADED_FLAG === 'Y') {
					onNextStep(props);
					clearInterval(interval);
				}
			})
		}, 15000);
	},[productDataDefault]);
	
    return (
			<div class="flex justify-center">
				<div class="w-[560px] h-[671px] mt-[127px]">
					<div class="w-[471px] h-[107px]">
						<h1 class="tracking-tight text-gray-900 text-[40px]">
							Проверка фотографий устройства
						</h1>						
					</div>
					<div class=" mt-4 mb-4 text-red-500 text-[20px]">
						<h2 class="text">
							{reshoots}
							{statusBot}
						</h2>						
					</div>
					<div class="flex items-center w-[471px] h-[58px] mb-4">
						<img alt="mobile" width={33} height={53} src={img_mob}/>
						<p class="w-[222px] h-[58px] ml-4 text-green-500 text-[20px]">
							Если Вы загружаете фото с телефона
						</p>
					</div>
					<div class="flex items-center w-[471px] h-[107px]">
						<p>Отсканируй QR-код</p>
						<img alt="qrcode" class="w-[283px] h-[90px] ml-3" src={qrCode}></img>
					</div>
					<div class="flex items-center w-[471px] h-[58px] mt-4">
						<img alt="pc" width={54} height={52} src={img_pc}/>
						<p class="w-[222px] h-[58px] ml-3 text-green-500 text-[20px]">
							Если Вы загружаете фото с телефона
						</p>
					</div>
					<div class="w-[442px] h-[87px] mt-6">
						<p>
							Перейдите по прямой ссылке:<br/>
							<b>https://dev-celltrade.ru/tradein/upload/?sessid=345345345</b>
						</p>
					</div>
				</div>
			</div>				
    );
};

export default CheckPhoto;