import React from "react";
import img from "../img/download.png";
import Cookies from 'js-cookie';


const Header = ({onExit}) => {

	const aborted = () => {
		Cookies.remove('PRODUCT_SESSID');
		onExit();
   };
	
    return(
			    <div class="flex justify-between mt-3 pb-3 border-b-2 border-green-500">
				    <div class="ml-15">
						<img
                            src={img}
                            alt="Логотип"
                            width="250"
                            height="75"
						/>
			        </div>
					<div class="flex flex-col justify-center mr-10">
						<p>
                            Бесплатная линия поддержки (круглосуточно)
                        </p>
						<p class="">
                             +7 (800) 302-43-53 / +7 (495) 175-43-33
                        </p>
					</div>
				</div>
    );
};


export default Header;
