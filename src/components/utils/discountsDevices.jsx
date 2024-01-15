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
        <div>
          	<table>
				<caption>
					Дополнительные скидки на покупку следующих устройств:
				</caption>
				<thead>
					<tr>
						<th>Устройство</th>
						{gradeC ? <th>{gradeC}</th> : null}
						{gradeB ? <th>{gradeB}</th> : null}
						{gradeD ?  <th>{gradeD}</th> : null}
					</tr>
				</thead>
				<tbody>
					<tr>
                        {
							discountsDevices.data.data.ADDITIONAL_DISCOUNTS.map((item, index) => (
								<>
									<td key={index}>
										{item.device}
									</td>
									{item.C || item.C !== undefined ?  <td>
										{item.C}
									</td> : null }
									{item.B || item.B !== undefined ? <td>
										{item.B}
									</td> : null}
									{item.D || item.D !== undefined ? <td>
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
