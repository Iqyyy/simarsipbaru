import { useNavigate, Link, useLocation } from "react-router-dom";
import { RxLayers, RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import Icon from "../images/logopolos.png";
import axios from "axios";
import Cookies from "js-cookie";

export const Bar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Cookies.get("role") !== "admin") {
      const userLink = document.getElementById("user");
      if (userLink) {
        userLink.classList.add("d-none");
      }
    }
  });

  const handleLogClick = () => {
    // Show the modal when the edit icon is clicked
    setShowModal(true);
  };

  const handleModal = () => {
    // Close the modal when needed
    console.log("terpanggil");
    setShowModal(false);
  };

  const handleSubmit = async () => {
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

  return (
    <div className="col-2 d-flex  flex-shrink-0  justify-content-center align-items-center w-100 m-0 ">
      <ul class="nav nav-pills flex-column  w-100">
        <li className="nav-item mb-3 col-12 col-md-12 ">
          <a
            id="ikon"
            className="nav-link d-flex flex-column align-items-center justify-content-center "
            aria-current="page"
          >
            <img src={Icon} alt="icon" className="icon p-2 col-12 col-md-3" />
            <h3 className="fs-3 text-white d-none d-md-block text-center">
              SIM ARSIP
            </h3>
          </a>
        </li>

        <li
          class="nav-item mb-3 col-12 col-md-12 "
          data-placement="bottom"
          title="Dashboard"
        >
          <a
            id="dash"
            className="nav-link text-white "
            aria-current="page"
            href={`/${Cookies.get("role")}`}
          >
            <RxDashboard className="me-2 col-12 col-md-3" />
            <span className="col-md-4 d-none d-md-block w-100">Dashboard</span>
          </a>
        </li>
        <li
          className="nav-item mb-3 col-12 col-md-12  "
          data-placement="bottom"
          title="Tambah Arsip"
        >
          <a
            id="tambah"
            className="nav-link text-white "
            href={`/${Cookies.get(`role`)}/tambah`}
          >
            <RxLayers className="me-2 col-12 col-md-3" />
            <span className="col-md-4 d-none d-md-block w-100">
              Tambah Arsip
            </span>
          </a>
        </li>
        <li
          className="nav-item mb-3 col-12 col-md-12  "
          data-placement="right"
          title="Manajemen User"
        >
          <a
            id="user"
            class="nav-link text-white"
            href={`/${Cookies.get(`role`)}/user`}
          >
            <HiOutlineUsers className="me-2 col-12 col-md-3" />
            <span className="col-md-4 d-none d-md-block w-100">
              Manage User
            </span>
          </a>
        </li>
        <li className="nav-item mb-3 col-12 col-md-12">
          <a
            className="nav-link text-white"
            onClick={handleLogClick}
            data-placement="right"
            title="Keluar"
          >
            <BiLogOut className="me-2 col-12 col-md-3" />
            <span className="col-md-4 d-none d-md-block w-100">Keluar</span>
          </a>
        </li>
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
                    onClick={handleSubmit}
                  >
                    Ya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};
export default Bar;
