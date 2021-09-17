import React from 'react';

function Desserts({menu}) {
  return (
    <div>
        <div className="uk-card uk-card-primary uk-card-body">
            <h3 className="uk-card-title">{menu.body}</h3>
            <p>DESSERTS</p>
        </div>
    </div>
  );
}

export default Desserts;
