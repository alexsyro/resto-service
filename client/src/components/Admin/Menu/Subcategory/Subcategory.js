import React from 'react';
import { Link } from "react-router-dom";

function Subcategory({ subcategory }) {
  console.log(subcategory);
  return (
    <div>
      <Link to={`/menu/${subcategory.name}/${subcategory.id}`} className="uk-button uk-button-default">
        <li>{subcategory.name}</li>
      </Link>
    </div>
  );
}

export default Subcategory;
