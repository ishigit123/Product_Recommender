const Card = ({ product, onViewSimilar, isSimilarView }) => {
  return (
    <div>
      <div className="prod-card">
        <img src={product.img_url} alt="Product" />
        <h2>{product.name}</h2>
        <h3>{product.category}</h3>
        <button onClick={() => onViewSimilar(product.category)}>
          {isSimilarView ? "Hide similar" : "View similar"}
        </button>
      </div>
    </div>
  );
};

export default Card;
