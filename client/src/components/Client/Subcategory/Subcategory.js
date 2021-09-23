import React from 'react'
import { Link } from 'react-router-dom'


function Subcategory({ subcategory }) {
  return (
    <div>
      <Link  to={`/menu/subcategory/${subcategory.id}`}>
        <button >{subcategory.name}</button>
      </Link>
    </div>
  )
}

export default Subcategory
