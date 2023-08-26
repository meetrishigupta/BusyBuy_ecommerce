/** ------------------ IMPORTING CSS ------------------ **/
import Style from './home.module.css';
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useValue } from '../../context';
import { useState } from 'react';
/** ------------------ IMPORTING COMPONENTS ------------------ **/
import Data from '../../Data/data';
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { NavLink } from 'react-router-dom';
import SignIn from '../SignInPage/signIn';
import { useNavigate } from 'react-router-dom';



/** ------------------ Function to display the home page ------------------ **/
function Home() {
  
  const { searchTerm, priceRange, setPriceRange, handleAdd} = useValue();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dataArray = Object.values(Data); 

  const handleChangecategory = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

const history = useNavigate();
const navigateToLogin = ()=>{
  history('/SignIn');
  console.log("cliekced")
}

/** ------------------ Filters data based on search term ------------------ **/
const filteredProducts = dataArray.filter((item) => {
  const isInRange = priceRange > 0 ? item.price <= priceRange : true;
  const isSearchMatched = item.title.toLowerCase().includes(searchTerm.toLowerCase());
  const isCategoryMatched = selectedCategories.length === 0 || selectedCategories.includes(item.category);
  
  return isInRange && isSearchMatched && isCategoryMatched;
});







  return (
    <div className={Style.container}>
      <div className={Style.filterContainer}>
        <h2>Filter</h2> <br/>
        <div>
          <label style={{"fontWeight": "bold"}}>Price Range: ₹{priceRange}</label>
          <input type="range" id="priceRange" min="0" max="15000" step="100"
            value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
        </div>
        <div>
          <h4>Categories:</h4>
          <label>
            {/* <input type="checkbox" name="men"
             /> */}
                 <input
                          type="checkbox"
                          name="category"
                          id="Men"
                          value="Men"
                          onChange={handleChangecategory}
                        />
            Men
          </label>
          <label>
          <input
                          type="checkbox"
                          name="category"
                          id="Women"
                          value="Women"
                          onChange={handleChangecategory}
                        />            
            Women
          </label>
          <label>
          <input
                          type="checkbox"
                          name="category"
                          id="Kids"
                          value="Kids"
                          onChange={handleChangecategory}
                        /> 
            Kids
          </label>
          <label>
          <input
                          type="checkbox"
                          name="category"
                          id="Electronics"
                          value="Electronics"
                          onChange={handleChangecategory}
                        />
            Electronics
          </label>
          <label>
          <input
                          type="checkbox"
                          name="category"
                          id="Accessories"
                          value="Accessories"
                          onChange={handleChangecategory}
                        />
            Accessories
          </label>
          <label>
          <input
                          type="checkbox"
                          name="category"
                          id="Stationery"
                          value="Stationery"
                          onChange={handleChangecategory}
                        />            Stationery
          </label>
        </div>
      </div>

      <div className={Style.itemContainer}>
        {filteredProducts.map((item, id) => (
          <div key={id} className={Style.product}>
            <img src={item.img} alt="Product" />
            <h2>{item.title}</h2>
            <h3>₹ {item.price}</h3>
            <NavLink>
              <button onClick={()=>handleAdd(item,navigateToLogin)} >Add To Cart</button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export default Home;
