import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../config';
 
import Navbarr from "./Navbarr"
function Order() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [expandedCreatorId, setExpandedCreatorId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [isCashFilter, setIsCashFilter] = useState("");
  const [statusFilterChoice, setStatusFilterChoice] = useState("");
  const [isCashFilterChoice, setIsCashFilterChoice] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.post(`${backend_url}/v1/orders/all-orders`, { status: statusFilter, is_cash: isCashFilter }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = response.data.data;
    
        setFilteredOrders(data);
      } catch (error) {
        console.error('Fetch failed:', error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, [statusFilter, isCashFilter]);

  const handleToggleItems = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleToggleCreatorInfo = (creatorId) => {
    setExpandedCreatorId(expandedCreatorId === creatorId ? null : creatorId);
  };

  
  const handleStatusChange = (status) => {
    setStatusFilterChoice(status);
  };

  const handleCashChange = (isCash) => {
    setIsCashFilterChoice(isCash);
  };
const handlefilter=()=>{
  setStatusFilter(statusFilterChoice);
  setIsCashFilter(isCashFilterChoice);
}
 

  return (
    <div className="px-2">
  <Navbarr/>
      <div className="mb-4 mt-3">
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <label className="mb-0">Status:</label>
            <button 
              className={`btn ${statusFilterChoice=== "PENDING" ? 'btn-primary' : 'btn-outline-secondary'}`} 
              onClick={() => handleStatusChange("PENDING")}
            >
              Pending
            </button>
            <button 
              className={`btn ${statusFilterChoice === "SERVED" ? 'btn-primary' : 'btn-outline-secondary'}`} 
              onClick={() => handleStatusChange("SERVED")}
            >
              Served
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="mb-0">Payment Method:</label>
            <button 
              className={`btn ${isCashFilterChoice ? 'btn-primary' : 'btn-outline-secondary'}`} 
              onClick={() => handleCashChange(true)}
            >
              Cash
            </button>
            <button 
              className={`btn ${!isCashFilterChoice ? 'btn-primary' : 'btn-outline-secondary'}`} 
              onClick={() => handleCashChange(false)}
            >
              Card
            </button>
            <button className="btn btn-success" onClick={handlefilter}> Apply Filter</button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="row">
        {filteredOrders.length === 0 ? (
          <div className="col-12 text-center text-muted">No orders found</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Version: {order.order_version}</h5>
                  <p className="card-text">
                    <strong>Created by:</strong> {order.created_by.name}
                    <span 
                      className="text-primary ms-2 cursor-pointer"
                      onClick={() => handleToggleCreatorInfo(order.created_by._id)}
                    >
                      {expandedCreatorId === order.created_by._id ? '-' : '+'}
                    </span>
                  </p>
                  {expandedCreatorId === order.created_by._id && (
                    <div className="border-top pt-2 text-muted">
                      <p><strong>Email:</strong> {order.created_by.email}</p>
                      <p><strong>Phone:</strong> {order.created_by.phone_number}</p>
                      <p><strong>Verified:</strong> {order.created_by.is_verified ? 'Yes' : 'No'}</p>
                      <p><strong>Role:</strong> {order.created_by.role}</p>
                    </div>
                  )}
                  <h6 className="mt-3">Items:</h6>
                  <button 
                    className="btn btn-link text-primary p-0"
                    onClick={() => handleToggleItems(order._id)}
                  >
                    {expandedOrderId === order._id ? '-' : '+'}
                  </button>
                  {expandedOrderId === order._id && (
                    <div className="mt-2">
                      {order.items.map((item) => (
                        <div key={item._id} className="d-flex align-items-start border-bottom py-2">
                          <img
                            className="img-thumbnail me-3"
                            style={{ width: "60px", height: "100px" }}
                            src={item.menu_item.imageId}
                            alt={item.menu_item.name}
                          />
                          <div>
                            <h6 className="mb-1">{item.menu_item.name}</h6>
                            <p className="mb-1">Quantity: {item.quantity}</p>
                            <p className="mb-1">Price: ${item.menu_item.price.toFixed(2)}</p>
                            <p className={`text-small ${item.status === 'PENDING' ? 'text-warning' : 'text-secondary'}`}>
                              Status: {item.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <p className={`mb-0 ${order.status === 'PENDING' ? 'text-warning' : 'text-success'}`}>
                    Order Status: {order.status}
                  </p>
                  <p className="mb-0">
                    Payment Method: {order.is_cash ? 'Cash' : 'Card'}
                  </p>
                  <p className={`mb-0 ${order.cancelled ? 'text-danger' : 'text-muted'}`}>
                    {order.cancelled ? 'Order Cancelled' : 'Order Active'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
