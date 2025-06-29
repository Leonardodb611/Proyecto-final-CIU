import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const userGuardado = localStorage.getItem('usuario');
        if (userGuardado) {
        setUsuario(JSON.parse(userGuardado));
        }
    }, []);

    const login = (userData) => {
        setUsuario(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};