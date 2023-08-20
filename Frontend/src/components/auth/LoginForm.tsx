import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { useAppDispatch } from "../../utils/hooks";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import { getProfile } from "../../services/auth.service";
import { errorMessageFromAxiosError } from "../../utils/helpers";

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    login(username, password)
      .then((res) => {
        dispatch(
          authActions.changeTokens({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );

        getProfile()
          .then((res) => {
            const profile = res;
            dispatch(
              authActions.changeUser({
                id: profile.id,
                userName: profile.userName,
                email: profile.email,
                role: profile.role,
              })
            );

            dispatch(
              alertActions.changeAlert({
                type: "success",
                message: "Successfully logged in",
              })
            );

            navigate("/");
          })
          .catch((e) => {
            console.log(e);
            dispatch(
              alertActions.changeAlert({
                type: "error",
                message: errorMessageFromAxiosError(e),
              })
            );
          });
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          alertActions.changeAlert({
            type: "error",
            message: errorMessageFromAxiosError(e),
          })
        );
      });
  };

  return (
    <>
      <Typography variant="h5">Login</Typography>
      <br />
      <Typography variant="subtitle2">
        Please enter your username and password!
      </Typography>
      <br />
      <form onSubmit={onLoginSubmit}>
        <TextField
          value={username}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          type="text"
          label="Username"
          variant="outlined"
          fullWidth
          required
        />
        <br />
        <br />
        <TextField
          value={password}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          required
        />
        <br />
        <br />
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", md: "inherit" } }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
