import React from "react";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const [first_name, setFirstname] = React.useState("");
  const [last_name, setLastname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          address: address,
          city: city,
          telephone: telephone,
        }),
      });

      if (res.status === 201) {
        navigate("/login");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <>
      <h1 className="h1">Register</h1>
      <form onSubmit={handleSubmit} method="post">
        <label className="form-label"> Firstname </label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label className="form-label"> Lastname </label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
        />
        <label className="form-label"> Address </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label className="form-label"> city </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label className="form-label"> telephone </label>
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <br></br>
        <button  className="btn" onSubmit={handleSubmit}>submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};
