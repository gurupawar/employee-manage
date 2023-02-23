import "./App.css";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AddEmployee } from "./components/AddEmployee";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
