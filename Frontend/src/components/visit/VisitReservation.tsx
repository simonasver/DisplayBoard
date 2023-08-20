import React from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "../../utils/types";
import { getAllUsers } from "../../services/user.service";
import { useAppDispatch } from "../../utils/hooks";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import { createVisit, getVisit } from "../../services/visit.service";

const VisitReservation = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    const abortController = new AbortController();
    getAllUsers()
      .then((res) => {
        setUsers(res);
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
    return () => abortController.abort();
  }, [dispatch]);

  const onCreateVisitHandler = () => {
    setSuccessMessage("");
    if (!selectedUser) {
      dispatch(
        alertActions.changeAlert({
          type: "error",
          message: "User must be selected",
        })
      );
      return;
    }

    createVisit(selectedUser.id)
      .then((res) => {
        getVisit(res)
          .then((res) => {
            setSuccessMessage(
              `Visit with code ${res.code} was successfully created.`
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
      <Typography variant="h5">Make a visit</Typography>
      <br />
      <Typography variant="subtitle2">
        Please select the specialist for which you want to make the visit!
      </Typography>
      <br />
      <Autocomplete
        filterOptions={(x) => x}
        value={selectedUser}
        onChange={(_e: React.SyntheticEvent, newValue: User | null) =>
          setSelectedUser(newValue!)
        }
        options={users}
        getOptionLabel={(option) => option.userName}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Typography sx={{ marginLeft: "10px" }} fontWeight="bold">
              {option.userName}{" "}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Select specialist"}
            value={searchTerm}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        )}
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
            sx={{ width: { xs: "100%", md: "inherit" } }}
            onClick={onCreateVisitHandler}
          >
            Make reservation
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      {successMessage && <Alert color="success">{successMessage}</Alert>}
    </>
  );
};

export default VisitReservation;
