import React, { useEffect } from "react";
import { users } from "../main";
import { Link } from "react-router-dom";

export const Pets = () => {
  const { me } = React.useContext(users);
  const [user, setUser] = React.useState([]);
  const [pets, setPets] = React.useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pets/${me}`)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>
        Vos Animaux de {user[0]?.first_name} {user[0]?.last_name}
      </h1>

      <Link to="/users"> retour users</Link>

      <div>
        {pets.map((p, index) => {
          return (
            <div key={index}>
              {p.pets.map((p, index) => {
                return (
                  <div key={index}>
                    <div className="panel">
                      <div className="panel-header">
                        <div className="panel-title">Pets {p.name}</div>
                      </div>
                      <div className="panel-body">
                        <p> Birth_date : {p.birth_date}</p>
                        <p> Types : {p.types}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
