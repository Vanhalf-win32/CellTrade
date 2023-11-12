import React from "react";
import img1 from '../../img/content/samsung_small_scratches1.jpg';
import img2 from '../../img/content/samsung_big_scratches1.jpg';



const Examples2 = () => {
    return(
        <div style={{display: "flex"}}>
			<img style={{ width: '400px', }} src={img1} alt="" />
    		<img style={{ width: '400px', }} src={img2} alt="" />
	    </div>
    )
}

export default Examples2;