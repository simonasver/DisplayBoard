import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Visit, VisitStatus } from "../../utils/types";
import {
  changeStatus,
  getSpecialistVisits,
} from "../../services/visit.service";
import { alertActions } from "../../store/alert-slice";
import {
  errorMessageFromAxiosError,
  visitStatusDisplayName,
} from "../../utils/helpers";

const SpecialistDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [visits, setVisits] = React.useState<Visit[]>([]);

  React.useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    getSpecialistVisits(user.id)
      .then((res) => {
        setVisits(res);
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
  }, [dispatch, navigate, user]);

  const onStartVisitHandler = (visitId: string) => {
    changeStatus(visitId, VisitStatus.STARTED)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: "Successfully started the visit",
          })
        );
        getSpecialistVisits(user!.id)
          .then((res) => {
            setVisits(res);
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

  const onEndVisitHandler = (visitId: string) => {
    changeStatus(visitId, VisitStatus.ENDED)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: "Successfully ended the visit",
          })
        );
        getSpecialistVisits(user!.id)
          .then((res) => {
            setVisits(res);
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

  const onCancelVisitHandler = (visitId: string) => {
    changeStatus(visitId, VisitStatus.CANCELED)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: "Successfully cancelled the visit",
          })
        );
        getSpecialistVisits(user!.id)
          .then((res) => {
            setVisits(res);
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
      <Typography variant="h5">Specialist visits</Typography>
      <br />
      <Typography variant="subtitle2">
        You can check all of your visits and manage them here!
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((visit, index) => (
              <TableRow key={visit.id}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>{visit.code}</TableCell>
                <TableCell>
                  {new Date(visit.startDate).toLocaleString()}
                </TableCell>
                <TableCell>{visit.durationInMinutes}min</TableCell>
                <TableCell>
                  <Chip label={visitStatusDisplayName(visit.status)} />
                </TableCell>
                <TableCell>
                  {visit.status === VisitStatus.NOT_STARTED && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ marginRight: "5px" }}
                      size="small"
                      onClick={() => onStartVisitHandler(visit.id)}
                    >
                      Start
                    </Button>
                  )}
                  {visit.status === VisitStatus.STARTED && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginRight: "5px" }}
                      size="small"
                      onClick={() => onEndVisitHandler(visit.id)}
                    >
                      End
                    </Button>
                  )}
                  {visit.status === VisitStatus.NOT_STARTED && (
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => onCancelVisitHandler(visit.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SpecialistDashboard;
