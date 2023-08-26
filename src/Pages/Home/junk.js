import React, { useState } from "react";
import { Products } from "../data";
import { db } from "../firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import { AppState } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const Home = () => {
  const products = Products;
  const [Price, sePrice] = useState(75000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const Login = useContext(AppState);
  const Loader = useContext(AppState);

  const handlePriceChange = (event) => {
    sePrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const priceInRange = product.price <= Price;
    const categoryMatches =
      selectedCategory === "" || product.category === selectedCategory;
    const nameMatches = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return priceInRange && categoryMatches && nameMatches;
  });

  const notify = () => toast.success("Added To Cart successfully!");

  return (
    <>
      {Loader.loader ? (
        <div className="flex justify-center py-52">
         <GridLoader color="#7c3aed" size={20}/>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center ">
            <div className="flex justify-center mt-4">
              <input
                type="text"
                className="w-1/4 h-14 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 p-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Search By Name"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            <div className="bg-white">
              <div className="max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                {/* filter */}
                <div className="flex gap-6">
                  <div className="flex flex-col text-center gap-3 p-5 border rounded-md h-72 w-56 bg-violet-100 fixed">
                    <p className="font-bold text-lg">Filter</p>
                    <label htmlFor="">Price: {Price}</label>
                    <input
                      type="range"
                      className=" w-44"
                      min={1}
                      max={99991}
                      value={Price}
                      onChange={handlePriceChange}
                    />
                    <div className="font-bold text-lg">Category</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 text-lg">
                        <input
                          type="checkbox"
                          name="category"
                          id="Men's Clothing"
                          value="Men's Clothing"
                          onChange={handleCategoryChange}
                        />
                        Men's Clothing
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          name="category"
                          id="Women's Clothing"
                          value="Women's Clothing"
                          className="2xl"
                          onChange={handleCategoryChange}
                        />
                        Women's Clothing
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          name="category"
                          id="jewelry"
                          value="Jewelry"
                          onChange={handleCategoryChange}
                        />
                        Jewelry
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="electronics"
                          name="category"
                          value="Electronics"
                          onChange={handleCategoryChange}
                        />
                        Electronics
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 ml-64 ">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        href={product.href}
                        className="group flex flex-col justify-between p-10 border-2 shadow-md rounded-xl"
                      >
                        <div></div>
                        <div className="aspect-h-1 aspect-w-1 mt-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <img
                            src={product.img}
                            alt={product.imageAlt}
                            className="h-full w-full object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="">
                          <div className="-mb-14">
                            <h3 className="mt-4 text-lg font-medium text-gray-700">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              ₹ {product.price}
                            </p>
                          </div>
                          {Login.login ? (
                            <div>
                            <button
                              className="flex mx-auto mt-16 text-white bg-violet-600 border-0 py-3 px-14 focus:outline-none hover:bg-transparent hover:text-violet-800 hover:border-violet-800 hover:border-2 rounded-md text-lg md:px-1 md:py-1 xl:py-3 xl:px-14"
                              onClick={async () => {
                                const docRef = doc(collection(db, "Ecom"));

                                await setDoc(docRef, {
                                  name: product.name,
                                  price: product.price,
                                  image: product.img,
                                });
                                notify()
                              }}
                            >
                              Add To Cart
                            </button>
                             <ToastContainer />
                             </div>
                          ) : (
                            <Link to={"/signIn"}>
                              <button
                                className="flex mx-auto mt-16 text-white bg-violet-600 border-0 py-3 px-14 focus:outline-none hover:bg-transparent hover:text-violet-800 hover:border-violet-800 hover:border-2 rounded-md text-lg md:px-1 md:py-1 xl:py-3 xl:px-14"
                                // onClick={async () => {
                                //   const docRef = doc(collection(db, "Ecom"));

                                //   await setDoc(docRef, {
                                //     name: product.name,
                                //     price: product.price,
                                //     image: product.img,
                                //   });
                                // }}
                              >
                                Add To Cart
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;