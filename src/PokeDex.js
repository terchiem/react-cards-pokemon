import React from "react";
import { useAxios } from './hooks';
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {

  //formatting card data from axios call
  function formatCardData(cardData){
    let stats = cardData.stats.map(stat => ({
      value: stat.base_stat,
      name: stat.stat.name
    }))
    return( {
      front: cardData.sprites.front_default, 
      back:cardData.sprites.back_default, 
      name: cardData.name, 
      stats});
  }

  const [pokemon, getPokemon, removeData] = useAxios(BASE_URL, formatCardData);

  const addPokemon = async name => {
    getPokemon(name);
  };
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect removeData={removeData} add={addPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(( {id, front, back, name, stats}) => (
          <PokemonCard
            key={id}
            front={front}
            back={back}
            name={name}
            stats={stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
