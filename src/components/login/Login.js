import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
    //datos a solicitar para verificar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //muestra el error en caso de
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost/backend/login/login.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},

                body: JSON.stringify({ 
                    email, 
                    password
                 }),

            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar sesión");
            }


            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            navigate('/Home'); 
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };



    return (

        <div className="Formulario">
            <div className='contenido-formulario'>

            <h2>Iniciar Sesión</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='login-correo'>
                    <label htmlFor="correo">Email </label> <br />
                    <input name="correo" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className='login-contraseña'>
                    <label htmlFor="contraseña">contraseña </label> <br />
                    <input name="contraseña" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div>
                <button type="submit" className='btn'>Ingresar</button>

                <button className='cambio'><Link to="/register">NO tienes una cuenta?</Link></button>
                </div>
            </form>

            </div>
        </div>
    );
}

export default Login;