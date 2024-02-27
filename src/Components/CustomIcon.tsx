
/*No clue what this does but I added it to make our logo into an Icon to keep consistency with
how I was adding our react logos*/
import React, { CSSProperties } from 'react';

interface CustomIconProps {
  className?: string;
  width?: number;
  height?: number;
  /*Add any other props you want to accept*/
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, width, height, ...props }) => {
  const style: CSSProperties = {
    width,
    height,
    /*Add any other style properties you want to use*/
  };

  return (
    <img
      src="./Images/WindiLogo.png" /*Adjust the path accordingly*/
      alt="Custom Icon"
      className={`navbar-icon ${className || ''}`}
      style={style}
      {...props}
    />
  );
};

export default CustomIcon;
