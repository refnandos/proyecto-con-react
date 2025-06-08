import { useState } from 'react';
// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_usuario, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al registrar el usuario");
            }

            alert(data.mensaje || "¡Registro exitoso!");
            navigate('/login');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="Formulario">
            <div className='contenido-formulario'>
                <h2>Registro de Usuario</h2>
                {error && <p >{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='register-usuario'>
                        <label htmlFor="usuario">Nombre usuario </label> <br />
                        <input name='usuario' type="text" placeholder="Nombre de usuario" value={nombre_usuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
                    </div>
                    <div className='register-usuario'>
                        <label htmlFor="correo">Email </label> <br />
                        <input name='correo' type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='register-contraseña'>
                        <label htmlFor="contraseña">Contraseña </label> <br />
                        <input name='contraseña' type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                    <button type="submit" className='btn'>Registrarse</button>

                    <button className='cambio'><Link to="/login">tienes una cuenta?</Link></button>
                
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;