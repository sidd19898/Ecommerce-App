import {
  Box,
  Typography
} from "@mui/material";

export default function EmptyState({
  title
}) {

  return (

    <Box
      textAlign="center"
      mt={5}
    >

      <Typography
        variant="h5"
      >
        {title}
      </Typography>

    </Box>

  );
}