import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Hook afin de récupérer les données
  const [index, setIndex] = useState(0); // Hook qui permet de déclarer une variable d'état et une fonction pour la mettre à jour
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // Si jamais le tableau n'a pas atteint sa longeur maximum je repasse à l'index +1, sinon re passer à 0
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Il faut comparer le ratio bouton avec l'index actif
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
