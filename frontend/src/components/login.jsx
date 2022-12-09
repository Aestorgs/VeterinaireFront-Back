import React from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../main";

export const Login = () => {
  const navigate = useNavigate();
  const [first_name, setFirstname] = React.useState("");
  const [last_name, setLastname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { setMe } = React.useContext(users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        navigate("/users");
        setMe(data);
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };
  return (
    <>
      <h1 className="h1">Login</h1>
      <form onSubmit={handleSubmit} method="post">
        <label className="form-label"> firstname </label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label className="form-label"> lastname </label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
        />

        <br></br>
        <button  className="btn" onSubmit={handleSubmit}>submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};
