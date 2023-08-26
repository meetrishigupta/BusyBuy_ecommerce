/** ------------------ IMPORTING CSS ------------------ **/
import Style from "./orders.module.css";
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useEffect, useState } from 'react';
import { useValue } from '../../context';
/** ------------------ IMPORTING FIREBASE MODULES ------------------ **/
import { ref, onValue } from 'firebase/database';
import { auth, database } from '../../firebaseInit';
/** ------------------ IMPORTING SPINNER MODULES ------------------ **/
import Loader from '../../Components/Loader/loader';

/** ------------------ Function to display orders page ------------------ **/
function Order() {
  const [orderItems, setOrderItems] = useState([]); 
  const {isLoading, setIsLoading} = useValue();


  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("user not found ", user);
      return; // Return early if the user is not authenticated
    }

    const userId = user.uid; // current UserID
    const orderRef = ref(database, `myOrders/${userId}`);

    onValue(orderRef, (snapshot) => {
      setIsLoading(true);
      const data = snapshot.val();
      const ordersArray = data ? Object.values(data) : [];
      setOrderItems(ordersArray.reverse());
    });
    setIsLoading(false);
  }, [setIsLoading]);

/** ------------------ For displaying the loader ------------------ **/
  if(isLoading) { return <Loader /> }



  return (
    <>
      <h1 className={Style.page_title}>Your Orders to buy</h1>
      <div className={Style.order_container}>
        {isLoading==='false' || orderItems.length === 0 ? (
          <p className={Style.no_order}>📪 Whoops! It seems there are no orders just yet. 🤔</p>
        ) : (
          orderItems.map((order, index) => (
            <div key={index} className={Style.order_item}>
              <div className={Style.order_date}>
                <p>Order placed on : &nbsp; {order.date}</p>
              </div>
              <table className={Style.order_table}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={Style.order_total}>Order Total: &nbsp; ₹{order.total}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export default Order;
