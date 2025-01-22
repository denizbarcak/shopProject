import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Backend'e POST isteği gönder
      const response = await axios.post("http://localhost:3000/login", {
        usernameOrEmail: username,
        password: password,
      });

      // Yanıt başarılıysa
      if (response.status === 200) {
        alert("Giriş yapıldı!");
      }
    } catch (err) {
      // Hata durumunda mesaj göster
      setError(err.response?.data?.error || "Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="bg-green-800 h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="E-Posta Veya Kullanıcı Adı"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Şifrenizi Giriniz"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 hover:scale-105 transform transition-transform duration-200 w-full"
        >
          Giriş
        </button>
      </div>
    </div>
  );
}

export default App;
