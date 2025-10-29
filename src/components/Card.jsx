function Card({ recipe, toggleFavorite, isFavorite }) {
    return (
      <div className="card">
        <img src={recipe.image} alt={recipe.title} className="card-image" />
        <h3>{recipe.title}</h3>
  
        {/* ❤️ Favorite Button */}
        <button
          className={isFavorite ? "fav-btn active" : "fav-btn"}
          onClick={() => toggleFavorite(recipe)}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>
    );
  }
  
  export default Card;
  