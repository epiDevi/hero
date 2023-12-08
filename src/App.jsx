import { useState, useEffect } from "react";
import HeroForm from "./components/HeroForm";
import HeroList from "./components/HeroList";
function App() {
  const [heroes, setHeroes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKENDURL + "api/characters")
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data);
      });
  }, [refresh]);

  return (
    <main className="grid grid-cols-2 gap-5 p-10">
      <HeroList heroes={heroes} setRefresh={setRefresh} />
      <HeroForm setRefresh={setRefresh} />
    </main>
  );
}

export default App;
