import { useState } from 'react';
import { useEffect } from "react";



export const Home = () => {
  const [id_usuario, setId] = useState(false);

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('usuario'));
      if(user){ setId(user)}
    }, []);

  return (
    
      <div className="main">
        {JSON.parse(localStorage.getItem('usuario')).id}
        <p>{id_usuario.id}</p>
        <br />

      </div>
  )
}
