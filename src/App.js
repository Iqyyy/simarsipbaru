import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Tambah } from "./pages/tambah";
import { Tabel } from "./pages/tabel";
import { User } from "./pages/user";
import Layout from "./component/layout";
import { Category } from "./pages/category";
import { Detail } from "./pages/detailarsip";
import { TambahUser } from "./pages/tambahuser";
import { useEffect } from "react";
import { Update } from "./pages/updatearsip";
import { UpdateUser } from "./pages/updateuser";
import { Profile } from "./pages/profile";
import { Terbaru } from "./pages/terbaru";
import { Catalog } from "./pages/catalog";
import { Pimpinan } from "./pages/pimpinan";
import Layoutpim from "./component/layoutpim";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Routes for admin */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/tambah" element={<Tambah />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/tabel" element={<Tabel />} />
          <Route path="/admin/tabel/detail/:archive_id" element={<Detail />} />
          <Route path="/admin/terbaru" element={<Terbaru />} />
          <Route
            path="/admin/terbaru/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/admin/updatearsip/:archive_id" element={<Update />} />
          <Route path="/admin/updateuser/:user_id" element={<UpdateUser />} />
          <Route path="/admin/user/tambahuser" element={<TambahUser />} />
          <Route path="/admin/category" element={<Category />} />
          <Route
            path="/admin/category/:archive_catalog_id"
            element={<Catalog />}
          />
          <Route
            path="/admin/category/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>

        {/* Routes for Operator */}
        <Route path="/operator" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/operator/dashboard" element={<Dashboard />} />
          <Route path="/operator/tambah" element={<Tambah />} />
          <Route path="/operator/tabel" element={<Tabel />} />
          <Route
            path="/operator/tabel/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/operator/terbaru" element={<Terbaru />} />
          <Route
            path="/operator/terbaru/detail/:archive_id"
            element={<Detail />}
          />
          <Route
            path="/operator/updatearsip/:archive_id"
            element={<Update />}
          />
          <Route path="/operator/category" element={<Category />} />
          <Route
            path="/operator/category/:archive_catalog_id"
            element={<Catalog />}
          />
          <Route
            path="/operator/category/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/operator/profile" element={<Profile />} />
        </Route>

        {/* Routes for pimpinan */}
        <Route path="/pimpinan" element={<Layoutpim />}>
          <Route index element={<Pimpinan />} />
          <Route path="/pimpinan/tabel" element={<Tabel />} />
          <Route
            path="/pimpinan/tabel/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/pimpinan/terbaru" element={<Terbaru />} />
          <Route
            path="/pimpinan/terbaru/detail/:archive_id"
            element={<Detail />}
          />
          <Route path="/pimpinan/category" element={<Category />} />
          <Route
            path="/pimpinan/category/:archive_catalog_id"
            element={<Catalog />}
          />
          <Route
            path="/pimpinan/category/detail/:archive_id"
            element={<Detail />}
          />
        </Route>
        <Route path="/pimpinan/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
