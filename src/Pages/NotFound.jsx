import { ArrowBack, SentimentDissatisfied } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "10%",
      }}
    >
      <h1>Error</h1>
      <p>Something Went Wrong</p>
      <SentimentDissatisfied />
      <Button
        onClick={() => {
          navigate("/home");
        }}
        startIcon={<ArrowBack />}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
