import React from 'react';

export function FontAwesomeIcon({
  className,
  children,
  ...props
}: {
  className?: string;
  children: any;
}): JSX.Element {
  return (
    <i className={`fa ${className}`} {...props}>
      {children}
    </i>
  );
}
