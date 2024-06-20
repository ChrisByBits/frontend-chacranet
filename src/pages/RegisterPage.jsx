import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      phone,
      address
    };
    console.log('Datos del formulario:', data);
    axios.post('http://localhost:3001/register', data)
  };

  return (
    <main className="h-dvh flex flex-col justify-center items-center gap-5 bg-primary-300 text-white">
      <div className="text-3xl font-bold bg-primary-400 rounded-lg p-5">
      <h2>Registrate para atender tus dudas</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className='w-full flex gap-5'>
          <label>Nombre de usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-primary-300 flex-grow p-3'/>
        </div>
        <div className='w-full flex gap-5'>
          <label>Correo electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-primary-300 flex-grow p-3'/>
        </div>
        <div className='w-full flex gap-5'>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-primary-300 flex-grow p-3'/>
        </div>
        <div className='w-full flex gap-5'>
          <label>Número de teléfono/celular:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='text-primary-300 flex-grow p-3'/>
        </div>
        <div className='w-full flex gap-5'>
          <label>Dirección:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='text-primary-300 flex-grow p-3'/>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <div>
        ¿Ya tienes una cuenta creada? <a href="/">Iniciar sesión</a>
      </div>
      </div>
    </main>
  );
}

export default RegisterPage;