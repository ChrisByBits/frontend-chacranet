import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/messages')
      .then((response) => {
        setMessages(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message
    };
    axios.post('http://localhost:3001/messages', data)
      .then((response) => {
        setMessages([...messages, response.data]);
      });
  };

  return (
    <main>
      <h2>Chat</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Enviar mensaje</button>
      </form>
    </main>
  );
}

export default ChatPage;