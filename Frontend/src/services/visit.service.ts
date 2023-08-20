import { Visit, VisitStatus } from "../utils/types";
import api from "./api";

export const getLast7Visits = async (
  password: string,
  signal?: AbortSignal
): Promise<Visit[]> => {
  const res = await api.get(`/Visits?password=${password}`, { signal: signal });
  return res.data;
};

export const getVisit = async (
  visitId: string,
  signal?: AbortSignal
): Promise<Visit> => {
  const res = await api.get(`/Visits/${visitId}`, { signal: signal });
  return res.data;
};

export const createVisit = async (specialistId: string): Promise<string> => {
  const res = await api.post("/Visits", { SpecialistId: specialistId });
  return res.data;
};

export const getVisitByCode = async (
  visitCode: number,
  signal?: AbortSignal
): Promise<Visit> => {
  const res = await api.get(`/Visits/Code/${visitCode}`, { signal: signal });
  return res.data;
};

export const changeStatus = async (
  visitId: string,
  newStatus: VisitStatus
): Promise<void> => {
  const res = await api.patch(`/Visits/${visitId}/Status`, {
    VisitStatus: newStatus,
  });
  return res.data;
};

export const getSpecialistVisits = async (
  specialistId: string,
  signal?: AbortSignal
): Promise<Visit[]> => {
  const res = await api.get(`/Users/${specialistId}/Visits`, {
    signal: signal,
  });
  return res.data;
};
