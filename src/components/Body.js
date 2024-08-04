import Card from "./Card";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import dummy from "../dummy";

const Body = ({ searchText }) => {
  const [originalList, setOriginalList] = useState([]); // Store the original list
  const [listOfProducts, setListOfProducts] = useState([]); // Store the filtered list
  const [skip, setSkip] = useState(0); // State for skip parameter
  const [isSimilarView, setIsSimilarView] = useState(false);

  useEffect(() => {
    fetchData(skip);
  }, []);

  const fetchData = async (skip) => {
    const data = await fetch(
      "https://ecommerce.redisventures.com/api/v1/product/?limit=50&skip=" +
        skip
    );

    const json = await data.json();
    setListOfProducts(json.products);
    setOriginalList(json.products);
  };

  
  const handleViewSimilar = (category) => {
    // Filter the dummy data based on the category of the clicked product
    // const similarProducts = dummy.filter(
    //   (product) => product.category === category
    // );
    if (isSimilarView) {
      // If already viewing similar, revert to the original list
      setListOfProducts(originalList);
      setIsSimilarView(false);
    } else {
    const similarProducts = dummy;
    setListOfProducts(similarProducts);
    setIsSimilarView(true);
    }
  };

  // Search filter implementation
  useEffect(() => {
    const filteredProducts = originalList.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setListOfProducts(filteredProducts);
  }, [searchText, originalList]);

  const handleSortByChange = (sortBy) => {
    switch (sortBy) {
      case "female":
        const femaleList = originalList.filter(
          (product) => product.gender === "Women"
        );
        setListOfProducts(femaleList);
        break;
      case "male":
        const maleList = originalList.filter(
          (product) => product.gender === "Men"
        );
        setListOfProducts(maleList);
        break;
      default:
        setListOfProducts(originalList); // Reset back to the original list
        break;
    }
  };

  const loadMoreProducts = () => {
    const newSkip = skip + 50;
    setSkip(newSkip);
    fetchData(newSkip);
  };

  // Conditional rendering
  return listOfProducts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body-container">
      <p className="body-text">
        One Stop Solution For All Your Fashion Problems👠👜
      </p>

      <select
        className="sort-by-dropdown"
        onChange={(e) => handleSortByChange(e.target.value)}
      >
        <option value="">Sort By Category</option>
        <option value="female">Women</option>
        <option value="male">Men</option>
      </select>
      <button className="load-more-btn" onClick={loadMoreProducts}>
        Load More Products
      </button>

      <div className="prod-cards-container">
        {listOfProducts.map((product) => (
          <Card
           key={product.pk}
            product={product} 
            onViewSimilar={handleViewSimilar}
            isSimilarView={isSimilarView} />
        ))}
      </div>
    </div>
  );
};

export default Body;
