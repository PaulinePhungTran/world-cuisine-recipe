function Card({ recipe, toggleFavorite, isFavorite }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} className="card-image" />
      <h3>{recipe.title}</h3>

      <button
        className={isFavorite ? "fav-btn active" : "fav-btn"}
        onClick={(e) => {
          e.preventDefault(); // prevent link navigation when favoriting
          toggleFavorite(recipe);
        }}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}

export default Card;
