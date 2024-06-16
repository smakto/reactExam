import { Header } from "./components/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
