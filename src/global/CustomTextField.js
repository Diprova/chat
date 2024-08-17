import { TextField, FormControl, FormHelperText } from "@mui/material";

const RED = "#ff1744";
const LIGHT_GREY = "#cecdcd";

export const CustomTextField = (props) => {
  const { error, helperText, ...rest } = props;
  return (
    <FormControl fullWidth>
      <TextField
        error={error}
        {...rest}
        helperText={
          <FormHelperText
            style={{
              color: error ? RED : LIGHT_GREY,
              marginTop: "-15px",
            }}
          >
            {helperText}
          </FormHelperText>
        }
      />
    </FormControl>
  );
};
