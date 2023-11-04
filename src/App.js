import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/header';
import Footer from './components/footer';
import './css/mixins.css';
import './css/style.css';
import './css/variables.css';
import './css/blocks/footer.css';
import CheckImei from './components/checkimei';
import CheckPhone from './components/checkphone';
import CheckDisplay from './components/checkdisplay';
import axios from 'axios';
import PrelimDiscount from './components/prelimdiscount';
import CheckDefect from './components/checkdefect';


export default function App() {
  // console.log(Cookies.get('PRODUCT_SESSID'));
  // const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData',
  //   {});
  //   data.then((value) => {
  //     console.log(value);
  //     if(value.data.data.STATUS === false) {
  //       Cookies.remove('PRODUCT_SESSID');
  //     }
  //     console.log(JSON.parse(JSON.parse(value.data.data.PRODUCT_DATA))); //TODO::
  //   })

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

  console.log('Default', productDataDefault);

  const onCheckIMEI = (checkIMEI) => {
    setStep(step + 1);
    setProductDataDefault(checkIMEI);
  };
  

  const onCheckPhone = (steps) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps}));
  };

  const onCheckDisplay = (grade) => {
    setStep(step + 1);
    setProductDataDefault(grade);
  }

  


  return( 
    <div>
      <Header/>
      <br/>
      <br/>
        {step === 1 ? <CheckImei onNextStep={onCheckIMEI}/> : null}
        {step === 2 ? <CheckPhone props={productDataDefault} onNextStep={onCheckPhone}/> : null}
        {step === 3 ? <CheckDisplay props={productDataDefault} onNextStep={onCheckDisplay}/> : null}
        {productDataDefault.grade.CustomerCondition === 'D'? <CheckDefect props={productDataDefault} onNextStep={onCheckDisplay}/> : null}
        {productDataDefault.grade.CustomerCondition === 'C' ? <PrelimDiscount props={productDataDefault} onNextStep={onCheckDisplay}/> : null}
        <br/>
      <Footer/>
    </div>
	)  
};