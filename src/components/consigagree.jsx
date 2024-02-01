import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Config from "./variables";
import InputMask from 'react-input-mask';

const ConsigAgree = ({props, onExit, onNextStep}) => {
	const [fio, setFio] = useState({
		name: '',
		family: '',
		otche: '',
		date: 0,
		phone: 0,
		place: '',
		email: '',
	});
	const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(props),			
		}
	});

	axios.post(`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
		productData);


	 const getFIO = () => {
		setProductData({
			post: {
				PRODUCT_DATA: JSON.stringify(props),
				CLIENT_FIO: JSON.stringify(fio),
			}	
			})
		const data = axios.post(
				`${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			 	productData
			 );
			 data.then((value) => {
				onNextStep({
					current: {
						number: 11,
						name: 'contract'
					}
				}, fio)
			 })
	};

	const aborted = () => {
		const data = axios.post(
		   `${Config.development}/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=setProductData`,
			{
				post: {
					PRODUCT_DATA: JSON.stringify(props),
					TRADEIN_STATUS:	'Отказ при подписании договора',			
				}
			}
	   );
	   data.then((value) => {
		if(value.data.status === "success") {
			Cookies.remove('PRODUCT_SESSID');
			onExit();
		}
	});	
	   onExit();
   };	


    return(
        <div class="flex justify-center">
			<div class="flex justify-center lg:w-[1920px] lg:h-[1146px]">
				<div class="w-full h-full mt-10 p-4 lg:p-0 lg:w-[567px] lg:h-[669px] lg:mt-[127px]">
					<div class="mb-4 tracking-tight text-gray-900 text-[30px] lg:text-[44px]">
						<h1>
							Заполните информацию для Договора Консигнации.
						</h1>					
					</div>
					<div class="mb-6">
						<h2 class="text-[22px] text-gray-500">
							Укажите данные клиента
						</h2>
					</div>
					<div class="w-full lg:w-[522px] h-[68px] mb-6">
						<input
							class="w-full h-full border-2 border-green-500 text-[20px] rounded-2xl" 
							type="text" 
							name="SURNAME" 
							placeholder="Фамилия"
							required onChange={event => setFio({...fio, family: event.target.value})}
						/>	
					</div>
					<div class="w-full lg:w-[522px] h-[68px] mb-6">
						<input
							class="w-full h-full border-2 border-green-500 text-[20px] rounded-2xl" 
							type="text" 
							name="NAME" 
							placeholder="Имя" 
							required onChange={event => setFio({...fio, name: event.target.value})}
						/>
					</div>
					<div class="w-full lg:w-[522px] h-[68px] mb-6">
						<input
							class="w-full h-full border-2 border-green-500 text-[20px] rounded-2xl"
							type="text" 
							name="PATRONYMIC" 
							placeholder="Отчество"
							required onChange={event => setFio({...fio, otche: event.target.value})}
						/>					
					</div>
					<div class="w-full lg:w-[522px] h-[68px] mb-6">
						<InputMask
							class="w-full h-full border-2 border-green-500 text-[20px] rounded-2xl" 
							mask="+7(999)-999-99-99" 
							type="text"
							placeholder="Контактный телефон" 
							onChange={event => setFio({...fio, phone: event.target.value})}
						/>
					</div>
					<div class="flex justify-between w-full lg:w-[522px] h-[68px]">
						<div class="flex justify-center rounded-2xl lg:w-[257px] lg:h-[68px] bg-green-500">
							<button
								class="text-white p-4 lg:p-0 lg:text-[20px]" 
								type="submit"
								onClick={getFIO}
							>
								Подписать договор
							</button>
						</div>
						<div class="flex justify-center rounded-2xl lg:w-[257px] lg:h-[68px] bg-red-500">
							<button
								class="text-white p-4 lg:p-0 lg:text-[20px]"
								type="button"
								onClick={aborted}
							>
								Отменить проверку
							</button>
						</div>
					</div>
					{/* <div>
						<InputMask 
							mask="99/99/9999" 
							type="text" name="DATE_OF_BIRTH" 
							placeholder="Дата рождения" 
								required onChange={event => setFio({...fio, date: event.target.value})}
						/>
						<InputMask 
							type="text"
							placeholder="Место рождения" 
							onChange={event => setFio({...fio, place: event.target.value})}
						/>
						<InputMask  
							placeholder="email"
							onChange={event => setFio({...fio, email: event.target.value})}/>
					</div> */}
				</div>
			</div>
        </div>
    )
}

export default ConsigAgree;