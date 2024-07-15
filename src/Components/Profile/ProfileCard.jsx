import { Box, Typography } from "@mui/material";

const ProfileCard = (prop) => {
  const { title, description, icon } = prop;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1">{description}</Typography>
      <Typography
        variant="caption"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {icon && icon}
        {title}
      </Typography>
    </Box>
  );
};

export default ProfileCard;
