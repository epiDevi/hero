import { useEffect, useState } from "react";
import HeroListItem from "./HeroListItem";
import { v4 } from "uuid";

export default function HeroList({ heroes, setRefresh }) {


    return (
        <section className="flex flex-col gap-5 justify-center p-10">
            {heroes.map(hero => <HeroListItem hero={hero} key={v4()} setRefresh={setRefresh} />)}
        </section>
    )
}