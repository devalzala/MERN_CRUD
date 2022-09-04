import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profile from "../profile.jfif";
import EmailIcon from "@mui/icons-material/Email";
import ManIcon from "@mui/icons-material/Man";
import HomeIcon from "@mui/icons-material/Home";
import "./Details.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [getUserById, setUserById] = useState([]);
  console.log(getUserById);

  const { name, email, address, gender } = getUserById;

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
      setUserById(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status == 422 || !deleteData) {
      console.log("Error");
    } else {
      console.log("User deleted successfully");
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1>Welcome Devalsinh Zala</h1>
      <Card sx={{ minWidth: 275 }} className="card">
        <CardContent>
          <img src={profile} style={{ width: 50 }} alt="profile" />
          <h3 className="mt-3">
            Name: <span style={{ fontWeight: "400" }}>{name}</span>
          </h3>
          <h3 className="mt-3">
            <EmailIcon />
            Email: <span style={{ fontWeight: "400" }}>{email}</span>
          </h3>
          <h3 className="mt-3">
            <ManIcon />
            Gender: <span style={{ fontWeight: "400" }}>{gender}</span>
          </h3>
          <h3 className="mt-3">
            <HomeIcon />
            Address: <span style={{ fontWeight: "400" }}>{address}</span>
          </h3>
        </CardContent>
        <div style={{ padding: "10px" }}>
          <button
            className="btn btn-danger float-end"
            onClick={() => deleteUser(getUserById._id)}
          >
            <DeleteIcon />
          </button>
          <NavLink to={`/edit/${getUserById._id}`}>
            <button className="btn btn-primary float-end me-2">
              <EditIcon />
            </button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
};

export default Details;
