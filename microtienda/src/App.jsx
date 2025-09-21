import React, { useState } from 'react'
import ProductList from './components/ProductList'
import CartDrawer from './components/CartDrawer'
import products from './data/products'

export default function App(){
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  function addToCart(product){
    setCart(prev=>{
      const found = prev.find(p=>p.id===product.id)
      if(found) return prev.map(p=>p.id===product.id?{...p, qty: p.qty+1}:p)
      return [...prev, {...product, qty:1}]
    })
  }
  function removeFromCart(id){
    setCart(prev=>prev.filter(p=>p.id!==id))
  }
  function updateQty(id, qty){
    if(qty<=0) return removeFromCart(id)
    setCart(prev=>prev.map(p=>p.id===id?{...p, qty}:p))
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">Mi Tienda React</h1>
        <nav>
          <button className="cart-btn" onClick={()=>setOpen(true)}>
            🛒 Carrito ({cart.reduce((s,i)=>s+i.qty,0)})
          </button>
        </nav>
      </header>

      <main className="main">
        <ProductList products={products} onAdd={addToCart} />
      </main>

      <CartDrawer open={open} onClose={()=>setOpen(false)} cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} />

      <footer className="footer">© {new Date().getFullYear()} Tienda React - Proyecto Unificado</footer>
    </div>
  )
}