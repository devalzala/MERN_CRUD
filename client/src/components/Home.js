import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [getUserData, setUserData] = useState([]);
  console.log(getUserData);


  const navigate = useNavigate();
  const gotoRegister = () => {
    navigate("/register");
  };

  const onEditClick = () => {
    navigate("/edit");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("https://deval-mern-crud.herokuapp.com/getdata", {
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
      setUserData(data);
      console.log("get data");
      // setINP("");
    }
  };

  const deleteUser = async (id) => {
    const res2 = await fetch(`https://deval-mern-crud.herokuapp.com/deleteuser/${id}`, {
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
      toast.success("User deleted successfully");
      getData();
    }
  };

  return (
    <div className="mt-5">
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
      <div className="container">
        <div className="add_btn mt-2">
          <button className="btn btn-primary" onClick={gotoRegister}>
            Add Data
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {getUserData?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.gender}</td>
                <td className="d-flex">
                  <NavLink to={`/view/${item._id}`}>
                    <button className="btn btn-success mx-2">
                      <RemoveRedEyeIcon />
                    </button>
                  </NavLink>
                  <NavLink to={`/edit/${item._id}`}>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={onEditClick}
                    >
                      <EditIcon />
                    </button>
                  </NavLink>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(item._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
