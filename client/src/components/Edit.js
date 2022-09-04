import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [inpVal, setINP] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
  });

  const navigate = useNavigate();

  const setData = (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    const { name, value } = e.target;

    setINP((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const { id } = useParams();
  console.log(id);

  const getDataById = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      alert("Error");
      console.log("error");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, email, gender, address } = inpVal;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Fill the data");
    } else {
      toast.success("Data Updated");
      navigate("/");
    }

  };

  return (
    <div>
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
              onClick={updateUser}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
