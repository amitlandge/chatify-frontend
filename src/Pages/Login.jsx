import {
  Avatar,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./Login.css";
import { useEffect, useState } from "react";
import { CameraAltOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth";
import { LoaderSpinner } from "../Components/Layout/Loader";
import { useNavigate } from "react-router-dom";
import usePutPost from "../Hooks/usePutPost";
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const isNameValid = name.trim().length > 2;
  const isEmailValid = email.trim().includes("@");
  const isPasswordValid = password.trim().length === 8;
  const isUserNameValid = username.trim().length > 5;
  const isBioValid = bio.trim().length > 10;
  const { user } = useSelector((state) => state.auth);
  const [loader, putPostMethod] = usePutPost();

  const navigate = useNavigate();
  const changeFormHandler = () => {
    setIsLogin((prev) => !prev);
    setEmail("");
    setPassword("");
  };
  const onRegisterHandler = async (e) => {
    e.preventDefault();
    if (!isNameValid) {
      toast.error("Name is Invalid, Make Sure Name Must be Above 2 Character");
    } else if (!isEmailValid) {
      toast.error("Email is Invalid, Please Try Again");
    } else if (!isPasswordValid) {
      toast.error("Password Shoud Be 8 Character");
    } else if (!isUserNameValid) {
      toast.error("Username is Invalid , Username Should Be Above 5 Character");
    } else if (!isBioValid) {
      toast.error("Bio Should Be Above 10 Character");
    } else if (!file) {
      toast.error("Please Insert Profile");
    } else if (
      isNameValid &&
      isEmailValid &&
      isUserNameValid &&
      isBioValid &&
      file &&
      isPasswordValid
    ) {
      let formData = new FormData();
      formData.set("username", username);
      formData.set("password", password);
      formData.set("bio", bio), formData.set("email", email);
      formData.set("name", name);
      formData.set("avatar", file);
      const data = {
        method: "POST",
        url: "api/v1/user/register",
        payload: formData,
        message: "Login Successfully",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await putPostMethod(data);

      if (response?.status === 200) {
        dispatch(isAuthenticated(response?.data.user));
        navigate("/");
      } else {
        dispatch(isNotAuthenticated());
      }
    }
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    if (!isUserNameValid) {
      toast.error("Email is Invalid, Please Try Again");
    } else if (!isPasswordValid) {
      toast.error("Password Shoud Be 8 Character");
    } else if (isUserNameValid && isPasswordValid) {
      const data = {
        method: "POST",
        url: "api/v1/user/login",
        payload: { username, password },
        message: "Login Successfully",
      };
      const response = await putPostMethod(data);

      if (response.status === 200) {
        dispatch(isAuthenticated(response?.data.user));
        navigate("/home");
      } else {
        dispatch(isNotAuthenticated());
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <div>
      {loader ? (
        <LoaderSpinner />
      ) : (
        <Container
          sx={{
            height: "auto",
            maxWidth: "max-content",
            margin: "2% auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              padding: "3rem",
            }}
            elevation={7}
          >
            {isLogin ? (
              <>
                <Typography variant="h4">Login</Typography>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                  onSubmit={onLoginHandler}
                >
                  <TextField
                    type="username"
                    className="username"
                    label="username"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                  <TextField
                    type="password"
                    className="email"
                    label="Password"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  <span
                    style={{ alignSelf: "flex-start" }}
                    color={!isPasswordValid ? "red" : "black"}
                  >
                    Password Must Be 8 Character
                  </span>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: "#006A4E",
                      color: "white",
                      ":hover": {
                        background: "#006A4E",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h4">Register</Typography>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                  onSubmit={onRegisterHandler}
                >
                  <div>
                    <Avatar
                      src={file ? URL.createObjectURL(file) : ""}
                      sx={{ width: "10rem", height: "10rem" }}
                    ></Avatar>
                    <div style={{ position: "absolute", cursor: "pointer" }}>
                      <CameraAltOutlined
                        style={{
                          cursor: "pointer",
                        }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        style={{
                          position: "relative",
                          top: "-10px",
                          left: "-2rem",
                          opacity: "0.0",
                        }}
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <TextField
                    type="text"
                    className="name"
                    label="Name"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                  <TextField
                    type="text"
                    className="bio"
                    label="Bio"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                    value={bio}
                  />
                  <TextField
                    type="text"
                    className="text"
                    label="Username"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                  <TextField
                    type="email"
                    className="email"
                    label="Email"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  <TextField
                    type="password"
                    className="email"
                    label="Password"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  <p
                    color="red !important"
                    style={{
                      alignSelf: "flex-start",
                      color: !isPasswordValid ? "red" : "black",
                    }}
                  >
                    Password Must Be 8 Character
                  </p>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: "#006A4E",
                      color: "white",
                      ":hover": {
                        background: "#006A4E",
                        color: "white",
                      },
                    }}
                  >
                    Register
                  </Button>
                </form>
              </>
            )}
            OR
            <Button
              onClick={changeFormHandler}
              sx={{
                background: "#006A4E",
                color: "white",
                ":hover": {
                  background: "#006A4E",
                  color: "white",
                },
              }}
            >
              Switch To {isLogin ? "Register" : "Login"}
            </Button>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default Login;
