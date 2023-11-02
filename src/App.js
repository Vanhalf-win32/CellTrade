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
  const onNextStep = () => setStep(step + 1);

  
  return( 
    <div>
      <Header/>
        {step === 1 ? <CheckPhone onNextStep={onNextStep}/> : null}
        {step === 2 ? <CheckPhone onNextStep={onNextStep}/> : null}
        {step === 3 ? <CheckDisplay onNextStep={onNextStep}/> : null}
      <Footer/>
    </div>
	)  
};