
import React from "react";
import { TbListTree } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { BsShop } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Tabel } from "./tabel";
import { useEffect } from "react";
import { SearchTable } from "../component/search";
import Icon from "../images/logopolos.png";

import { Category } from "./category";

export const Pimpinan = () => {
  const navigate = useNavigate();
  
  function handleHome(){
    document.getElementById("tabelpim").classList.add("d-none");
    document.getElementById("tabelpimterbaru").classList.add("d-none");
    document.getElementById("category").classList.add("d-none");
    document.getElementById("dashboard").classList.remove("d-none");
  }

  function handleJumlah() {
    navigate("/pimpinan/tabel");
  }
  function handleBaru() {
    navigate("/pimpinan/tabel");
    
  }

  function handleCategory() {
    navigate("/pimpinan/category");
  }

  return (
    <div id="pimpinan" className="container-fluid  min-vh-100 ">  
      <div id="dashboard">
        <div className="row d-flex justify-content-center align-items-center mt-3">
          <div className="col-8 col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img src={Icon} alt="icon" className="icon p-2 w-25" />
          </div>
        </div>

        <div className="row d-flex justify-content-center align-items-center mt-3">
          <div className="col-8 col-md-8">
            <SearchTable />
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center mt-3">
          <div
            className="col-md-4 col-lg-2 col-3 card m-3"
            onClick={handleJumlah}
          >
            <div className="card-body row d-flex justify-content-center align-items-center text-center">
              <div className="col-md-3 col-12">
                <CgFileDocument className="fs-1" />{" "}
                {/* Adjust the fs-4 class to set the desired size */}
              </div>
              <div className="col-md-9 justify-content-center align-items-center d-none d-md-block">
                <p className="fs-6">Jumlah Arsip</p>
                <h3 className="fs-4">120</h3>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-lg-2 col-3 card m-3"
            onClick={handleBaru}
          >
            <div className="card-body row d-flex justify-content-center align-items-center text-center">
              <div className="col-md-3 col-12">
                <BsShop className="fs-1" />
              </div>
              <div className="col-md-9 col-9 justify-content-center align-items-center d-none d-md-block">
                <p className="fs-6">Arsip Baru</p>
                <h3 className="fs-4">120</h3>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-lg-2 col-3 card m-3"
            onClick={handleCategory}
          >
            <div className="card-body row d-flex justify-content-center align-items-center text-center">
              <div className="col-md-3 col-12">
                <TbListTree className="fs-1" />
              </div>
              <div className="col-md-9 col-9 justify-content-center align-items-center d-none d-md-block">
                <p className="fs-6">Kategori</p>
                <h3 className="fs-4">120</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="tabelpim" className="d-none">
        <div className="row d-flex justify-content-center align-items-center mt-3 ">
          <Tabel />
        </div>
      </div>
      <div id="tabelpimterbaru" className="d-none">
        <div className="row d-flex justify-content-center align-items-center mt-3 ">
          <Tabel />
        </div>
      </div>
      <div id="category" className="d-none">
        <div className="row d-flex justify-content-center align-items-center mt-3 ">
          <Category />
        </div>
      </div> */}
    </div>
  );
};
