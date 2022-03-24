import { useState, MouseEvent, useEffect, useRef, useLayoutEffect, MutableRefObject, RefObject  } from 'react';
import dividerMobile from '../images/pattern-divider-mobile.svg';
import dividerDesktop from '../images/pattern-divider-desktop.svg';
import dice from '../images/icon-dice.svg';
import './Advice.scss';

const Advice = () => {

    const [advice, setAdvice] = useState({id: 0, advice: ''});
    const targetRef = useRef<HTMLDivElement>(null);
    
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const size = getWindowDimensions();
    const getAdvice = async () => {
        const response = await fetch('https://api.adviceslip.com/advice')
        const data = await response.json()        
        const adv = data.slip;

        setAdvice(adv);        
    }

    useEffect(() => {
        getAdvice();
    },[])  

    return (
        <div className='advice__container'>            
            <div className='advice__id'>advice #{advice.id}</div>
            <div className='advice__text'>{advice.advice}</div>
            <div className='advice__block--divider' data-test={size.width}>                
                <img src={size.width >= 1440 ?  dividerDesktop: dividerMobile} alt='divider'  className='advice__divider'/>
            </div>

            <div className='advice__next-button' onClick={() => getAdvice()}>
                <span className='advice__next-button__container'>
                    <img src={dice} alt='divider'  className='advice__next-button__image'/>
                </span>
            </div>
        </div>
        
    );
}


// Hook
function useDimensions(targetRef: RefObject<HTMLDivElement>) {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);
  return dimensions;
}

export default Advice;