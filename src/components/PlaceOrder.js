import React, { useState, useEffect } from "react";
import axios from "axios";

function PlaceOrder({ token }) {
  const [orders, setOrders] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        { productName, price, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setOrders([...orders, res.data.order]);
      setProductName("");
      setPrice("");
      setAddress("");
    } catch (err) {
      alert(err.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div>
      <h3>Place Order</h3>
      <form onSubmit={handleOrder}>
        <input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit">Place Order</button>
      </form>

      <h3>Your Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o._id}>{o.productName} - {o.price} - {o.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceOrder;
