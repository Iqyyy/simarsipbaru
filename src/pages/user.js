import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { BsPlusSquare } from "react-icons/bs";
import Cookies from "js-cookie";
import coba from "../images/coba.PNG";
import axios from "axios";
import { BiShow } from "react-icons/bi";
import Icon from "../images/logopolos.png";
import { HiUserCircle } from "react-icons/hi";

export const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const navigate = useNavigate();
  const handleTambah = async (event) => {
    navigate(`/${Cookies.get("role")}/user/tambahuser`);
  };
  const handleHapusClick = (e) => {
    // Show the modal when the edit icon is clicked
    setShowModal(true);
    e.stopPropagation();
  };
  const handleModalClose = (e) => {
    // Close the modal when needed
    setShowModal(false);
    e.stopPropagation();
  };
  const handleHapus = async (username) => {
    try {
      const response = await axios.post("http://localhost:9000/deleteUser", {
        username: username,
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDetail = (user) => {
    document.getElementById("detail").classList.remove("d-none");
    document.getElementById("table").classList.add("col-md-9");

    const { user_id, username, password, level_user_id, satker } = user;

    setUserDetail([user]);

    console.log("clicked user : ", {
      user_id,
      username,
      password,
      level_user_id,
      satker,
    });
  };

  const handleTutupDetail = () => {
    document.getElementById("detail").classList.add("d-none");
    document.getElementById("table").classList.remove("col-md-9");
  };

  const handleEdit = (user_id) => {
    try {
      navigate(`/${Cookies.get("role")}/updateuser/${user_id}`, {
        state: { userData },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    document.getElementById("user").classList.add("act");
    document.getElementById("user").classList.remove("text-white");

    const fetchData = async () => {
      try {
        const token = Cookies.get(`token`);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post("http://localhost:9000/readUser");
        setUserData(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center m-1 mt-4">
        <div id="table" className="bg-white rounded p-3 col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="m-0">Manajemen User</h1>
            <button
              className="btn btn-success d-flex align-items-center"
              onClick={handleTambah}
            >
              <BsPlusSquare className="m-2" />
              <span className="d-none d-md-inline">Tambah User</span>
            </button>
          </div>
          <div className="table-responsive mt-3">
            <table class="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">Role</th>
                  <th scope="col">Satker</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.user_id} onClick={() => handleDetail(user)}>
                    {/* <tr key={user.user_id}> */}
                    <td>{user.user_id}</td>
                    <td>{user.username}</td>
                    <td className="d-none d-md-block">{user.password}</td>
                    <td>{user.level_user_label}</td>
                    <td>{user.satker}</td>
                    <td className="d-none d-md-block">
                      <FaEdit
                        className="ms-2"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Edit User"
                        onClick={() => handleEdit(user.user_id)}
                      />
                      <MdOutlineDeleteOutline
                        className="ms-2"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Delete User"
                        onClick={handleHapusClick}
                      />
                      {showModal && (
                        <div
                          className="modal d-block"
                          tabIndex="-1"
                          role="dialog"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <img
                                      src={Icon}
                                      className="logopop"
                                      alt="Icon"
                                    />
                                  </div>
                                  <div className="col">
                                    <h5 className="modal-title">Hapus User</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-body">
                                {/* Add your modal content here */}
                                <h6>Anda Yakin Ingin Menghapus User ini?</h6>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={handleModalClose}
                                >
                                  Tidak
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleHapus(user.username)}
                                >
                                  Ya
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          id="detail"
          className="d-none col-12 col-md-3 p-2 justify-content-end"
        >
          <div className="row bg-white ms-1 rounded p-2 justify-content-between align-items-center d-flex">
            <div className="row justify-content-start">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleTutupDetail}
              ></button>
            </div>
            <div className="row m-0">
              {userDetail.map((user) => (
                <ul className="">
                  <li className="row justify-content-between align-items-center">
                    <HiUserCircle className="fs-1 m-2 col-md-12" />
                    {/* <label for="code" className=" col-form-label">
                    Username
                  </label> */}
                    <div className="col-md-12 col-12 text-center border border-dark rounded">
                      <span className="fs-4 m-1"> {user.username}</span>
                    </div>
                  </li>
                  <li className="row justify-content-between align-items-center">
                    <label for="code" className="col-md-5 col-5 col-form-label">
                      ID
                    </label>
                    <div className="col-md-7">
                      <span className="">: {user.user_id}</span>
                    </div>
                  </li>

                  <li className="row justify-content-between align-items-center">
                    <label for="code" className="col-md-5 col-5 col-form-label">
                      Role
                    </label>
                    <div className="col-md-7 col-7">
                      <span className="">: {user.level_user_label}</span>
                    </div>
                  </li>
                  <li className="row justify-content-between align-items-center">
                    <label for="code" className="col-md-5 col-5 col-form-label">
                      Satker
                    </label>
                    <div className="col-md-7 col-7">
                      <span className="">: {user.satker}</span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
