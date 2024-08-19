import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Public Access Components/Login";
import Signup from "./Public Access Components/Signup";
import UserDashboard from "./Components/UserDashboard";
import SavedProperty from "./Components/YourTicket";
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";
import BookTicket from "./Components/BookTicket";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
                <Route
            path="BookTickets/:id"
            element={
              <PrivateRoute>
                <BookTicket />
              </PrivateRoute>
            }
          />

          <Route
            path="yourTicket"
            element={
              <PrivateRoute>
                <SavedProperty />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
