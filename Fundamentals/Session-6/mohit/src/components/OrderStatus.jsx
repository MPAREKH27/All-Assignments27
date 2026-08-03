import React from 'react'

const OrderStatus = ({ isDelivered }) => {
  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '10px',
      backgroundColor: isDelivered ? '#e6f4ea' : '#fff8e1',
      border: `1px solid ${isDelivered ? '#a8d5b5' : '#ffe082'}`,
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDelivered ? '#2e7d32' : '#f57f17',
      textAlign: 'center'
    }}>
      {isDelivered ? 'Order Delivered 🎉' : 'Order on the way 🚚'}
    </div>
  )
}

export default OrderStatus