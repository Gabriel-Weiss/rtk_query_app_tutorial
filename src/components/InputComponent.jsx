import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const InputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error ? (
        <TextField
          error
          size="small"
          fullWidth
          margin="normal"
          label={label}
          helperText={meta.error}
          {...props}
          inputProps={field}
          InputLabelProps={{ shrink: true }}
        />
      ) : (
        <TextField
          required
          fullWidth
          margin="normal"
          size="small"
          label={label}
          color="secondary"
          {...props}
          inputProps={field}
          InputLabelProps={{ shrink: true }}
        />
      )}
    </>
  );
};

export default InputComponent;
