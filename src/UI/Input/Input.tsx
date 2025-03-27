import clsx from "clsx";
import { useEffect, useState } from "react";
import { InputProps } from "./types";

export const Input = ({
  placeholder,
  onChange,
  classNames,
  value,
}: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleOnChange = (value: string) => {
    setCurrentValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <input
      className={clsx(classNames)}
      placeholder={placeholder}
      onChange={({ target: { value } }) => handleOnChange(value)}
      value={currentValue}
    />
  );
};
