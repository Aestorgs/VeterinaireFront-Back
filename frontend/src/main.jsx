import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Layout } from "./components/loyout";
import { Users } from "./components/users";
import { Pets } from "./components/pets";
import { RendezVous } from "./components/rendezvous";
import { Visits } from "./components/visits";

const root = document.getElementById("root");

const app = createRoot(root);

export const users = React.createContext();

const App = () => {
  const [me, setMe] = React.useState();

  return (
    <BrowserRouter>
      <users.Provider value={{ me, setMe }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Layout />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/pets" element={<Pets />} />
            <Route path="/users/rendez-vous" element={<RendezVous />} />
            <Route path="/users/historique/visits" element={<Visits />} />
          </Route>
        </Routes>
      </users.Provider>
    </BrowserRouter>
  );
};

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
