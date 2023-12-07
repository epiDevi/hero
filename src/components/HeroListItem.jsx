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
  function save() {
    const form = new FormData();
    form.append("id", hero.id);
    form.append("race", raceRef.current.innerText);
    form.append("name", nameRef.current.innerText);
    form.append("universe", universeRef.current.innerText);
    form.append("level", levelRef.current.innerText);
    form.append("superpower", superpowerRef.current.innerText);

    fetch("http://localhost:9696/api/characters", {
      method: "PUT",
      body: form,
    }).then((response) => setRefresh((prev) => !prev));
  }
  console.log(hero.imglink);
  return (
    <div className="grid grid-cols-2 w-6/12 rounded border">
      {hero.imglink && (
        <img
          src={"http://localhost:9696" + hero.imglink.replace(".", "")}
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
      </div>
    </div>
  );
}
