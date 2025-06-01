
import { useState } from "react";
import { Content } from "./Content"

export const Sidebar = () => {
const [show, setShow] = useState(true);

  return (
    <>
            <div className="container">
            <div className="sidebar">
            <h2>Menú</h2>
            <button onClick={() => setShow(!show)}>Inicio</button>
            <button onClick={() => setShow(!show)}>minijuegos</button>
            <button onClick={() => setShow(!show)}>multijugador</button>
            <button onClick={() => setShow(!show)}>multijugador en linea</button>
            <button onClick={() => setShow(!show)}>ranking</button>
            <button onClick={() => setShow(!show)}>ranking mensual</button>
            </div>

            <div className={show ? "" : "hidden"}>
            <Content />
            </div>
        </div>
    </>
  )
}
