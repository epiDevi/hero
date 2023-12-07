import { useState } from "react";
export default function HeroForm(props) {
  const [err, setErr] = useState(null);
  function senden(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    fetch("http://localhost:9696/api/characters", {
      method: "POST",
      body: form,
    }).then((response) => {
      if (response.ok) {
        props.setRefresh((prev) => !prev);
        event.target.reset();
      } else {
        response.json().then((data) => setErr(data));
      }
    });
  }
  return (
    <form onSubmit={senden}>
      {err && (
        <div className="p-5 text-4xl text-white bg-red-500">{err.message}</div>
      )}
      <div>
        <label htmlFor="heroname">Name des Helden</label>
        <input type="text" id="heroname" name="name" required />
      </div>
      <div>
        <label htmlFor="heropowerlevel">Powerlevel</label>
        <input
          type="number"
          id="heropowerlevel"
          name="level"
          min={0}
          max={10}
        />
      </div>
      <div>
        <label htmlFor="herouniverse">Aus welchem Universum </label>
        <input type="text" id="herouniverse" name="universe" />
      </div>
      <div>
        <label htmlFor="herorace">Welche Rasse </label>
        <input type="text" id="herorace" name="race" />
      </div>
      <div>
        <label htmlFor="heropower">Superkraft</label>
        <input type="text" id="heropower" name="superpower" />
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
    </form>
  );
}
