import React from 'react';

function Pizza({menu}) {
  return (
    <div>
        <div className="uk-card uk-card-primary uk-card-body">
            <h3 className="uk-card-title">{menu.body}</h3>
            <p>PIZZA</p>
        </div>
    </div>
  );
}

export default Pizza;
