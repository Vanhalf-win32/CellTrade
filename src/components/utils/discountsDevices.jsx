import React, { useEffect, useState } from "react";

const DiscountsDevices = ({discountsDevices}) => {
	console.log('TEST',discountsDevices);
	const [gradeB, setGradeB] = useState('Дотация В');
	const [gradeC, setGradeC] = useState('Дотация C');
	const [gradeD, setGradeD] = useState('Дотация D');

	useEffect(() => {
		if(discountsDevices.data.data.GRADE_PRICE_D || 
			discountsDevices.data.data.GRADE_PRICE_D !== undefined ||
			discountsDevices.data.data.ADDITIONAL_DISCOUNTS[0].D !== undefined
		) {
			setGradeB('');
			setGradeC('');
		} else{
			setGradeD('');
		};
	},[]);



    return(
        <div className="form__container form__container--center">
          	<table className="table">
				<caption className="table__caption">
					Дополнительные скидки на покупку следующих устройств:
				</caption>
				<thead className="table__head">
					<tr className="table__row">
						<th className="table__header">Устройство</th>
						{gradeC ? <th className="table__header">{gradeC}</th> : null}
						{gradeB ? <th className="table__header">{gradeB}</th> : null}
						{gradeD ?  <th className="table__header">{gradeD}</th> : null}
					</tr>
				</thead>
				<tbody className="table__body">
					<tr className="table__row">
                        {
							discountsDevices.data.data.ADDITIONAL_DISCOUNTS.map((item, index) => (
								<>
									<td key={index} className="table__data">
										{item.device}
									</td>
									{item.C || item.C !== undefined ?  <td className="table__data">
										{item.C}
									</td> : null }
									{item.B || item.B !== undefined ? <td className="table__data">
										{item.B}
									</td> : null}
									{item.D || item.D !== undefined ? <td className="table__data">
										{item.D} 
									</td> : null}
								</>
                            )) 
                        }
					</tr>
				</tbody>
			</table>
        </div>
    );
};

export default DiscountsDevices;
