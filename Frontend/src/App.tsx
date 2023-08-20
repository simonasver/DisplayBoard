import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotificationSnackbar from "./components/layout/NotificationSnackbar";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import LoginForm from "./components/auth/LoginForm";
import DisplayBoard from "./components/displayBoard/DisplayBoard";
import VisitReservation from "./components/visit/VisitReservation";
import VisitCheck from "./components/visit/VisitCheck";
import Logout from "./components/auth/Logout";
import SpecialistDashboard from "./components/specialist/SpecialistDashboard";

function App() {
  return (
    <>
      <NotificationSnackbar />
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<VisitReservation />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/display/:password" element={<DisplayBoard />} />

          <Route path="/visitReservation" element={<VisitReservation />} />
          <Route path="/visitCheck" element={<VisitCheck />} />
          <Route path="/myVisits" element={<SpecialistDashboard />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;
