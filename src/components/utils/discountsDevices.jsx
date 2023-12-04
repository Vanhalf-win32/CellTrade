import React from "react";

const DiscountsDevices = ({devicesDiscounts}) => {
    console.log('DD',devicesDiscounts);
    return(
        <div className="form__container form__container--center">
          	<table className="table">
				<caption className="table__caption">
					Дополнительные скидки на покупку следующих устройств:
				</caption>
				<thead className="table__head">
					<tr className="table__row">
						<th className="table__header">Устройство</th>
						<th className="table__header">Дотация С</th>
						<th className="table__header">Дотация В</th>
						<th className="table__header">Дотация D</th>
					</tr>
				</thead>
				<tbody className="table__body">
					<tr className="table__row">
                        { typeof devicesDiscounts.data.data.ADDITIONAL_DISCOUNTS === 'object' ? 
                          devicesDiscounts.data.data.ADDITIONAL_DISCOUNTS.map((key) => (
                                <td className="table__data">
                                !!!
                                </td>
                            )) 
                        : null}
					</tr>
				</tbody>
			</table>
        </div>
    );
};

export default DiscountsDevices;