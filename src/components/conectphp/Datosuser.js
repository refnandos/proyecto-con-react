import { useEffect, useState } from "react";
import "./datosuser.css";

export const Datosuser = () => {
  
      const [usuarios, setUsuarios] = useState([]);
  
    //USO DE FETCH EN LOCAL
    useEffect(() => {
      fetch("http://localhost/backend/usuarios.php")
        .then((res) => res.json())
        .then((data) => setUsuarios(data))
        .catch((err) => console.error("Error al conectar con PHP:", err));
    }, []); 
  
      //USO DE FETHCH EN SERVIDOR APARTE
    //   useEffect(() => {
    //   fetch("https://if0_39152826.epizy.com/api/usuarios.php")
    //     .then(res => res.json())
    //     .then(data => setUsuarios(data));
    // }, []);
  
    return (

          <div>
            <h1 >Lista de Usuarios</h1>
              
              <table className="info-usuarios">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  {usuarios.map((u) => (
                    <tr key={u.id_usuario}>
                      <td >{u.nombre_usuario} </td>
                      <td >{u.correo_electronico}</td>
                    </tr>
                  
                ))}
              </table>
              
          </div>

    );
}
