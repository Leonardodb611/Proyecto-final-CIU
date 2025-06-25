import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [nickName, setNickName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    console.log("handleLogin ejecutado, nickName:", nickName);
    try {
        const response = await fetch("http://localhost:3000/user/getAllUsers");
        if (!response.ok) {
        setErrorMsg("El servidor respondió con un error");
        return;
    }

        const users = await response.json();
        console.log("Usuarios recibidos:", users);
        const userExists = users.find((user) => user.nickName === nickName);
        
        if (userExists) {
            navigate("/home");
        } else {
            setErrorMsg("Usuario no encontrado");
        }
    } catch (error) {
        setErrorMsg("Error en la conexión al servidor");
        //console.error(error);
    }
};
    return (
        <div className="logUser">
            <h3>Log in</h3>
            <form className="loginUserForm" onSubmit={handleLogin}>
                <div className="inputGroup">
                    <label htmlFor="nickName">Usuario</label>
                    <input
                    type="text"
                    id="nickName"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="Ingrese su usuario"
                    autoComplete="off"
                    />
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Ingrese su contraseña"
                    />
                    <button type="submit" className="btn btn-success">
                        Log in
                    </button>
                </div>
            </form>
            <div className="Register">
                <p>Crear cuenta de usuario</p>
                <button type="button" className="btn btn-primary"
                onClick={() => navigate("../Register")}>
                    Registrarse
                </button>
            </div>
        </div>
    )
};

export default Login