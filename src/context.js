import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");

  favorites
    ? (favorites = JSON.parse(localStorage.getItem("favorites")))
    : (favorites = []);

  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage);

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.meals ? setMeals(data.meals) : setMeals([]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    favoriteMeal
      ? (meal = favorites.find((meal) => meal.idMeal === idMeal))
      : (meal = meals.find((meal) => meal.idMeal === idMeal));
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const alreadyFavorites = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorites) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.idMeal !== idMeal
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites,
        fetchMeals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, allMealsUrl };
