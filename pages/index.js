import Image from "next/image";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const MAX_POKEMONS = 251;
  const API_URL = "https://pokeapi.co/api/v2/pokemon/";

  const res = await fetch(`${API_URL}?limit=${MAX_POKEMONS}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>
        <Image
          src={"/images/pokeball.png"}
          width="50"
          height={"50"}
          alt="PokeNext"
        />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
