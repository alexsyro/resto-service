import React from 'react';

function Cocktails({menu}) {
  return (
    <div>
        <div className="uk-card uk-card-primary uk-card-body">
            <h3 className="uk-card-title">{menu.title}</h3>
            <p>COCTAILS</p>
        </div>
    </div>
  );
}

export default Cocktails;
