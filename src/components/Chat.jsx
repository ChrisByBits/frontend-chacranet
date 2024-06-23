import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/index";
import Message from "./Message";
import getCookie from "../utils/cookies.utils";

const Chat = ({ selectedTicketId, messages, setMessages }) => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getCookie("token");
  const user = jwtDecode(token);

  useEffect(() => {
    if (!selectedTicketId) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`messages/get/${selectedTicketId}`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedTicketId, setMessages]);

  const handleLogout = () => {
    localStorage.removeItem('selectedTicketId');
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = '/';
  };

  if (loading) {
    return (
      <header className="w-full bg-primary-100 text-white font-bold text-2xl p-3">
        <h2>Cargando</h2>
      </header>
    );
  }

  if (error) {
    return <div>Error loading messages.</div>;
  }

  if (messages.length === 0) {
    return (
      <>
        <header className="w-full bg-primary-100 text-white font-bold text-2xl p-3 flex items-center justify-between">
          <h2>Iniciar chat</h2>
          <div className="bg-white text-primary-100 rounded-lg px-2 hover:opacity-80 hover:cursor-pointer transition" onClick={handleLogout}>Cerrar Sesión</div>
        </header>
        <div className="px-4 py-4 h-full"></div>
      </>
    );
  }

  return (
    <>
      <header className="w-full bg-primary-100 text-white font-bold text-2xl p-3 flex items-center justify-between">
        <h2>{user && user.role === 'admin' ? `Chat con ${messages[0].user?.username || 'Unknown'}` : 'Chat con soporte'}</h2>
        <div className="bg-white text-primary-100 rounded-lg px-2 hover:opacity-80 hover:cursor-pointer transition" onClick={handleLogout}>Cerrar Sesión</div>
      </header>
      <div className="px-4 py-4 h-full overflow-auto">
        <ul className="flex-grow">
          {messages.map((m) => (
            <Message
              key={m._id}
              message={m.message}
              image={m.image}
              video = {m.video}
              timestamp={m.date}
              user={m.user}
              isSender={m.user._id === user.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Chat;