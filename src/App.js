import React, { useEffect, useState } from 'react';
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
import CheckPhoto from './components/checkphoto';
import Verification from './components/verification';
import TotalDiscount from './components/totaldiscount';
import PickUpDevice from './components/pickupdevice';
import ConsigAgree from './components/consigagree';
import Contract from './components/contract';
import Signed from './components/signed';


export default function App() {

  const [productData, setProductData] = useState({
		post: {
			"PRODUCT_DATA": JSON.stringify(),	
		}
	});
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

  console.log(Cookies.get('PRODUCT_SESSID'));

  useEffect(() => {
     const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData',
      {});
      data.then((value) => {
        console.log('RESPONSE_PDD',value);
          if(value.data.data.STATUS === false) {
            Cookies.remove('PRODUCT_SESSID');
          } else {
            setProductDataDefault(JSON.parse(JSON.parse(value.data.data.PRODUCT_DATA)));
            console.log("COOKIES", JSON.parse(value.data.data.PRODUCT_DATA)); 
          }
      });
  },[])
 
  // add FINAL_CONDITION//TODO::

  useEffect(() => {
      if (productDataDefault.steps.current.number !== 0) {
        setStep(productDataDefault.steps.current.number)
      } 
  },[productDataDefault])


  console.log('DEFAULT', productDataDefault);

  const onCheckIMEI = (checkImei) => {
    setStep(step + 1);
    setProductDataDefault(checkImei);
  };
  
  const onCheckPhone = (steps) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps}));
  };

  const onCheckDisplay = (grade) => {
    setStep(step + 1);
    setProductDataDefault(grade);
  }
  const onPrelimDiscount = (steps) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps}));
  }
  const onCheckDefect = (steps, grade) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps, grade}));
  }
  const onCheckPhoto = (steps) => {
    setStep(step + 1);
    setProductDataDefault(steps);
  }

  const onVerifacation = (grade, steps, bot) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, grade, steps, bot}));
  }
  const onBackStep = () => {
    setStep(step - 1);
  } 
  const onTotalDiscount = (steps, price) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps, price}))
  }

  const onPickUpDevice = (steps) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps}))
  }

  const onConsigAgree= (steps, fio) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps, fio}));
  }
  const onContract = (steps) => {
    setStep(step + 1);
    setProductDataDefault((oldProductDataDefault) => ({...oldProductDataDefault, steps}));
  }
  const onExit = () => {
    setStep(1); 
  }



  return( 
    <div>
      <Header/>
        {step === 1 ? <CheckImei onNextStep={onCheckIMEI}/> : null}
        {step === 2 ? <CheckPhone props={productDataDefault} onExit={onExit} onNextStep={onCheckPhone}/> : null}
        {step === 3 ? <CheckDisplay props={productDataDefault} onNextStep={onCheckDisplay}/> : null}
        {step === 4 ? <PrelimDiscount props={productDataDefault} onExit={onExit} onNextStep={onPrelimDiscount}/> : null}
        {step === 5 ? <CheckDefect props={productDataDefault} onExit={onExit} onNextStep={onCheckDefect}/> : null}
        {step === 6 ? <CheckPhoto props={productDataDefault} onNextStep={onCheckPhoto}/> : null}
        {step === 7 ? <Verification props={productDataDefault} onNextStep={onVerifacation} onBackStep={onBackStep}/> : null}
        {step === 8 ? <TotalDiscount props={productDataDefault} onExit={onExit} onNextStep={onTotalDiscount} /> : null} 
        {step === 9 ? <PickUpDevice props={productDataDefault} onExit={onExit} onNextStep={onPickUpDevice} /> : null}
        {step === 10 ? <ConsigAgree props={productDataDefault} onExit={onExit} onNextStep={onConsigAgree} /> : null}  
        {step === 11 ? <Contract props={productDataDefault} onNextStep={onContract} /> : null}
        {step === 12 ? <Signed props={productDataDefault} onNextStep={onExit} /> : null}
      <Footer/>
    </div>
	)  
};