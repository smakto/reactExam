import { Header } from "./components/Header";
import "./App.css";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
