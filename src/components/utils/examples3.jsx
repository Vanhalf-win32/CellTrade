import React from "react";
import img1 from '../../img/content/remaining_picture.jpg';
import img2 from '../../img/content/bad_pixels_samsung.jpg';
import img3 from '../../img/content/samsung_lines2.jpg';
import img4 from '../../img/content/lines_samsung.jpg';
import img5 from '../../img/content/flaws_samsung.jpg';
import img6 from '../../img/content/samsung_flaws2.jpg';
import img7 from '../../img/content/samsung_flaws3.jpg';




const Examples3 = () => {
    return(
        <div style={{display: "flex", alignItems: "center"}}>
			<img style={{ width: '360px', }} src={img1} alt="" />
    		<img style={{ width: '360px', }} src={img2} alt="" />
            <img style={{ width: '360px', }} src={img3} alt="" />
    		<img style={{ width: '360px', }} src={img4} alt="" />
            <img style={{ width: '360px', }} src={img5} alt="" />
    		<img style={{ width: '360px', }} src={img6} alt="" />
            <img style={{ width: '360px', }} src={img7} alt="" />
	    </div>
    )
}

export default Examples3;