import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Tabel = ({ data }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [archiveData, setArchiveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const verify = async () => {
      let token = Cookies.get(`token`);
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.post("http://localhost:9000/verify", {
            token,
          });
          if (response.status === 200) {
            setIsLogin(true);
            const fetchData = async () => {
              try {
                const response = await axios.post("http://localhost:9000/home");
                setArchiveData(response.data);
              } catch (error) {
                console.error("Error", error);
              }
            };

            fetchData();
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    verify();
  }, [navigate]);

  const handleDetail = async (archive_id) => {
    try {
      navigate(`/${Cookies.get(`role`)}/tabel/detail/${archive_id}`, {
        state: { archiveData },
      });
      console.log("archive_id : ", archive_id);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const filteredArchiveData = archiveData.filter((archive) =>
    searchTerm
      ? Object.values(archive).some((value) =>
          value && typeof value === "string"
            ? value.toLowerCase().includes(searchTerm.toLowerCase())
            : false
        )
      : true
  );

  const totalPages = Math.ceil(filteredArchiveData.length / itemsPerPage);
  const paginatedData = filteredArchiveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-white m-3 rounded p-3 ">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="m-0">Arsip</h1>
          <button
            className="btn btn-dark d-flex align-items-center"
            // onClick={handleTambah}
          >
            <TiArrowSortedDown className="m-2" />
            <span className="d-none d-md-inline">Urutkan</span>
          </button>
        </div>
        <div className="table-responsive mt-3  ">
          <table class="table table-hover text-center ">
            <thead>
              <tr>
                <th scope="col">Tanggal Terbit</th>
                <th scope="col">Jenis</th>
                <th scope="col">Indeks Kategory</th>
                <th scope="col">Judul</th>
                <th scope="col">Instansi Sumber</th>
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {paginatedData.slice(0, 20).map((archive) => (
                <tr
                  key={archive.archive_id}
                  onClick={() => handleDetail(archive.archive_id)}
                >
                  <td>
                    {new Date(archive.archive_timestamp).toLocaleDateString()}
                  </td>
                  <td>{archive.archive_code}</td>
                  <td>{archive.archive_catalog_label}</td>
                  <td>{archive.archive_title}</td>
                  <td>{archive.archive_agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                tabIndex="-1"
                on
                onClick={handlePreviousPage}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a className="page-link" href="#" onClick={handleNextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { Tabel };
