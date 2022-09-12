import { UseGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  const { loading, meals, selectMeal, addToFavorites } = UseGlobalContext();

  return loading ? (
    <section className="section">
      <h4>Loading...</h4>
    </section>
  ) : meals.length > 0 ? (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              className="img"
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavorites(idMeal)}
              >
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  ) : (
    <section className="section">
      <h4>No meals matched your search term. Please try again!</h4>
    </section>
  );
};
export default Meals;
