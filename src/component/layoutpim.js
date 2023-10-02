import { Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "react-bootstrap"; // Import Dropdown dari react-bootstrap
import Icon from "../images/logopolos.png";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

function Layoutpim() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:9000/detailUser", {
          user_id,
        });
        setUserData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  function handleHome() {
    navigate("/pimpinan");
  }
  function handleSignOutklik() {
    setShowModal(true);
  }
  const handleModal = () => {
    // Close the modal when needed
    setShowModal(false);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/logout`, {
        token: Cookies.get("token"),
      });
      console.log(response);
      if (response.data === "Berhasil Logout") {
        const removeAllCookies = () => {
          const cookies = Cookies.get();
          Object.keys(cookies).forEach((cookieName) => {
            Cookies.remove(cookieName);
          });
        };
        removeAllCookies();

        navigate("/");
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div id="pimpinan" className="container-fluid min-vh-100">
      <div className="row d-flex bg-dark">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div
            className="d-flex align-items-center m-2 text-white"
            onClick={handleHome}
          >
            <AiFillHome className="fs-1" />
            <h4 className="m-2 fs-2 ms-3">SIM ARSIP</h4>
          </div>
          {/* <div className="d-flex col-3 col-md-3 bg-white rounded-pill justify-content-center m-2"> */}
          <Dropdown
            show={isDropdownOpen}
            onClick={toggleDropdown}
            className="d-flex col-3 col-md-3 bg-white align-items-center rounded-pill justify-content-center m-2"
          >
            <Dropdown.Toggle
              className="p-2 d-flex align-items-center justify-content-center bg-white text-dark text-decoration-none col-12 col-md-12 rounded-pill"
              role="button"
              id="dropdown-basic"
            >
              <CgProfile className="prof" />
              {userData.map((user) => (
                <span className="ms-1 d-none d-md-block" id="username">
                  {user.username}
                </span>
              ))}
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-2 align-items-center justify-content-center text-center bg-white text-dark col-12 col-md-12 ">
              {/* <Dropdown.Item onClick={handleProfile} className="dropdown-menu-item">Profile</Dropdown.Item> */}
              <Dropdown.Item
                onClick={handleSignOutklik}
                className="dropdown-menu-item"
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* </div> */}
        </div>
        {showModal && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content text-dark">
                <div className="modal-header">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <img src={Icon} className="logopop" alt="Icon" />
                    </div>
                    <div className="col">
                      <h5 className="modal-title">Peringatan</h5>
                    </div>
                  </div>
                </div>
                <div className="modal-body">
                  {/* Add your modal content here */}
                  <h6>Anda yakin untuk keluar?</h6>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModal}
                  >
                    Tidak
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Ya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row d-flex justify-content-center align-items-center mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Layoutpim;
