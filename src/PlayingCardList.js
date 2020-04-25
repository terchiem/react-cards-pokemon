import React from "react";
import { useAxios } from './hooks';
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck/new/draw";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {

  //formatting card data from axios call
  function formatCardData(cardData){
    return {image: cardData.cards[0].image};
  }
  const [cards, addCards, removeData] = useAxios(BASE_URL, formatCardData);
  const addCard = async () => {
    addCards();
  };

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
        <button onClick={removeData}>Start Over!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(({ image, id }) => (
          <PlayingCard key={id} front={image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
