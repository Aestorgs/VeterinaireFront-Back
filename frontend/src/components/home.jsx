import React from "react";
import { Link } from "react-router-dom";
// la pages Accueil
export const Home = () => {
  return (
    <>
      <h1> Accueil Vétérinaire</h1>
      <Link to="/login">login</Link>
      <br></br>
      <Link to="/register">register</Link>
    </>
  );
};
