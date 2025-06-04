import { useEffect, useState } from "react";

export const Datosuser = () => {
  
      const [usuarios, setUsuarios] = useState([]);
  
    //USO DE FETCH EN LOCAL
    useEffect(() => {
      fetch("http://localhost/backend/api/usuarios.php")
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
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">Lista de Usuarios</h1>
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>{u.nombre} - {u.email}</li>
          ))}
        </ul>
      </div>
    );
}
