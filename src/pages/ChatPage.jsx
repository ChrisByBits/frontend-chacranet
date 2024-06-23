import { useState, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "../api/index";

import TicketSelection from '../components/TicketSelection';
import Chat from '../components/Chat';

import SendIcon from '@mui/icons-material/Send'
import getCookie from '../utils/cookies.utils';

const ChatPage = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const token = getCookie("token");
  const user = jwtDecode(token);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    console.log(`Ticket ID ${ticketId} selected`);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);
    formData.append('ticket', selectedTicketId);

    try {
      const response = await axios.post('messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      const newMessage = {
        _id: response.data._id,
        date: response.data.date,
        message: response.data.message,
        user: {
          _id: response.data.user
        },
        image: response.data.image,
        video: response.data.video,
      };

      setMessages([...messages, newMessage]);
      console.log(messages);
      setMessage(''); // Limpiar el campo de mensaje después de enviar
      setFile(null); // Limpiar el archivo seleccionado
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <main className="h-screen w-full flex px-4 py-4 justify-center items-center bg-green-100 font-kumbh-sans">
      <section className="w-[35%] h-full bg-primary-100 text-white py-3">
        <h1 className="text-2xl font-extrabold px-3">Tickets:</h1>
        <TicketSelection handleTicketClick={handleTicketClick} />
      </section>
      <section className="w-full h-full flex flex-col flex-grow overflow-auto">
        <Chat selectedTicketId={selectedTicketId} messages={messages} setMessages={setMessages} />
        <form className="w-full flex items-center gap-2 px-2" onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Escribe tu mensaje..."
          />
          <button type="submit" className="bg-primary-100 rounded-full p-2 hover:opacity-80 transition">
            <SendIcon className="text-white" />
          </button>
        </form>
      </section>
    </main>
  );
};

export default ChatPage;