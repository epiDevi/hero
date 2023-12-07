import { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditPage() {
  const [refresh, setRefresh] = useState(false);
  const [hero, setHero] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:9696/api/characters/" + id)
      .then((res) => res.json())
      .then((data) => setHero(data));
  }, [refresh]);

  function editHero(e) {
    e.preventDefaul();
    const form = FormData(e.target);
    form.append("id", id);
    fetch("http://localhost:9696/api/characters/", {
      method: "PUT",
      body: form,
    }).then((res) => setRefresh((prev) => !prev));
  }
  function deleteHero(e) {}
  return hero ? (
    <main>
      <section>
        <img src={"http://localhost:9696/" + hero.imglink} alt={hero.name} />
      </section>

      <form onSubmit={editHero}>
        <div>
          <label htmlFor="heroname">Name des Helden</label>
          <input
            type="text"
            id="heroname"
            name="name"
            defaultValue={hero.name}
          />
        </div>
        <div>
          <label htmlFor="heropowerlevel">Powerlevel</label>
          <input
            type="number"
            id="heropowerlevel"
            name="level"
            defaultValue={hero.level}
            min={0}
            max={10}
          />
        </div>
        <div>
          <label htmlFor="herouniverse">Aus welchem Universum </label>
          <input
            type="text"
            id="herouniverse"
            name="universe"
            defaultValue={hero.universe}
          />
        </div>
        <div>
          <label htmlFor="herorace">Welche Rasse </label>
          <input
            type="text"
            id="herorace"
            name="race"
            defaultValue={hero.race}
          />
        </div>
        <div>
          <label htmlFor="heropower">Superkraft</label>
          <input
            type="text"
            id="heropower"
            name="superpower"
            defaultValue={hero.superpower}
          />
        </div>
        <div>
          <label htmlFor="imglink">Ein Bild</label>
          <input type="file" name="imglink" id="imglink" />
        </div>
        <div>
          <label htmlFor="herovillain">Held oder Bösewicht</label>
          <select name="herovillain" id="herovillain">
            <option value="hero">Held</option>
            <option value="villain">Bösewicht</option>
          </select>
        </div>
        <input type="submit" value="Absenden" />
        <button onClick={deleteHero}>Delete</button>
      </form>
    </main>
  ) : (
    <main>
      <h2>Loading....</h2>
    </main>
  );
}
