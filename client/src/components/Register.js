import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [inpVal, setINP] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
  });

  const navigate = useNavigate();

  const setData = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setINP((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const addInpData = async (e) => {
    e.preventDefault();

    const { name, email, gender, address } = inpVal;

    if (name === "" || name === undefined) {
      toast.error("Enter the name");
    } else if (email === "" || email === undefined) {
      toast.error("Enter the email");
    } else if (gender === "" || gender === undefined) {
      toast.error("Enter your gender");
    } else if (address === "" || address === undefined) {
      toast.error("Enter your address");
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          address,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 404 || !data) {
        alert("Error");
        console.log("error");
      } else {
        toast.success("Data Added");
        console.log("Data Added");
      }

      navigate("/");
    }
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        icon={false}
      />
      <div className="row">
        <form>
          <div className="mb-3 col-md-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={setData}
              value={inpVal.name}
            />
          </div>
          <div className="mb-3 col-md-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={setData}
              value={inpVal.email}
            />
          </div>
          <div className="mb-3 col-md-12">
            <label className="form-label">Gender</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="gender"
              onChange={setData}
              value={inpVal.gender}
            />
          </div>
          <div className="mb-3 col-md-12">
            <label className="form-label">Address</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="address"
              onChange={setData}
              value={inpVal.address}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary col-md-12 mt-3"
            onClick={addInpData}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
