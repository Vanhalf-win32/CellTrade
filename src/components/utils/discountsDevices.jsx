import React, { useEffect, useState } from "react";

const DiscountsDevices = ({discountsDevices}) => {

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
        <div class="w-full h-full lg:w-[800px] lg:h-[140px] ">
			<div class="flex justify-end">
				<p class="lg:w-[100px] lg:h-[30px] lg:text-[20px] mr-4">
					{gradeC ? <p>{gradeC}</p> : null}
				</p>
				<p class="lg:w-[100px] lg:h-[30px] lg:text-[20px] mr-4">
					{gradeB ? <p>{gradeB}</p> : null}
				</p>
				<p class="lg:w-[100px] lg:h-[30px] lg:text-[20px] mr-1">
					{gradeD ? <p>{gradeD}</p> : null}
				</p>
			</div>
			<div class="flex items-center justify-between w-full h-14 lg:w-[795px] lg:h-[68px] border-2 border-green-500 rounded-2xl mt-2">
				{
					discountsDevices.data.data.ADDITIONAL_DISCOUNTS.map((item, index) => (
						<div class="flex items-center justify-between w-full h-full lg:w-[795px] lg:h-[68px]">
							<div class="lg:text-[20px] ml-4" key={index}>
								<p>
									{item.device}									
								</p>									
							</div>
							<div class="flex">
								<div class="flex justify-center mr-2 w-[50px] lg:justify-center  lg:mr-0 lg:w-[100px] lg:h-[30px] lg:text-[20px]">
									{item.C || item.C !== undefined ? <p>{item.C} ₽</p> : null }
								</div>
								<div class="flex justify-center mr-2 w-[50px] lg:justify-center  lg:mr-0 lg:w-[100px] lg:h-[30px] lg:text-[20px] border-l-2 border-l-green-500">
									{item.B || item.B !== undefined ? <p>{item.B} ₽</p> : null}
								</div>
								<div class="flex justify-center w-[50px] lg:justify-center lg:mr-4 lg:w-[100px] lg:h-[30px] lg:text-[20px] border-l-2 border-l-green-500 ">
									{item.D || item.D !== undefined ? <p>{item.D} ₽</p> : null}
								</div>									
							</div>
						</div>
                    )) 
                }
			</div>
        </div>
    );
};

export default DiscountsDevices;
