import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "../main";
export const RendezVous = () => {
  const { me } = React.useContext(users);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [veterinaries, set_veterinaries] = React.useState([]);
  const [_id , set_id ] = React.useState(Number(0))
  const [visit_date, setVisit_date] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Affichage et Envoyer un Rendez-vous 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/visits/${me}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pets: { name: name },
          description: description,
          vet: { _id: Number(_id) },
          visit_date: visit_date,
        }),
      });

      if (res.status === 201) {
        setMessage("visite are added");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/veterinaries`)
      .then((res) => res.json())
      .then((data) => set_veterinaries(data))
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <h1>Rendez-vous pour visite de votre Animal</h1>
      <Link to="/users"> retoure users</Link>

      <form onSubmit={handleSubmit} method="post">
        <label className="form-label"> Name de votre Animal </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label"> description </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="form-label"> veterinaire </label>
        <select onChange={(e) => set_id(e.target.value)}>
          <option>--Please choose an option--</option>
          {veterinaries.map((p , i ) => <option key={i}  value={p._id}>{p.first_name} {p.last_name}</option> )}
        </select>
        <label className="form-label">visit_date</label>
        <input
          type="date"
          value={visit_date}
          onChange={(e) => setVisit_date(e.target.value)}
        />
        <br></br>
        <button className="btn" onSubmit={handleSubmit}>
          submit
        </button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};
