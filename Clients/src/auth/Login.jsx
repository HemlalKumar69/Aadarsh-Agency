import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isRegister ? "register" : "login";
      const res = await axios.post(`${api}/auth/${endpoint}`, formData);

      console.log(res);

      if (res.data?.token) {
        // Save token for protected routes
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else if (isRegister) {
        // On successful registration but no token
        alert("Registration successful! Please login.");
        setIsRegister(false);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        (isRegister ? "Registration failed." : "Login failed.");
      setError(msg);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center" }}>
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p style={styles.error}>{error}</p>}

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            style={styles.link}
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    width: "320px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Auth;
