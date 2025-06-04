import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost/backend/login/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar sesión");
            }


            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div >
            <h2>Iniciar Sesión</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        
                    />
                </div>
                <div >
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        
                    />
                </div>
                <button 
                    type="submit"
        >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;