import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for (let ing in props.ingredients) {
    ingredients.push({name: ing, amount: props.ingredients[ing]});
  }
  console.log('ingredients after for in: ', ingredients);

  const ingredientOutput = ingredients.map((ingred) => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        padding: '5px',
        border: '1px solid #ccc',
        margin: '0 8px',
      }}
      key={ingred.name}
    >
      {ingred.name}: {ingred.amount}
    </span>
  ));

  return (
    <div className={classes.Order}>
      {ingredientOutput}
      <p>
        Price: <strong>USD {props.price} </strong>
      </p>
    </div>
  );
};

export default order;
