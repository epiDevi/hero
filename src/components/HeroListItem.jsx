import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HeroListItem({ hero, setRefresh }) {
  const [edit, setEdit] = useState(false);
  const nameRef = useRef();
  const raceRef = useRef();
  const superpowerRef = useRef();
  const universeRef = useRef();
  const levelRef = useRef();

  function deleteHero() {
    const form = new FormData();
    form.append("id", hero.id);
    fetch(import.meta.env.VITE_BACKENDURL + "api/characters", {
      method: "DELETE",
      body: form,
    }).then((response) => setRefresh((prev) => !prev));
  }

  return (
    <div className="grid grid-cols-2 w-6/12 rounded border">
      {hero.imglink && (
        <img
          src={import.meta.env.VITE_BACKENDURL + hero.imglink}
          alt={hero.name}
        />
      )}
      <div>
        <p ref={nameRef} contentEditable={edit}>
          {hero.name}
        </p>
        <p ref={raceRef} contentEditable={edit}>
          {hero.race}
        </p>
        <p ref={superpowerRef} contentEditable={edit}>
          {hero.superpower}
        </p>
        <p ref={universeRef} contentEditable={edit}>
          {hero.universe}
        </p>
        <p ref={levelRef} contentEditable={edit}>
          {hero.level}
        </p>
        <Link to={`/edit/${hero.id}`}>
          <button className="p-5 m-5 border">Edit</button>
        </Link>
        <button onClick={deleteHero} className="border-2 p-3 rounded m-4">
          Delete
        </button>
      </div>
    </div>
  );
}
