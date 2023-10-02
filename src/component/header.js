import React from "react";
import { ImSearch } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { SearchTable } from "./search";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const Header = () => {
  const [userData, setUserData] = useState([]);
  const user_id = Cookies.get("user_id");
  const goback = () => {
    const currentPath = window.location.pathname;

    // window.history.back();
    if (currentPath === "/login") {
      // Jika pengguna berada di halaman awal, arahkan mereka ke halaman lain (misalnya, '/dashboard').
      window.location.href = "/dashboard"; // Gantilah '/dashboard' dengan rute yang sesuai.
    } else {
      // Jika pengguna tidak berada di halaman awal, gunakan window.history.back() sekali saja.
      window.history.back();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:9000/detailUser", {
          user_id,
        });
        setUserData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <header className="">
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="row bg-dark d-flex flex-column justify-content-end align-items-end">
            <div className="d-flex col-3 col-md-3 bg-white rounded-pill justify-content-center m-2 me-5">
              <a
                href={`/${Cookies.get(`role`)}/profile`}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="User"
                className="p-2 d-flex justify-content-center align-items-center text-dark"
              >
                <CgProfile className="prof" />
                {userData.map((user) => (
                  <span className="ms-1 d-none d-md-block" id="username">
                    {user.username}
                  </span>
                ))}
              </a>
            </div>
          </div>
          <div
            className="row d-flex flex-row bg-white align-items-center justify-content-between"
            role="button"
          >
            <div
              className="col-md-2 col-2 d-flex align-items-center justify-content-start"
              onClick={goback}
            >
              <IoChevronBackCircleSharp className="fs-4 col-12 col-md-2" />
              <span className="p-2 d-none d-md-block">Kembali</span>
            </div>
            <div className="col-8 col-md-4 pe-3 d-flex align-items-center justify-content-end p-2">
              <SearchTable />
              {/* <div className="input-group">
                <input
                  id="search"
                  type="text"
                  placeholder="Cari Arsip"
                  className="form-control"
                  onInput={handleSearch}
                />
                <span className="input-group-text">
                  <ImSearch />
                </span>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
