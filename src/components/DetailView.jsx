import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./DetailView.css";

/**
 * DetailView.jsx
 * Displays full information for a single recipe (title, image, summary, ingredients, instructions).
 * Accessed when user clicks a recipe card from the Dashboard page.
 */

function DetailView() {
  const { id } = useParams(); // Extract recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Fetch recipe details by ID
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=7178786dafcf4a08a64c407a6455f44e`
        );
        setRecipe(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Could not load recipe details ❌");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // ⚠️ Handle error or loading states
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="loading">Loading recipe details...</p>;

  return (
    <div className="detail-view">
      <Header />
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <div className="detail-container">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="detail-image" />

        {/* 🧾 Basic Info Section */}
        <div className="info">
          <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          {recipe.cuisines?.length > 0 && (
            <p><strong>Cuisine:</strong> {recipe.cuisines.join(", ")}</p>
          )}
        </div>

        {/* 📝 Recipe Summary */}
        {recipe.summary && (
          <div
            className="summary"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        )}

        {/* 🧂 Ingredients List */}
        {recipe.extendedIngredients && (
          <div className="ingredients">
            <h3>🧂 Ingredients</h3>
            <ul>
              {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 👩🏻‍🍳 Cooking Instructions */}
        {recipe.instructions && (
          <div className="instructions">
            <h3>👩🏻‍🍳 Instructions</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          </div>
        )}

        {/* 🔗 External Recipe Link */}
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="recipe-link"
        >
          View Full Recipe on Spoonacular
        </a>
      </div>
    </div>
  );
}

export default DetailView;
