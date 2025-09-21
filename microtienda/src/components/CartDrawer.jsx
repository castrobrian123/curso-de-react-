import React from 'react'

export default function CartDrawer({open, onClose, cart, onRemove, onUpdateQty}){
  if(!open) return null
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <aside className="cart-drawer">
      <div className="drawer-header">
        <h2>Tu Carrito</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
      <div className="drawer-body">
        {cart.length===0 && <p>El carrito está vacío.</p>}
        {cart.map(item=>(
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="ci-info">
              <strong>{item.title}</strong>
              <div>
                <button onClick={()=>onUpdateQty(item.id, item.qty-1)}>-</button>
                <span className="qty">{item.qty}</span>
                <button onClick={()=>onUpdateQty(item.id, item.qty+1)}>+</button>
              </div>
            </div>
            <div className="ci-right">
              <span>${item.price * item.qty}</span>
              <button className="remove" onClick={()=>onRemove(item.id)}>X</button>
            </div>
          </div>
        ))}
      </div>
      <div className="drawer-footer">
        <strong>Total: ${total}</strong>
        <button className="checkout" onClick={()=>alert('Simulación de checkout')}>Finalizar compra</button>
      </div>
    </aside>
  )
}