import "./App.css";
import { UseGlobalContext } from "./context";

import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";

const App = () => {
  const { showModal, favorites } = UseGlobalContext();

  return (
    <main>
      <Navbar />
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
};

export default App;
