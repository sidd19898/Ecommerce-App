import TextField from "@mui/material/TextField";

export default function SearchBar({
  value,
  onChange
}) {

  return (

    <TextField
      fullWidth
      label="Search Products"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />

  );

}