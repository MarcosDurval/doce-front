import { ChangeEvent } from "react";

type IProps = {
  name: string;
  label: string;
  id: string;
  elements: string[];
  value: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectGeneric = ({
  id,
  label,
  name,
  elements,
  handleChange,
  value,
}: IProps) => {
  return (
    <label htmlFor={id}>
      {`${label}:`}
      <select value={value} name={name} id={id} onChange={handleChange}>
        {elements.map((e, index) => {
          return (
            <option key={index} value={e}>
              {e}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectGeneric;
