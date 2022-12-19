import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "../main";

// Affichage de utilisateur 
export const Users = () => {
  const { me } = React.useContext(users);
  const [name, setName] = React.useState("");
  const [birth_date, setBirth_date] = React.useState("");
  const [types, setType] = React.useState("");
  const [user, setUser] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/auth/${me}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pets: [
            {
              name: name,
              birth_date: birth_date,
              types: types,
            },
          ],
        }),
      });
      const data = await res.json();
      console.log("users", data);
      if (res.status === 201) {
        setMessage("animals are added");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>
        Bienvenue {user[0]?.first_name} {user[0]?.last_name}{" "}
      </h1>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/users/pets">Animaux</Link>
        </li>
        <li className="nav-item">
          <Link to="/users/rendez-vous">Rendez-vous pour Visite </Link>
        </li>
        <li className="nav-item">
          <Link to="/users/historique/visits">historique de Visite</Link>
        </li>
        <li className="nav-item">
          <Link to="/">Deconnexion</Link>
        </li>
      </ul>

      <h2 className="h1">Ajouter un Animal</h2>

      <form  className="form-group" onSubmit={handleSubmit} method="post">
        <label className="form-label"> Name de votre Animal </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label"> birthdate </label>
        <input
          type="date"
          value={birth_date}
          onChange={(e) => setBirth_date(e.target.value)}
        />

        <label className="form-label"> Type </label>
        <input
          type="text"
          value={types}
          onChange={(e) => setType(e.target.value)}
        />
        <br></br>
        <button className="btn" onSubmit={handleSubmit}>submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};
