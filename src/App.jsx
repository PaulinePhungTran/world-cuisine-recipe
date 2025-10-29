import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("");
  const [favorites, setFavorites] = useState([]); // ❤️ Favorites
  const [showFavorites, setShowFavorites] = useState(false); // 👀 Show only favorites
  const [error, setError] = useState(null); // ⚠️ Error state

  // ✅ Fetch data using useEffect + async/await
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${
            searchQuery || "pasta"
          }&number=20&apiKey=7178786dafcf4a08a64c407a6455f44e`
        );
        setRecipes(res.data.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Oops! Couldn’t load recipes. Try again later.");
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  // ✅ Filter by cuisine (stretch feature)
  const filteredRecipes = recipes.filter((recipe) =>
    filterCuisine ? recipe.cuisine === filterCuisine : true
  );

  // ✅ Toggle favorite recipes
  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  // ✅ Choose which list to display
  const displayedRecipes = showFavorites ? favorites : filteredRecipes;

  // ✅ Summary stats
  const totalRecipes = filteredRecipes.length;

  return (
    <div className="App">
      <Header />

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ Filter Dropdown */}
      <select onChange={(e) => setFilterCuisine(e.target.value)}>
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Asian">Asian</option>
        <option value="Mexican">Mexican</option>
        <option value="American">American</option>
      </select>

      {/* 💛 Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "Show All Recipes" : "❤️ Show Favorites Only"}
      </button>

      {/* ✅ Summary Stats */}
      <div className="stats">
        <p>Total Recipes: {totalRecipes}</p>
        <p>❤️ Favorites: {favorites.length}</p>
      </div>

      {/* 🚨 Error Message */}
      {error && <p className="error">{error}</p>}

      {/* ❌ Empty State */}
      {displayedRecipes.length === 0 ? (
        <p className="empty">No recipes found ❌</p>
      ) : (
        <div className="recipe-list">
          {displayedRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.id === recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
