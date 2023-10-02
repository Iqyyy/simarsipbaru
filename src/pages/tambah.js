import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Icon from "../images/logopolos.png";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const Tambah = () => {
  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    const token = Cookies.get("token");
    if (!token) {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  };

  const [viewPdf, setViewPdf] = useState(null);
  const [catalogValue, setCatalogValue] = useState("");
  const [inputs, setInputs] = React.useState({});
  const [serialNumberValue, setSerialNumberValue] = useState("");
  const [file_numberValue, setFileNumberValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const newplugin = defaultLayoutPlugin();
  const [showModal, setShowModal] = useState(false);
  const [selectedCatalogOption, setSelectedCatalogOption] = useState("");
  const [selectedConditionOption, setSelectedConditionOption] = useState("");
  const [selectedTypeOption, setSelectedTypeOption] = useState("");
  const [selectedBuildingOption, setSelectedBuildingOption] = useState("");
  const [selectedClassOption, setSelectedClassOption] = useState("");
  const [selectedRoomOption, setSelectedRoomOption] = useState("");
  const [selectedRollopackOption, setSelectedRollopackOption] = useState("");
  const [selectedCabinetOption, setSelectedCabinetOption] = useState("");

  const handleModalOpen = () => {
    // Close the modal when needed
    setShowModal(true);
  };
  const handleModalClose = () => {
    // Close the modal when needed
    setShowModal(false);
    navigate(`/${Cookies.get(`role`)}/tabel`);
  };

  const handleChangePdf = (e) => {
    document.getElementById("pdf-viewer").classList.remove("d-none");
    let selectedFile = e.target.files[0];
    setSelectedFile(e.target.files[0]);
    console.log("selectedFile", selectedFile);
    console.log(selectedFile.size);
    if (selectedFile) {
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setViewPdf(e.target.result);
        };
      } else {
        setViewPdf(null);
      }
    } else {
      console.log("Select File");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataIdentitas = new FormData(
      document.getElementById("formIdentitas")
    );
    const formDataLokasi = new FormData(document.getElementById("formLokasi"));
    const archive_code = document
      .getElementById("archive_code")
      .textContent.trim()
      .slice(2);

    const data = {};

    data["archive_code"] = archive_code;

    for (const [key, value] of formDataIdentitas.entries()) {
      data[key] = value;
    }

    for (const [key, value] of formDataLokasi.entries()) {
      data[key] = value;
    }

    if (selectedFile) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = () => {
        const fileData = reader.result.split(",")[1]; // Extract base64 data
        data["archive_file"] = fileData; // Assign the base64 data to the 'archive_file' property

        // Send the data to the server
        sendDataToServer(data);
      };
    } else {
      // If no file selected, send the data without 'archive_file'
      sendDataToServer(data);
    }
  };

  const sendDataToServer = async (data) => {
    try {
      const response = await axios.post("http://localhost:9000/addArchive", {
        token: Cookies.get("token"),
        data: data,
      });
      console.log(response.data);
      handleModalOpen();
    } catch (error) {
      if (error === "ECONNRESET") {
        // Handle ECONNRESET error
        console.error("Connection reset by peer.");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    document.getElementById("tambah").classList.add("act");
    document.getElementById("tambah").classList.remove("text-white");
    checkAuthenticated();
  }, []);

  useEffect(() => {
    generateArchiveCode();
  }, [catalogValue, serialNumberValue, file_numberValue]);

  function generateArchiveCode() {
    const archiveCode = `${catalogValue}/${serialNumberValue}`;
    const archiveCodeElement = document.getElementById("archive_code");
    if (archiveCodeElement) {
      archiveCodeElement.textContent = `${archiveCode}`;
      console.log("Archive Code:", archiveCode);
    }
  }
  const selectCatalogOptions = [
    { value: "", label: "Pilih no indeks katalog" },
    { value: "1", label: "1. Doktrin" },
    { value: "2", label: "2. Organisasi dan Prosedur" },
    { value: "3", label: "3. Perencanaan" },
    { value: "4", label: "4. Sistem" },
    { value: "5", label: "5. Inspeksi dan Pengawasan" },
    { value: "6", label: "6. Intelejen dan Pengamanan" },
    { value: "7", label: "7. Operasi Militer" },
    { value: "8", label: "8. Personel SPRIN" },
    { value: "9", label: "9. Materiil dan Logistik" },
    { value: "10", label: "10. Komunikasi dan Elektronika" },
    { value: "11", label: "11. Teritorial" },
    { value: "12", label: "12. Pendidikan dan Latihan" },
    { value: "13", label: "13. Hukum" },
    { value: "14", label: "14. Penerangan" },
    { value: "15", label: "15. Kesehatan" },
    { value: "16", label: "16. Sejarah" },
    { value: "17", label: "17. Administrasi Umum" },
    { value: "18", label: "18. Keuangan" },
    { value: "19", label: "19. Pembinaan Mental" },
    { value: "20", label: "20. Pembinaan Jasmani" },
    { value: "21", label: "21. Hubungan Internasional" },
    { value: "22", label: "22. Navigasi dan Aeonautika" },
    { value: "23", label: "23. Industri" },
    { value: "24", label: "24. Psikologi" },
    { value: "25", label: "25. Laporan" },
    { value: "26", label: "26. Penelitian dan Pengembangan" },
    { value: "27", label: "27. Survei dan Pemetaan" },
    { value: "28", label: "28. Kumpulan SKEP, KEP KASAU" },
    { value: "29", label: "29. CD/DVD" },
    { value: "30", label: "30. kerjasama" },
    { value: "31", label: "31. Kode Untuk Berkas no 2" },
  ];

  const handleSelectCatalogChange = (selectedCatalogOption) => {
    setSelectedCatalogOption(selectedCatalogOption);
    setCatalogValue(selectedCatalogOption.value); // Gunakan selectedOption.value untuk mengatur catalogValue
  };

  const selectConditionOptions = [
    { value: "1", label: "Baik" },
    { value: "2", label: "Sedang" },
    { value: "3", label: "Rusak" },
  ];
  const handleSelectConditionChange = (selectedConditionOption) => {
    setSelectedConditionOption(selectedConditionOption);
    // setCatalogValue(selectedCatalogOption.value); // Gunakan selectedOption.value untuk mengatur catalogValue
  };

  const selectTypeOptions = [
    { value: "1", label: "Berkas" },
    { value: "2", label: "Buku" },
    { value: "3", label: "Audio" },
    { value: "4", label: "Visual" },
    { value: "5", label: "Film/Video" },
    { value: "6", label: "Kartografi" },
    { value: "7", label: "Elektronik" },
  ];
  const handleSelectTypeOptions = (selectedTypeOption) => {
    setSelectedTypeOption(selectedTypeOption);
  };

  const selectClassOptions = [
    { value: "1", label: "Biasa" },
    { value: "2", label: "Rahasia" },
    { value: "3", label: "Sangat Rahasia" },
  ];
  const handleSelectClassOptions = (selectedClassOption) => {
    setSelectedClassOption(selectedClassOption);
  };

  const selectBuildingOptions = [{ value: "1", label: "Gedung 1" }];
  const handleSelectBuildingOptions = (selectedBuildingOption) => {
    setSelectedBuildingOption(selectedBuildingOption);
  };

  const selectRoomOptions = [
    { value: "1", label: "Ruang 1" },
    { value: "2", label: "Ruang 2" },
  ];
  const handleSelectRoomOptions = (selectedRoomOption) => {
    setSelectedRoomOption(selectedRoomOption);
  };

  const selectRollopackOptions = [
    { value: "1", label: "R-1" },
    { value: "2", label: "R-2" },
    { value: "3", label: "R-3" },
    { value: "4", label: "R-4" },
    { value: "5", label: "R-5" },
    { value: "6", label: "R-6" },
    { value: "7", label: "R-7" },
    { value: "8", label: "R-8" },
    { value: "9", label: "R-9" },
    { value: "10", label: "R-10" },
    { value: "11", label: "R-11" },
    { value: "12", label: "R-12" },
    { value: "13", label: "R-13" },
    { value: "14", label: "R-14" },
    { value: "15", label: "R-15" },
    { value: "16", label: "R-16" },
    { value: "17", label: "R-17" },
    { value: "18", label: "R-18" },
    { value: "19", label: "R-19" },
    { value: "20", label: "R-20" },
  ];
  const handleSelectRollopackOptions = (selectedRollopackOption) => {
    setSelectedRollopackOption(selectedRollopackOption);
  };

  const selectCabinetOptions = [
    { value: "1", labek: "L1" },
    { value: "2", label: "L2" },
    { value: "3", label: "L3" },
    { value: "4", label: "L4" },
    { value: "4", label: "L5" },
  ];
  const handelSelectCabinetOptions = (selectedCabinetOption) => {
    setSelectedCabinetOption(selectedCabinetOption);
  };

  return (
    <div className="container-fluid">
      <div className="row bg-white m-3 rounded p-3 ">
        <h3>A. Identitas</h3>
        <form id="formIdentitas">
          <ul>
            <li className="mb-3 row">
              <label for="archive_code" class="col-sm-2 col-form-label">
                Kode Arsip
              </label>
              <div class="col-sm-9 m-2">
                <span id="archive_code" name="archive_code">
                  :{" "}
                </span>
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_catalog_id" class="col-sm-2 col-form-label">
                Indek Katalog
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_catalog_id"
                  name="archive_catalog_id"
                  options={selectCatalogOptions}
                  value={selectedCatalogOption}
                  onChange={handleSelectCatalogChange}
                  placeholder="Pilih no indeks katalog"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label
                for="archive_serial_number"
                class="col-sm-2 col-form-label"
              >
                No Buku
              </label>
              <div class="col-sm-3 me-5">
                <input
                  type="text"
                  className="form-control"
                  id="archive_serial_number"
                  name="archive_serial_number"
                  placeholder="masukkan no buku"
                  onInput={(e) => setSerialNumberValue(e.target.value)}
                />
              </div>
              <label
                for="archive_file_number"
                class="col-sm-2 col-form-label ms-4"
              >
                No Berkas
              </label>
              <div class="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="archive_file_number"
                  name="archive_file_number"
                  placeholder="masukkan no berkas"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_title" class="col-sm-2 col-form-label">
                Judul
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="archive_title"
                  name="archive_title"
                  placeholder="masukkan judul"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_release_date" class="col-sm-2 col-form-label">
                Tanggal Surat
              </label>
              <div class="col-sm-3">
                <input
                  type="date"
                  className="form-control"
                  id="archive_release_date"
                  name="archive_release_date"
                  placeholder="masukkan judul"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_condition_id" class="col-sm-2 col-form-label">
                Kondisi Arsip
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_condition_id"
                  name="archive_condition_id"
                  options={selectConditionOptions}
                  value={selectedConditionOption}
                  onChange={handleSelectConditionChange}
                  placeholder="Pilih Kondisi Arsip"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_type_id" class="col-sm-2 col-form-label">
                Jenis Arsip
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_type_id"
                  name="archive_type_id"
                  options={selectTypeOptions}
                  Value={selectedTypeOption}
                  onChange={handleSelectTypeOptions}
                  placeholder="Pilih Jenis Arsip"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_class_id" class="col-sm-2 col-form-label">
                Kelas Arsip
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_class_id"
                  name="archive_class_id"
                  options={selectClassOptions}
                  Value={selectedClassOption}
                  onChange={handleSelectClassOptions}
                  placeholder="Pilih kelas arsip"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_agency" class="col-sm-2 col-form-label">
                Asal Instansi
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="archive_agency"
                  name="archive_agency"
                  placeholder="Masukkan Instansi"
                />
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div className="row bg-white m-3 rounded p-3 ">
        <h3>B. Lokasi</h3>
        <form id="formLokasi">
          <ul>
            <li className="mb-3 row">
              <label
                for="archive_loc_building_id"
                class="col-sm-2 col-form-label"
              >
                Gedung
              </label>
              <div class="col-sm-3">
                <Select
                  id="archive_loc_building_id"
                  name="archive_loc_building_id"
                  options={selectBuildingOptions}
                  Value={selectedBuildingOption}
                  onChange={handleSelectBuildingOptions}
                  placeholder="Pilih Gedung"
                />
              </div>
              <label
                for="archive_loc_room_id"
                class="col-sm-2 col-form-label ms-4"
              >
                Ruang
              </label>
              <div class="col-sm-3">
                <Select
                  id="archive_loc_room_id"
                  name="archive_loc_room_id"
                  options={selectRoomOptions}
                  Value={selectedRoomOption}
                  onChange={handleSelectRoomOptions}
                  placeholder="Pilih Ruang"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label
                for="archive_loc_rollopack_id"
                class="col-sm-2 col-form-label"
              >
                Roll O Pack
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_loc_rollopack_id"
                  name="archive_loc_rollopack_id"
                  options={selectRollopackOptions}
                  Value={selectedRollopackOption}
                  onChange={handleSelectRollopackOptions}
                  placeholder="Pilih roll o pack"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_loc_cabinet" class="col-sm-2 col-form-label">
                Lemari
              </label>
              <div class="col-sm-9">
                <Select
                  id="archive_loc_cabinet"
                  name="archive_loc_cabinet"
                  options={selectCabinetOptions}
                  Value={selectedCabinetOption}
                  onChange={handelSelectCabinetOptions}
                  placeholder="Pilih Lemari"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_loc_rack" class="col-sm-2 col-form-label">
                Rak
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="archive_loc_rack"
                  name="archive_loc_rack"
                  placeholder="Masukkan Rak"
                />
              </div>
            </li>
            <li className="mb-3 row">
              <label for="archive_loc_box" class="col-sm-2 col-form-label">
                Box
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="archive_loc_box"
                  name="archive_loc_box"
                  placeholder="Masukkan Box"
                />
              </div>
            </li>
          </ul>
        </form>
        <div>
          <form id="scan">
            <ul>
              <li className="mb-3 row">
                <label for="scan" class="col-sm-2 col-form-label">
                  File Scan
                </label>
                <div class="col-sm-9">
                  <input
                    onChange={handleChangePdf}
                    type="file"
                    className="form-control"
                    id="scan"
                    name="scan"
                    placeholder="Pilih File"
                    accept=".pdf"
                  />
                </div>
              </li>
              <li className="mb-3 row justify-content-center align-items-center">
                <div className="pdf-view d-none col-sm-9 " id="pdf-viewer">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                    {viewPdf && (
                      <>
                        <div className="view">
                          <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                        </div>
                      </>
                    )}
                    {!viewPdf && <></>}
                  </Worker>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>

      <div className="row d-flex flex-column justify-content-between align-items-end">
        <input
          class="col-md-1 col-3 me-5 mt-2 mb-2 btn btn-primary"
          type="submit"
          onClick={handleSubmit}
          value="Submit"
        />
      </div>
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img src={Icon} className="logopop" alt="Icon" />
                  </div>
                  <div className="col">
                    <h4 className="modal-title">Sim Arsip</h4>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body text-center">
                {/* Add your modal content here */}
                <FiCheckCircle className="fs-1 text-success " />
                <h5 className="p-2 m-2">Arsip Berhasil Ditambahkan</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
