import React from 'react';
import './TextInput.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextInput({ label, className, ...rest }: Props) {
  return (
    <label className={`text-input ${className || ''}`}>
      {label ? <span className="text-input-label">{label}</span> : null}
      <input {...rest} />
    </label>
  );
}

export default TextInput;
