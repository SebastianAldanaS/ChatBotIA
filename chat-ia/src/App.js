import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Chat IA Gemini</h1>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={msg.role}>
            <strong>{msg.role === 'user' ? 'Tú' : 'IA'}:</strong>{' '}
            {msg.role === 'assistant' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default App;