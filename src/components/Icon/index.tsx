import React from 'react';
import { ReactComponent as logo } from './icons/logo.svg';

export type IconType = 'logo';

type IconProps = {
  name: IconType;
  width?: number;
  height?: number;
  additionalClass?: string;
};

const Icon: React.FC<IconProps> = ({ name, width, height, additionalClass }) => {
  if (!name) {
    return null;
  }

  const icons = {
    logo,
  };

  const CurrentIcon = icons[name];

  return <CurrentIcon width={width} height={height} className={additionalClass} />;
};

export default Icon;
