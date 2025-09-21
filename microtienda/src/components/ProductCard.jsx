import React from 'react'

export default function ProductCard({product, onAdd}){
  return (
    <article className="card">
      <div className="img-wrap">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="desc">{product.description}</p>
        <div className="card-footer">
          <strong>${product.price}</strong>
          <button onClick={onAdd}>Agregar</button>
        </div>
      </div>
    </article>
  )
}