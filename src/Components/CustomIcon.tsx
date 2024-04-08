/*Used to turn our logo into a typical react icon. Made calling on the image far easier and less cluttered*/
import React, { CSSProperties } from "react";

interface CustomIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  className,
  width,
  height,
  ...props
}) => {
  const style: CSSProperties = {
    width,
    height,
  };

  return (
    <img
      src="./Images/WindiLogo.png"
      alt="Custom Icon"
      className={`navbar-icon ${className || ""}`}
      style={style}
      {...props}
    />
  );
};

export default CustomIcon;
