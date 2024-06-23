import { useState } from "react";
import axios from "../api/index";
import getCookie from "../utils/cookies.utils";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log("Datos del formulario:", data);

    axios.post("auth/login", data);

    const token = getCookie("token");

    if(token !== "")
      window.location.href = "/chat";
    
  };

  return (
    <main className="min-h-[100dvh] flex flex-col px-4 py-4 justify-center items-center gap-5 bg-green-100 text-primary-100">
      <div className="flex text-3xl font-bold bg-green-300 rounded-lg p-5 gap-10 drop-shadow-lg">
        <div className="flex-col items-center justify-center gap-1 hidden md:flex">
          <img src="/public/logo.png" alt="Logo de Chacranet" className="h-auto min-w-full"></img>
          <h3 className="font-kumbh-sans text-center">Soporte al cliente</h3>
        </div>
        <div className="bg-white w-[2px] rounded-xl hidden md:block"></div>
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="font-kumbh-sans text-center">Inicia sesión para atender tus dudas</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full flex items-center md:gap-5 font-kumbh-sans text-xl flex-col md:flex-row">
              <label>Correo electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-800 flex-grow p-3 rounded-lg"
                required
              />
            </div>
            <div className="w-full flex items-center md:gap-5 font-kumbh-sans text-xl flex-col md:flex-row">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-800 flex-grow p-3 rounded-lg"
                required
              />
            </div>
            <button type="submit" className="text-white bg-primary-100 py-4 rounded-lg font-kumbh-sans drop-shadow-lg transition hover:opacity-80">Iniciar sesión</button>
          </form>
          <span className="font-kumbh-sans text-xl text-center">
            ¿Aún no tienes una cuenta? <a href="/register" className="underline transition hover:opacity-80">Registrarse</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
