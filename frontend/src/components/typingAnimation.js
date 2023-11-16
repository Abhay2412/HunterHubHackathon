import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const CustomTypeAnimation = () => {

  const customStyle = {
    fontSize: '100px',
    fontFamily: 'inherit',
    fontWeight: 'light'
  };

  return (
    <TypeAnimation
      sequence={[
        'Write Impactful Essays',
        1000,
        'Reach Academic Success',
        1000,
        'Upload. Learn. Succeed',
        1000,
        'Your Success Awaits',
        1000,
      ]}
      speed={50}
      style={customStyle}
      repeat={Infinity}
    />
  );
};

export default CustomTypeAnimation;