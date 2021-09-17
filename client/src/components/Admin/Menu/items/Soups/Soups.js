import React from 'react';

function Soups({menu}) {
  return (
    <div>
        <div className="uk-card uk-card-primary uk-card-body">
            <h3 className="uk-card-title">{menu.title}</h3>
            <p>SOUPS</p>
        </div>
    </div>
  );
}


export default Soups;
