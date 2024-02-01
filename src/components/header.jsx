import React from "react";
import img from "../img/download.png";
import Cookies from 'js-cookie';


const Header = ({onExit}) => {

	const aborted = () => {
		Cookies.remove('PRODUCT_SESSID');
		onExit();
   };
	
    return(
		<div class="flex justify-center">
			<div class="flex justify-center w-full h-full 2xl:w-[1920px] 2xl:h-[191px]">
				<div class="flex flex-col items-center justify-between lg:flex-row w-[1718px] h-[130px] mt-[48px] border-b-2 border-green-500">
					<div class="lg:w-[305px] lg:h-[66px]">
						<img
							class="size-100"
							src={img}
							alt="Логотип"
						/>
					</div>
					<div class="hidden lg:block">
						<p class="text-[17px]">
							Бесплатная линия поддержки (круглосуточно)
						</p>
						<p class="text-[20px]">
							<b class="">+7 (800) 302-43-53 / +7 (495) 175-43-33</b>
						</p>
					</div>
				</div>	
			</div>
		</div>

    );
};


export default Header;
