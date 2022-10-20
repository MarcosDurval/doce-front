import { ChangeEvent } from "react";

type IProps = {
  name: string;
  label: string;
  id: string;
  type: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputGeneric = ({
  id,
  label,
  name,
  type,
  value,
  handleChange,
}: IProps) => {
  return (
    <label htmlFor={id}>
      {`${label}:`}
      <input
        required
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default InputGeneric;
