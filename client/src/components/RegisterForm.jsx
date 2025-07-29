// // Pre test
// import React, { useState } from "react";
// import axios from "axios";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({ name: "", email: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/register", formData);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage("Registration failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc" }}>
//       <h2>User Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//           style={{ display: "block", marginBottom: "10px", width: "100%" }}
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//           style={{ display: "block", marginBottom: "10px", width: "100%" }}
//         />
//         <button type="submit" style={{ width: "100%" }}>Register</button>
//       </form>
//       {message && <p style={{ marginTop: "10px" }}>{message}</p>}
//     </div>
//   );
// };

// export default RegisterForm;
