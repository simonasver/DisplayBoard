import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getLast7Visits } from "../../services/visit.service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Visit } from "../../utils/types";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { password } = useParams();

  const [visits, setVisits] = React.useState<Visit[]>([]);

  React.useEffect(() => {
    if (!password) {
      return navigate("/", { replace: true });
    }
    const abortController = new AbortController();
    const intervalId = setInterval(() => {
      getLast7Visits(password, abortController.signal)
        .then((res) => {
          console.log(res);
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
    }, 3 * 1000);
    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [dispatch, navigate, password]);

  return (
    <>
      <Typography variant="h5">Display board</Typography>
      <br />
      <Typography variant="subtitle2">7 upcoming visits!</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Time left</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((visit, index) => (
              <TableRow key={visit.id}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>{visit.code}</TableCell>
                <TableCell>
                  {(
                    (new Date(visit.startDate).getTime() -
                      new Date().getTime()) /
                    1000 /
                    60
                  ).toFixed(2)}
                  min
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LoginForm;
