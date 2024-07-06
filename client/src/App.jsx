import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setErrorMessage("Username and Password are required!");
      setShowMessage(true);
    } else {
      const response = await login(username, password);
      
      if (response) {
        navigate('/inventory');
      } else {
        setErrorMessage("Invalid username or password.");
        setShowMessage(true);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-gray-800 font-sans">
      <div className="border border-gray-300 m-5 p-8 rounded shadow-lg w-[400px] max-w-full">
        <div className="text-3xl text-gray-800 font-bold text-center mb-6">LOG IN</div>

        {showMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-800 font-medium mb-2">Username:</label>
          <input 
            id="username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-600 text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password:</label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-600 text-gray-800"
          />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleLogin} 
            className="bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
