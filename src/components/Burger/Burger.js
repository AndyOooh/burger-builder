import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './Burger-Ingredient/BurgerIngredient';

const burger = (props) => {
  // Note: console.log(props.ingredients['meat']); <-- returns the value of the key
  // reduce 'flattens' the array, so we can see how many ingredients we will render and use that to render a text if it's 0.
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      })
    }
  )
  .reduce((prevVal, currVal) => {
    return prevVal.concat(currVal)
  }, [])
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please choose your ingredients</p>
  }
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
};

export default burger;
