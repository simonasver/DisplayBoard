import React from "react";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { getVisitByCode } from "../../services/visit.service";
import { useAppDispatch } from "../../utils/hooks";
import { alertActions } from "../../store/alert-slice";
import {
  errorMessageFromAxiosError,
  visitStatusDisplayName,
} from "../../utils/helpers";

const VisitCheck = () => {
  const dispatch = useAppDispatch();

  const [code, setCode] = React.useState(1);

  const [successMessage, setSuccessMessage] = React.useState("");

  const onCheckSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    getVisitByCode(code)
      .then((res) => {
        setSuccessMessage(
          `Visit with code ${res.code} start time is ${new Date(
            res.startDate
          ).toLocaleString()} and duration is ${
            res.durationInMinutes
          } minutes. Visit status is ${visitStatusDisplayName(res.status)}.`
        );
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
      <Typography variant="h5">Check a visit</Typography>
      <br />
      <Typography variant="subtitle2">
        Please enter a visit code to check how much time is left!
      </Typography>
      <br />
      <form onSubmit={onCheckSubmit}>
        <TextField
          value={code}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(parseInt(e.target.value))
          }
          type="number"
          label="Code"
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
              Check
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <br />
      {successMessage && <Alert color="success">{successMessage}</Alert>}
    </>
  );
};

export default VisitCheck;
