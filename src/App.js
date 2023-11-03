import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './css/mixins.css';
import './css/style.css';
import './css/variables.css';
import './css/blocks/footer.css';
import CheckImei from './components/checkimei';
import CheckPhone from './components/checkphone';
import CheckDisplay from './components/checkdisplay';


export default function App() {

  const [step, setStep] = useState(1);
  const [productDataDefault, setProductDataDefault] = useState({
		data: {
			Color: '',
			Description: '',
			IMEI: 0,
			Model: '',
			ProdCapacity:'',
		},
		grade: {
      Customer: '',
      Final: '',
      Limit: ''
    },
		namesNeedPhotos: [],
		steps: {
			current: {
				number: 0,
				name: ""
			},
		}
	});

  const onCheckIMEI = (checkIMEI) => {
    setStep(step + 1);
    setProductDataDefault(checkIMEI);
  };
  console.log(productDataDefault);

  const onCheckPhone = (checkPhone) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, checkPhone }));
  };




  
  return( 
    <div>
      <Header/>
        {step === 1 ? <CheckImei onNextStep={onCheckIMEI}/> : null}
        {step === 2 ? <CheckPhone props={productDataDefault} onNextStep={onCheckPhone}/> : null}
      <Footer/>
    </div>
	)  
};