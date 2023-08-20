import axios from "axios";
import { VisitStatus } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorMessageFromAxiosError(e: any): string {
  if (!axios.isCancel(e)) {
    if (e.message === "Network Error") {
      return "Connection error";
    }

    if (e.response) {
      if (e.response.status === 500) {
        return "Error";
      } else {
        const value = e?.response?.data?.errors
          ? Object.values(e?.response?.data?.errors)[0]
          : e?.response?.data?.title ||
            e?.response?.data?.message ||
            e?.response?.data ||
            "Error";
        return value;
      }
    } else if (e.request) {
      return "Connection error";
    } else {
      return "Error";
    }
  } else {
    return "";
  }
}

export function visitStatusDisplayName(status: VisitStatus): string {
  switch (status) {
    case VisitStatus.NOT_STARTED:
      return "not started";
    case VisitStatus.STARTED:
      return "started";
    case VisitStatus.ENDED:
      return "ended";
    case VisitStatus.CANCELED:
      return "canceled";
  }
}
