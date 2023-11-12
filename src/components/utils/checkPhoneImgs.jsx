import React from "react";
import img1 from "../../img/content/imei_hint_1.jpg";
import img2 from "../../img/content/imei_hint_2.jpg";
import img3 from "../../img/content/imei_hint_3.jpg";
import img4 from "../../img/content/imei_hint_4.jpg";


const CheckPhoneImages = () => {
    return (
        <div>
       		<div className="check-it check-it--right">
				<div className="check-it__item" id="phone-android">
					<a className="form__link check-it__link smart-photo" href="img/content/imei_hint_1.jpg"
						data-caption="Разблокируйте устройство и откройте приложение <Телефон>"
						data-group="how-check"
                    >
					    <img src={img1} alt="" />
					</a>
					<div >
						<a className="smart-photo" href="../img/content/imei_hint_2.jpg"
							data-caption="Введите USSD-команду *#06#" data-group="how-check" aria-hidden="true">
							<img src={img2} alt="nuul" />
						</a>
						<a className="smart-photo" href="../img/content/imei_hint_3.jpg"
							data-caption="На дисплее отобразится внутренний IMEI устройства" data-group="how-check"
							aria-hidden="true">
							<img src={img3} alt="" />
						</a>
						<a className="smart-photo" href="../img/content/imei_hint_4.jpg"
							data-caption="Внешний IMEI указывается на устройстве где-то внешне: либо на задней крышке корпуса, либо на лотке для SIM, либо на наклейке под батареей"
							data-group="how-check" aria-hidden="true">
							<img src={img4} alt="" />
						</a>
					</div>
				</div>
			</div>
        </div>
    )
}
export default CheckPhoneImages;