import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const Category = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get(`token`);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post("http://localhost:9000/catalogData");
        console.log(response.data);
        setCatalogData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handleCategory = async (archive_catalog_id) => {
    try {
      navigate(`/${Cookies.get(`role`)}/category/${archive_catalog_id}`, {
        state: { catalogData },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-white m-3 rounded p-3">
        <h1>List Kategori</h1>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead class="">
              <tr>
                <th class="text-center">Indeks Id</th>
                <th class="text-center">Nama Indeks Kategori</th>
                <th class="text-center">Jumlah Arsip</th>
              </tr>
            </thead>
            <tbody>
              {catalogData.map((catalog) => (
                <tr
                  key={catalog.archive_catalog_id}
                  onClick={() => handleCategory(catalog.archive_catalog_id)}
                >
                  <td class="text-center">{catalog.archive_catalog_id}</td>
                  <td class="text-center">{catalog.archive_catalog_label}</td>
                  <td class="text-center">{catalog.cpc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
