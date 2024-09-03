import React, { useState } from 'react';
import './login.css';
import logo from './assets/logo-new.jpg';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Ordinateur from './Ordinateur';
import Mouvement from './Mouvement';
import Home from './App';
import Login from './login';

function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Formulaire soumis");
    //     console.log("Email:", email);
    //     console.log("Password:", password);
    //     if (email && password) {
    //         console.log("Tentative de redirection vers /home");
    //         window.location.reload('/home');
    //         console.log("Navigation exécutée");
    //     }
    // };

    const handleSubmit = (e) => {
        navigate('/');
        e.preventDefault();
    
        // Remplacez cette logique par votre vérification d'authentification
        if (userName === 'Admin' && password === '1234') {
          // Sauvegarder les informations de l'utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify({ userName }));
    
          // Rediriger vers la page d'accueil ou une autre page
          navigate('/');
        } else {
          alert('Identifiants incorrects');
        }
      };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-container">
                    <img
                        src={logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">Se connecter</button>
                </form>
                
            </div>
        </div>
    );
}

export default LoginPage;