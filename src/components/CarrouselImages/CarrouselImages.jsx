import { ArrowLeft, ArrowRight } from 'lucide-react';
import './CarrouselImages.css';
import { useState } from 'react';

export function CarrouselImages({ images }) {
  const [numImg, setNumImg] = useState(0);
  const handleClick = (num) => {
    if(numImg + num>=0 && numImg+num< images.length) {
      setNumImg(numImg + num)
    }
  };
  return (
    <div className='container-carrousel-images'>
      <span className='cant-imgs'>{`${numImg+1}/${images.length}`}</span>
      <ArrowLeft className='btn-left btn' onClick={()=>handleClick(-1)}/>
      <ArrowRight className='btn-rigth btn' onClick={()=>handleClick(1)}/>
      <img src={images[numImg]?.url} className='img-carrousel' />
    </div>
  );
}
