import React, { useEffect } from "react";
import { users } from "../main";
import { Link } from "react-router-dom";
export const Visits = () => {
  const { me } = React.useContext(users);
  const [visits, setVisits] = React.useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/visits/${me}`)
      .then((res) => res.json())
      .then((data) => setVisits(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1> Historique de vos Animaux</h1>
      <Link to="/users">retour users</Link>
      <div>
        {visits.map((p, index) => {
          return (
            <div key={index}>
              <h2>Name : {p.name}</h2>
              {p.visits.map((p, index) => {
                return (
                  <div className="panel" key={index}>
                    <p> Description : {p.description}</p>
                    <p> Visit_date : {p.visit_date}</p>
                    <p> first_name : {p.vet.first_name}</p>
                    <p> last_name : {p.vet.last_name}</p>
                    <p>specialities</p>
                    {p.vet.specialities.map((p, index) => {
                      return (
                        <div key={index}>
                          <span className="chip">{p}</span>
                        </div>
                      );
                    })}
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
