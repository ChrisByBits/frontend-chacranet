import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import axios from "../api/index";
import Ticket from "./Ticket";
import getCookie from "../utils/cookies.utils";

const TicketSelection = ({ handleTicketClick }) => {
  const [tickets, setTickets] = useState([]);
  const [newTicketDescription, setNewTicketDescription] = useState('');

  const token = getCookie("token");
  const user = jwtDecode(token);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("tickets");
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleNewTicket = async () => {
    try {
      const response = await axios.post("tickets/create", {
        description: newTicketDescription
      });
      // Añadir el nuevo ticket a la lista de tickets
      setTickets([...tickets, {
        _id: response.data._id,
        user: {
          username: user.username
        },
        description: newTicketDescription
      
      }]);
      // Limpiar el campo de descripción del nuevo ticket
      setNewTicketDescription('');
    } catch (error) {
      console.error('Error creating new ticket:', error);
    }
  };

  return (
    <ul className="gap-3 py-3">
      {tickets.map((t) => (
        <Ticket key={t._id} user={t.user} description={t.description} onClick={() => handleTicketClick(t._id)} />
      ))}
      {user.role !== "admin" &&
        <li className="w-full h-32 flex items-center gap-5 bg-primary-200 px-3 border-t-2 border-t-green-200" onClick={() => handleTicketClick(null)}>
          <div className="w-[20%] flex justify-center">
            <span className="rounded-full size-16 flex justify-center items-center text-3xl bg-primary-100 hover:opacity-80 transition hover:cursor-pointer" onClick={handleNewTicket}>+</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="w-full ">Nuevo ticket:</p>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-gray-800" placeholder="Descripción del ticket" value={newTicketDescription} onChange={(e) => setNewTicketDescription(e.target.value)} />
          </div>
          
        </li>
      }
    </ul>
  );
};

export default TicketSelection;
