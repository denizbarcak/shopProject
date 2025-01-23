import React from "react";
import Header from "./components/Header"; // Header bileşenini içe aktarıyoruz

function App() {
  return (
    <div>
      {/* Header bileşeni tüm sayfalarda görünür */}
      <Header />

      {/* Ana içerik alanı */}
      <div className="pt-20 px-4">
        <h2 className="text-2xl font-semibold">Merhaba, bu uygulamanın ana sayfasıdır!</h2>
        <p className="mt-4">Burada sayfanızın içeriklerini oluşturabilirsiniz.</p>
      </div>
    </div>
  );
}

export default App;
