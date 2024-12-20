import React, {useState} from "react";
import axios from "axios";


export function GridBackgroundDemo() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {email, password}
      );
      console.log(response);      
    } catch (error){
      console.log(error);      
    }
  }


  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: "transparent",
      padding: "20px",
      borderRadius: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    inputForm: {
      border: "1.5px solid #000",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "10px",
      transition: "0.2s ease-in-out",
    },
    input: {
      marginLeft: "10px",
      borderRadius: "10px",
      border: "none",
      width: "100%",
      height: "100%",
      outline: "none",
    },
    buttonSubmit: {
      margin: "20px 0 10px 0",
      backgroundColor: "#151717",
      border: "none",
      color: "white",
      fontSize: "15px",
      fontWeight: "500",
      borderRadius: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center px-4 sm:px-8 lg:px-20">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-5xl lg:text-7xl font-orbit font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-black to-blue-950 py-8 text-center">
        A K C Link Tech
      </p>
      <form onSubmit={handleSubmit}      
        style={styles.form}
        className="relative z-20 mt-8 w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-lg"
      >
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Email</label>
        </div>
        <div style={styles.inputForm} className="h-12">
          <input
            placeholder="Enter your Email"
            style={styles.input}
            className="text-sm"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Password</label>
        </div>
        <div style={styles.inputForm} className="h-12">
          <input
            placeholder="Enter your Password"
            style={styles.input}
            className="text-sm"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          style={styles.buttonSubmit}
          className="mt-4 h-12 w-full text-white font-semibold bg-black hover:bg-gray-900 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
