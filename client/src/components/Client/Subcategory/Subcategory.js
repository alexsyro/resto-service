import React from 'react';
import { Link } from 'react-router-dom';

function Subcategory({ subcategory}) {
  return (
    <div>
      <Link to={`/menu/${subcategory.name}/${subcategory.id}`} >
        <li>{subcategory.name}</li>
      </Link>
    </div>
  );
}

export default Subcategory
