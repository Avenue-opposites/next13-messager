'use client'

import ReactSelect, { MultiValue, Options } from 'react-select'

interface SelectProps<T = Record<string, any>> {
  label: string;
  options: T[];
  onChange: (value: MultiValue<{ label: string, value: string }>) => void;
  value: T
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  onChange,
  value,
  disabled = false
}) => {
  return (
    <div className="z-[100]">
      <label
        className="
          block text-sm font-medium leading-6
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: base => ({
              ...base,
              zIndex: 9999
            })
          }}
          classNames={{
            control: () => 'text-sm'
          }}
        />
      </div>
    </div>
  );
}

export default Select;