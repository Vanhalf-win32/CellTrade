import React from "react";
import img from "../img/download.png";
import Cookies from 'js-cookie';


const Header = ({onExit}) => {

	const aborted = () => {
		Cookies.remove('PRODUCT_SESSID');
		onExit();
   };
	
    return(
			    <div class="flex justify-between mt-3 ml-40 mr-40 pb-3 border-b-2 border-green-500">
				    <div class="ml-28">
						<img
                            src={img}
                            alt="Логотип"
                            width="270"
                            height="75"
						/>
			        </div>
					<div class="flex flex-col justify-center mr-10">
						<p>
                            Бесплатная линия поддержки (круглосуточно)
                        </p>
						<p class="text-lg">
                             <b class="">+7 (800) 302-43-53 / +7 (495) 175-43-33</b>
                        </p>
					</div>
				</div>
    );
};


export default Header;
