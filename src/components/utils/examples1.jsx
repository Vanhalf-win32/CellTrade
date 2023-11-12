import React from "react";
import img1 from '../../img/content/samsung_cracked_screen2.jpg';
import img2 from '../../img/content/samsung_otsloenie1.jpg';



const Examples1 = () => {
    return(
        <div style={{display: "flex"}}>
			<img style={{ width: '400px', }} src={img1} alt="" />
    		<img style={{ width: '400px', }} src={img2} alt="" />
	    </div>
    )
}

export default Examples1;