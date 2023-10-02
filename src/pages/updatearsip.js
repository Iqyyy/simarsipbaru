import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Icon from "../images/logopolos.png";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Select from "react-select";

export const Update = () => {
  const [viewPdf, setViewPdf] = useState(null);
  const [catalogValue, setCatalogValue] = useState("");
  const [serialNumberValue, setSerialNumberValue] = useState("");
  const newplugin = defaultLayoutPlugin();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [archiveData, setArchiveData] = useState([]);
  const [archiveDataupdate, setArchiveDataUpdate] = useState([]);
  const { archive_id } = useParams();
  const navigate = useNavigate();
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
    navigate("/tabel");
  };

  const handleChangePdf = (e) => {
    document.getElementById("pdf-viewer").classList.remove("d-none");
    let selectedFile = e.target.files[0];
    console.log(selectedFile.size);
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setViewPdf(e.target.result);
      };
    } else {
      setViewPdf(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArchiveDataUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(archiveDataupdate);
  };

  const handleSubmit = async () => {
    console.log(archiveDataupdate);
    sendDataToServer(archiveDataupdate);
  };

  const sendDataToServer = async (archiveData) => {
    try {
      archiveData["archive_id"] = archive_id;
      const response = await axios.post("http://localhost:9000/updateArchive", {
        token: Cookies.get("token"),
        data: archiveData,
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
    // document.getElementById("tambah").classList.add("act");
    // document.getElementById("tambah").classList.remove("text-white");

    const fetchData = async () => {
      try {
        const token = Cookies.get(`token`);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post(
          "http://localhost:9000/archiveDetail",
          { archive_id }
        );
        console.log(response.data);
        setArchiveData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    generateArchiveCode();
  }, [catalogValue, serialNumberValue]);

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
    setArchiveDataUpdate({
      ["archive_catalog_id"]: selectedCatalogOption.value,
    });
    console.log(selectedCatalogOption.value);
    console.log(archiveDataupdate);
    setCatalogValue(selectedCatalogOption.value); // Gunakan selectedOption.value untuk mengatur catalogValue
  };

  const selectConditionOptions = [
    { value: "1", label: "Baik" },
    { value: "2", label: "Sedang" },
    { value: "3", label: "Rusak" },
  ];
  const handleSelectConditionChange = (selectedOption) => {
    setArchiveDataUpdate({ ["archive_condition_id"]: selectedOption.value });
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
    setArchiveDataUpdate({ ["archive_type_id"]: selectedTypeOption.value });
  };

  const selectClassOptions = [
    { value: "1", label: "Biasa" },
    { value: "2", label: "Rahasia" },
    { value: "3", label: "Sangat Rahasia" },
  ];
  const handleSelectClassOptions = (selectedClassOption) => {
    setArchiveDataUpdate({ ["archive_class_id"]: selectedClassOption.value });
  };

  const selectBuildingOptions = [{ value: "1", label: "Gedung 1" }];
  const handleSelectBuildingOptions = (selectedBuildingOption) => {
    setArchiveDataUpdate({
      ["archive_building_id"]: selectedBuildingOption.value,
    });
  };

  const selectRoomOptions = [
    { value: "1", label: "Ruang 1" },
    { value: "2", label: "Ruang 2" },
  ];
  const handleSelectRoomOptions = (selectedRoomOption) => {
    setArchiveDataUpdate({ ["archive_loc_room_id"]: selectedRoomOption.value });
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
  const handleSelectRollopackOptions = (selectedRollOpackOption) => {
    setArchiveDataUpdate({
      ["archive_loc_rollopack_id"]: selectedRollOpackOption.value,
    });
  };

  const selectCabinetOptions = [
    { value: "1", labek: "L1" },
    { value: "2", label: "L2" },
    { value: "3", label: "L3" },
    { value: "4", label: "L4" },
    { value: "4", label: "L5" },
  ];
  const handleSelectCabinetOptions = (selectedCabinetOption) => {
    setArchiveDataUpdate({
      ["archive_loc_cabinet"]: selectedCabinetOption.value,
    });
  };

  return (
    <div className="container-fluid">
      {archiveData.map((archive) => (
        <div>
          <div className="row m-3 p-1 rounded bg-dark">
            <h1 className="text-white text-center">Update Arsip</h1>
          </div>
          <div className="row bg-white m-3 rounded p-3 ">
            <h3>A. Identitas</h3>
            <form id="formIdentitas">
              <ul>
                <li className="mb-3 row">
                  <label for="archive_code" class="col-sm-2 col-form-label">
                    Kode Arsip
                  </label>
                  <div class="col-sm-9 m-2">
                    <span
                      id="archive_code"
                      name="archive_code"
                      defaultValue={archive.archive_code}
                      onChange={handleChange}
                    ></span>
                  </div>
                </li>
                <li className="mb-3 row">
                  <label
                    for="archive_catalog_id"
                    class="col-sm-2 col-form-label"
                  >
                    Indeks Katalog
                  </label>
                  <div class="col-sm-9">
                    <Select
                      id="archive_catalog_id"
                      name="archive_catalog_id"
                      options={selectCatalogOptions}
                      defaultValue={{
                        value: archive.archive_catalog_id,
                        label: archive.archive_catalog_label,
                      }}
                      onChange={
                        // (e) => {
                        //   handleSelectCatalogChange(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_catalog_id",
                              value: selectedOption.value,
                            },
                          });
                          setCatalogValue(selectedOption.value);
                        }
                        // handleChange(e);
                      }
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
                  <div class="col-sm-3 ">
                    <input
                      type="number"
                      className="form-control"
                      id="archive_serial_number"
                      name="archive_serial_number"
                      placeholder="masukkan no buku"
                      defaultValue={archive.archive_serial_number}
                      onInput={(e) => setSerialNumberValue(e.target.value)}
                      onChange={(e) => setSerialNumberValue(e.target.value)}
                    />
                  </div>
                  <label
                    for="archive_file_number"
                    class="col-sm-2 col-form-label "
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
                      defaultValue={archive.archive_file_number}
                      onChange={handleChange}
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
                      defaultValue={archive.archive_title}
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li className="mb-3 row">
                  <label
                    for="archive_release_date"
                    class="col-sm-2 col-form-label"
                  >
                    Tanggal Surat
                  </label>
                  <div class="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      id="archive_release_date"
                      name="archive_release_date"
                      placeholder="masukkan judul"
                      defaultValue={archive.archive_release_date}
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li className="mb-3 row">
                  <label
                    for="archive_condition_id"
                    class="col-sm-2 col-form-label"
                  >
                    Kondisi Arsip
                  </label>
                  <div class="col-sm-9">
                    <Select
                      id="archive_condition_id"
                      name="archive_condition_id"
                      options={selectConditionOptions}
                      defaultValue={{
                        value: archive.archive_condition_id,
                        label: archive.archive_condition_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectConditionChange(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_condition_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
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
                      defaultValue={{
                        value: archive.archive_type_id,
                        label: archive.archive_type_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectTypeOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_type_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
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
                      defaultValue={{
                        value: archive.archive_class_id,
                        label: archive.archive_class_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectClassOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_class_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
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
                      defaultValue={archive.archive_agency}
                      onChange={handleChange}
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
                      defaultValue={{
                        value: archive.archive_loc_building_id,
                        label: archive.loc_building_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectBuildingOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_loc_building_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
                      placeholder="Pilih Gedung"
                    />
                  </div>
                  <label
                    for="archive_loc_room_id"
                    class="col-sm-2 col-form-label "
                  >
                    Ruang
                  </label>
                  <div class="col-sm-3">
                    <Select
                      id="archive_loc_room_id"
                      name="archive_loc_room_id"
                      options={selectRoomOptions}
                      defaultValue={{
                        value: archive.archive_loc_room_id,
                        label: archive.loc_room_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectRoomOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_loc_room_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
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
                      defaultValue={{
                        value: archive.archive_loc_rollopack_id,
                        label: archive.loc_rollopack_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectRollopackOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_loc_rollopack_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
                      placeholder="Pilih roll o pack"
                    />
                  </div>
                </li>
                <li className="mb-3 row">
                  <label
                    for="archive_loc_cabinet"
                    class="col-sm-2 col-form-label"
                  >
                    Lemari
                  </label>
                  <div class="col-sm-9">
                    <Select
                      id="archive_loc_cabinet"
                      name="archive_loc_cabinet"
                      options={selectCabinetOptions}
                      defaultValue={{
                        value: archive.archive_loc_cabinet_id,
                        label: archive.loc_cabinet_label,
                      }}
                      onChange={
                        //   (e) => {
                        //   handleSelectCabinetOptions(e);
                        // }
                        (selectedOption) => {
                          handleChange({
                            target: {
                              name: "archive_loc_cabinet_id",
                              value: selectedOption.value,
                            },
                          });
                        }
                      }
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
                      defaultValue={archive.archive_loc_rack}
                      onChange={handleChange}
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
                      defaultValue={archive.archive_loc_box}
                      onChange={handleChange}
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
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ))}
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
                <h5 className="p-2 m-2">Arsip Berhasil Di Update</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
