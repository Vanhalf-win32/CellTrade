import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import Config from "./variables";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from '../img/content/samsung_cracked_screen2.jpg';
import img2 from '../img/content/samsung_otsloenie1.jpg';
import img3 from '../img/content/samsung_small_scratches1.jpg';
import img4 from '../img/content/samsung_big_scratches1.jpg';
import img5 from '../img/content/remaining_picture.jpg';
import img6 from '../img/content/bad_pixels_samsung.jpg';
import img7 from '../img/content/samsung_lines2.jpg';
import img8 from '../img/content/lines_samsung.jpg';
import img9 from '../img/content/flaws_samsung.jpg';
import img10 from '../img/content/samsung_flaws2.jpg';
import img11 from '../img/content/samsung_flaws3.jpg';
import img12 from '../img/content/body_cracks_big_samsung.jpg';
import img13 from '../img/content/body_cracks_small_samsung.jpg';
import img14 from '../img/content/body_small_scratches3.jpg';
import img15 from '../img/content/samsung_glass1.jpg';


const CheckDefect = ({props, onExit, onNextStep}) => {
	const imagesDisplayDamages = [{original: img1,},{original: img2,}];
	const imagesDisplaySmallScratches = [{original: img3,},{original: img4},];
	const imagesBadPixels = [{original: img5,},{original: img6,},{original: img7,},{original: img8,},{original: img9,},{original: img10,},{original: img11,},];
	const imagesBodyScrathes = [{original: img12,},{original: img13,},{original: img14,},{original: img15,},];
	const [examples ,setExamples] = useState('');
	const [condition, setCondition] = useState('');
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),
			"CUSTOMER_CONDITION" : '',		
		}
	});
	

	useEffect(() => {
		setProductData({
			post: {
				"PRODUCT_DATA": JSON.stringify(props),
				"CUSTOMER_CONDITION" : condition,		
			}
		});
	},[condition]);

	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`, productData);

	const clientAgree = () => {
		if(condition === '') {
			axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,{
				post: {
					"CUSTOMER_CONDITION" : "B",		
				}
			});
		}
		axios.post(
			`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'clientagree',	
				}
			}
		);
		if(condition === '') {
			onNextStep(
				{
					current: { 
							number: 6,
							name: 'checkPhotos',
					}
				
				}, 
				{																
					CustomerCondition: 'B',
					FinalCondition: '',
					LimitCondition: '',
				},
			)
		} else {
			onNextStep(
				{
					current: { 
							number: 6,
							name: 'checkPhotos',
					}
				
				}, 
				{																
					CustomerCondition: condition,
					FinalCondition: '',
					LimitCondition: '',
				},
			)
		}
		
	};
	
	const aborted = () => {
		const data = axios.post(
		   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'rejectedbeforephotos',			
				}
			}
	   );
	   data.then((value) => {
			if(value.data.status === "success") {
				Cookies.remove('PRODUCT_SESSID');
				onExit();
			}
		})
		onExit();
   };

    return(
		<div class=" flex justify-center">
			<div class="w-[877px] h-[537]">
				<div class="">
						<h1 class="mt-[125px] mb-4 tracking-tight text-gray-900 text-[42px]">
							Проверьте дефекты устройства
						</h1>						
				</div>
				<div class="mb-8">
					<p class=" w-[564px] h-[115px] p-3 rounded-xl bg-green-200 text-[20px]">
						Обратите внимание, что перед
						проверкой экрана с него необходимо
						снять все защитные элементы:<br/>
						<b>плёнки, защитные стекла и т.п.</b>
					</p>
				</div>
				<div class="flex justify-between mb-4 ">
					<div class="flex items-center">
						<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"
							type="checkbox" 
							name="SCREEN_IS_BROKEN"
							onClick={() => {condition === '' ? setCondition('D') : setCondition('') }}
						/>
						<span class="ml-2 text-[20px]">Экран разбит или есть отслоения</span>						
					</div>
					<button class="text-green-500 text-[20px]" onClick={() => {setExamples("displayDamage")}}>
						Примеры
					</button>	
				</div>
				<div class="flex justify-between mb-4">
					<div class="flex items-center">
						<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"
							type="checkbox" 
							name="SCREEN_WITH_IMAGE"	
							onClick={() => {condition === '' ? setCondition('C') : setCondition('') }} 
						/>
						<span class="ml-2 text-[20px]">Экран с различными повреждениями (потёртости, царапины)</span>
					</div>
					<button class="text-green-500 text-[20px]" onClick={() => {setExamples("displaySmallDefects")}}>
						Примеры
					</button>
				</div>
				<div class="flex justify-between mb-4">
					<div class="flex items-center">
						<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"
							type="checkbox" 
							name="DETECTIVE_PIXELS"	
							onClick={() => {condition === '' ? setCondition('D') : setCondition('') }} 
						/>
						<span class="ml-2 text-[20px]">Есть выгорания, битые пиксели, полосы, пятна</span>
					</div>
					<button class="text-green-500 text-[20px]" onClick={() => {setExamples("displayBadPixels")}}>
						Примеры
					</button>
				</div>
				<div class="flex justify-between mb-4">
					<div class="flex items-center">
						<input class="w-8 h-8 rounded-full text-green-500 focus:ring-green-500"
							type="checkbox" 
							name="CASE_IS_DAMAGED" 
							onClick={() => {condition === '' ? setCondition('C') : setCondition('') }}
						/>
						<span class="ml-2 text-[20px]">Корпус имеет видемые повреждения</span>	
					</div>
					<button class="text-green-500 text-[20px]"	onClick={() => {setExamples("bodyVisibleDamage")}}>
						Примеры
					</button>				
				</div>
				<div class=" flex h-[58px] mt-6">
					<button class="border-2 w-[124px] h-[58px] p-3 text-white text-[20px] rounded-2xl bg-green-500" type="button" onClick={clientAgree}>
						Далее
					</button>
					<button class="border-2 w-[162px] h-[58px] p-3 text-white text-[20px] rounded-2xl bg-red-500 ml-2" 
						type="button"
						onClick={aborted}
					>
						Отклонить
					</button>
				</div>
			</div>
			<div class="ml-4 mt-[127px]">
				<div>
					{examples === 'displayDamage' ? <ReactImageGallery items={imagesDisplayDamages} showPlayButton={false} /> : null}
					{examples === 'displaySmallDefects' ? <ReactImageGallery items={imagesDisplaySmallScratches} showPlayButton={false}/> : null}
					{examples === 'displayBadPixels' ? <ReactImageGallery items={imagesBadPixels} showPlayButton={false}/> : null}
					{examples === 'bodyVisibleDamage' ? <ReactImageGallery items={imagesBodyScrathes} showPlayButton={false}/> : null}	
				</div>

			</div>
		</div>			
	
    );
};

export default CheckDefect;