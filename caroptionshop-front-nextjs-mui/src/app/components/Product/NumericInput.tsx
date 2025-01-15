import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  prefix: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  },
);

const NumericInput = ({ name, label, readOnly = false, ...props }) => {
  const [value, setValue] = useState(props?.defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      {...props}
      variant="filled"
      label={label}
      value={value}
      onChange={handleChange}
      name={name}
      lang="fa"
      slotProps={{
        inputLabel: {
          shrink: Boolean(value),
        },
        input: {
          readOnly: readOnly,
          inputComponent: NumericFormatCustom as any,
        },
      }}
    />
  );
};

export { NumericInput };
