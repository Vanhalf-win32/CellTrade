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
  const [reshoots, setReshoots] = useState('')

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

  useEffect(() => {
     const data = axios.post('http://localhost/bitrix/services/main/ajax.php?mode=class&c=voidvn%3Atradein&action=getProductData',
      {});
      data.then((value) => {
          if(value.data.data.STATUS === false) {
            Cookies.remove('PRODUCT_SESSID');
          } else {
            setProductDataDefault(JSON.parse(value.data.data.PRODUCT_DATA));
          }
      });
  },[])
 

  useEffect(() => {
      if (productDataDefault.steps.current.number !== 0) {
        setStep(productDataDefault.steps.current.number)
      } 
  },[productDataDefault])


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
    setReshoots('Переснимите фото')
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
  const onSigned = () => {
    setStep(1);
  }



  return( 
    <div>
      <Header/>
        {step === 1 ? <CheckImei onNextStep={onCheckIMEI}/> : null}
        {step === 2 ? <CheckPhone props={productDataDefault} onNextStep={onCheckPhone}/> : null}
        {step === 3 ? <CheckDisplay props={productDataDefault} onNextStep={onCheckDisplay}/> : null}
        {step === 4 ? <PrelimDiscount props={productDataDefault} onNextStep={onPrelimDiscount}/> : null}
        {step === 5 ? <CheckDefect props={productDataDefault} onNextStep={onCheckDefect}/> : null}
        {step === 6 ? <CheckPhoto props={productDataDefault} reshoots={reshoots} onNextStep={onCheckPhoto}/> : null}
        {step === 7 ? <Verification props={productDataDefault} setReshoots={setReshoots} onNextStep={onVerifacation} onBackStep={onBackStep}/> : null}
        {step === 8 ? <TotalDiscount props={productDataDefault} onNextStep={onTotalDiscount} /> : null} 
        {step === 9 ? <PickUpDevice props={productDataDefault} onNextStep={onPickUpDevice} /> : null}
        {step === 10 ? <ConsigAgree props={productDataDefault} onNextStep={onConsigAgree} /> : null}  
        {step === 11 ? <Contract props={productDataDefault} onNextStep={onContract} /> : null}
        {step === 12 ? <Signed props={productDataDefault} onNextStep={onSigned} /> : null}
      <Footer/>
    </div>
	)  
};