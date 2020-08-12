import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const onAddIngredient = ingName => dispatch(actionCreators.addIngredient(ingName));
  const onRemoveIngredient = ingName => dispatch(actionCreators.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actionCreators.initIngredients()), []);
  const onInitPurchase = () => dispatch(actionCreators.purchaseInit());
  const onSetAuthRedirectPath = path => dispatch(actionCreators.setAuthRedirectPath(path));

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('./auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const continueOrder = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  const disableOrderStatus = Object.values({
    ...ingredients,
  }).every(ingredient => ingredient === 0);
  // above: if every ingredient has a value of 0, return true. This is used to disable the 'Order' button
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={onAddIngredient}
          removeIngredient={onRemoveIngredient}
          disabled={disabledInfo}
          orderDisabled={disableOrderStatus}
          orderClick={purchaseHandler}
          price={price}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={continueOrder}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} closeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};


export default (withErrorHandler(BurgerBuilder, axios));
