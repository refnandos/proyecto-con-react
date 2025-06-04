import React, { useState } from 'react';
// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost/backend/register/register.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al registrar el usuario");
            }

            alert(data.mensaje || "¡Registro exitoso!");
            navigate('/home');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="main">
            <h2>Registro de Usuario</h2>
            {error && <p >{error}</p>}
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={nombre_usuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required/>
                </div>
                <div >
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>
                <div >
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;