import Button from "@mui/material/Button";

export default function CustomButton({
  children,
  ...props
}) {

  return (
    <Button
      variant="contained"
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
}