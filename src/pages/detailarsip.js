import { Viewer, Worker } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  DefaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { BsPlusSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidDownload } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Detail = () => {
  const [archiveData, setArchiveData] = useState([]);
  const { archive_id } = useParams();
  const [isLogin, setIsLogin] = useState(false);
  const newplugin = defaultLayoutPlugin();
  const [viewPdf, setViewPdf] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      let token = localStorage.getItem("token") || cookies.get(`token`);
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
                const response = await axios.post(
                  "http://localhost:9000/archiveDetail",
                  { archive_id }
                );

                const archivedata = response.data;
                setArchiveData(archivedata);

                const uint8Array = new Uint8Array(
                  archivedata[0].archive_file.data
                );
                const binaryData = uint8Array.reduce(
                  (acc, byte) => acc + String.fromCharCode(byte),
                  ""
                );
                const base64Data = btoa(binaryData);

                console.log("base65data :", base64Data);

                setViewPdf(base64Data);

                if (cookies.get(`role`) != "admin") {
                  document
                    .getElementById("buttonupdate")
                    .classList.add("d-none");
                }
              } catch (error) {
                console.log("Error", error);
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

  const handleupdate = () => {
    try {
      navigate(`/${cookies.get(`role`)}/updatearsip/${archive_id}`, {
        state: { archiveData },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDownload = () => {
    if (!archiveData || !archiveData[0] || !archiveData[0].archive_title) {
      console.error("Archive data or filename not available.");
      return;
    }

    const fileName = `${archiveData[0].archive_title}.pdf`;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${viewPdf}`;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid">
      {archiveData.map((archive) => (
        <div className="row bg-white m-3 rounded p-3">
          <div className="d-flex justify-content-between align-items-center p-2">
            <h1 className="m-0 ">Detail Arsip</h1>
            <div className="d-flex p-2">
              <button
                className="btn btn-success d-flex align-items-center me-2 "
                onClick={handleDownload}
              >
                <BiSolidDownload className="m-2" />
                <span className="d-none d-md-inline">Download</span>
              </button>
              <button
                id="buttonupdate"
                className="btn btn-secondary d-flex align-items-center"
                onClick={handleupdate}
              >
                <BsPlusSquare className="m-2" />
                <span className="d-none d-md-inline">Update Arsip</span>
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <h4 className="bg-dark text-white p-2 ps-4 rounded">
              Identitas Arsip
            </h4>
            <ul>
              <li className="mb-3 row">
                <label for="code" class="col-sm-2 col-form-label">
                  Kode Arsip
                </label>
                <div class="col-sm-9 m-2">
                  <span className="catalog">{archive.archive_code}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="catalog" class="col-sm-2 col-form-label">
                  Indeks Katalog
                </label>
                <div class="col-sm-9 m-2">
                  <span className="catalog">
                    {archive.archive_catalog_label}
                  </span>
                </div>
                <li className="mb-3 row">
                  <label for="catalog" class="col-sm-2 col-form-label">
                    No Buku
                  </label>
                  <div class="col-sm-9 m-2">
                    <span className="catalog">
                      : {archive.archive_serial_number}
                    </span>
                  </div>
                </li>
                <li className="mb-3 row">
                  <label for="catalog" class="col-sm-2 col-form-label">
                    No Naskah
                  </label>
                  <div class="col-sm-9 m-2">
                    <span className="catalog">
                      : {archive.archive_file_number}
                    </span>
                  </div>
                </li>
              </li>
              <li className="mb-3 row">
                <label for="tittle" class="col-sm-2 col-form-label">
                  Judul
                </label>
                <div class="col-sm-9 m-2">
                  <span className="tittle">{archive.archive_title}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="Release_date" class="col-sm-2 col-form-label">
                  Tanggal Surat
                </label>
                <div class="col-sm-9 m-2">
                  <span className="Release_date">
                    {archive.archive_release_date}
                  </span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="timestamp" class="col-sm-2 col-form-label">
                  Tanggal Input
                </label>
                <div class="col-sm-9 m-2">
                  <span className="timestamp">{archive.archive_timestamp}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="condition_id" class="col-sm-2 col-form-label">
                  Kondisi Arsip
                </label>
                <div class="col-sm-9 m-2">
                  <span className="condition_id">
                    {archive.archive_condition_label}
                  </span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="type" class="col-sm-2 col-form-label">
                  Jenis Arsip
                </label>
                <div class="col-sm-9 m-2">
                  <span className="type">{archive.archive_type_label}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="class" class="col-sm-2 col-form-label">
                  Kelas Arsip
                </label>
                <div class="col-sm-9 m-2">
                  <span className="class">{archive.archive_class_label}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="agency" class="col-sm-2 col-form-label">
                  Asal Instansi
                </label>
                <div class="col-sm-9 m-2">
                  <span className="agency">{archive.archive_agency}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="row mt-2">
            <h4 className="bg-dark text-white p-2 ps-4 rounded">
              Lokasi Penyimpanan Arsip
            </h4>
            <ul>
              <li className="mb-3 row">
                <label for="building" class="col-sm-2 col-form-label">
                  No Gedung
                </label>
                <div class="col-sm-9 m-2">
                  <span className="building">{archive.loc_building_label}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="room" class="col-sm-2 col-form-label">
                  Ruang
                </label>
                <div class="col-sm-9 m-2">
                  <span className="room">{archive.loc_room_label}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="rollopack" class="col-sm-2 col-form-label">
                  Roll O Pack
                </label>
                <div class="col-sm-9 m-2">
                  <span className="rollopack">
                    {archive.loc_rollopack_label}
                  </span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="cabinet" class="col-sm-2 col-form-label">
                  Lemari
                </label>
                <div class="col-sm-9 m-2">
                  <span className="cabinet">{archive.loc_cabinet_label}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="rack" class="col-sm-2 col-form-label">
                  Rak
                </label>
                <div class="col-sm-9 m-2">
                  <span className="rack">{archive.archive_loc_rack}</span>
                </div>
              </li>
              <li className="mb-3 row">
                <label for="box" class="col-sm-2 col-form-label">
                  Box
                </label>
                <div class="col-sm-9 m-2">
                  <span className="box">{archive.archive_loc_box}</span>
                </div>
              </li>
              <li className="mb-3 row justify-content-center align-items-center">
                <div className="pdf-view col-sm-9" id="pdf-viewer">
                  {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                    {viewPdf && (
                      <div className="view">
                        <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                      </div>
                    )}
                  </Worker> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
