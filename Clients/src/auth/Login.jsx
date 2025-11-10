// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Dummy login validation
//     if (email === "admin@example.com" && password === "admin123") {
//       localStorage.setItem("token", "dummy_token"); // store token
//       navigate("/"); // go to dashboard
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <h2 style={{ textAlign: "center" }}>Login</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//           required
//         />
//         <button type="submit" style={styles.button}>Login</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     padding: "30px",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//     width: "300px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "10px",
//     borderRadius: "4px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     textAlign: "center",
//   },
// };

// export default Login;
