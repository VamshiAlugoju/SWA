import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./pages/Layout";
import Upload from "./pages/Upload";
import People from "./pages/People";
import Invoice from "./pages/Invoice";
import Products from "./pages/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Example from "./components/Example";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useEffect } from "react";

export default function App() {
  const appState = useSelector((state: RootState) => state);
  console.log(import.meta.env.VITE_GENAIKEY, ">>>>>>>>>");
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Upload />} />
          <Route index path="/upload" element={<Upload />} />

          <Route path="/invoice" element={<Invoice />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<People />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

function Temp() {
  return <h1>hello</h1>;
}
