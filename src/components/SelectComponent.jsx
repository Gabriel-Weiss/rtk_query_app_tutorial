import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { priceLevels } from "../utils/priceLevels";

const SelectComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error ? (
        <TextField
          error
          select
          required
          fullWidth
          label={label}
          margin="normal"
          size="small"
          color="error"
          {...props}
          inputProps={field}
          InputLabelProps={{ shrink: true }}
          helperText={meta.error}
        >
          {priceLevels.map((level) => (
            <MenuItem key={level.value} value={level.value}>
              {level.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          select
          required
          fullWidth
          label={label}
          margin="normal"
          size="small"
          color="secondary"
          {...props}
          inputProps={field}
          InputLabelProps={{ shrink: true }}
        >
          {priceLevels.map((level) => (
            <MenuItem key={level.value} value={level.value}>
              {level.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};

export default SelectComponent;
