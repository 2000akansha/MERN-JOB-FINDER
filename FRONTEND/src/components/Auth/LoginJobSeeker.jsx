import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setIsAuthorized, setToken } = useContext(Context);
  const [navigateToJobSeekerHome, setNavigateToJobSeekerHome] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/user2/login2",
        { email, password, role },
      
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(email, password, role)
      toast.success(data.message);
      
      // Set token in context
      setToken(data.token);
      setIsAuthorized(true);
      setNavigateToJobSeekerHome(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (navigateToJobSeekerHome) {
    return <Navigate to={'/JobseekerHome'} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            {/* <img src="/person-seeing-through-magnifying-glass.png"  alt="logo" /> */}
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register2"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.jpg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
