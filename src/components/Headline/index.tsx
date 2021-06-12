import React from 'react';
import cn from 'classnames';
import styles from './style.module.scss';

type HeadlineProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  classLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  centered?: boolean;
  color?: 'Primary' | 'Secondary' | 'White' | 'Black';
  additionalClass?: string;
};

const Headline: React.FC<HeadlineProps> = ({
  children,
  level = 1,
  classLevel,
  centered = false,
  color = 'blue',
  additionalClass,
}) => {
  const HeadlineTag = ({ ...props }) => React.createElement(`h${level}`, props, children);
  const headlineClass = !classLevel ? level : classLevel;
  return (
    <HeadlineTag
      className={cn(
        { [styles.headline1]: headlineClass === 1 },
        { [styles.headline2]: headlineClass === 2 },
        { [styles.headline3]: headlineClass === 3 },
        { [styles.headline4]: headlineClass === 4 },
        { [styles.headline5]: headlineClass === 5 },
        { [styles.headline6]: headlineClass === 6 },
        { 'text-center': centered },
        { 'text-dark-blue': color === 'blue' },
        { 'text-white': color === 'white' },
        additionalClass
      )}
    >
      {children}
    </HeadlineTag>
  );
};

export default Headline;
