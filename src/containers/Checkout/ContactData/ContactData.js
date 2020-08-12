import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Button from '../.././../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { updateObject, checkInputValidity } from '../../../shared/utility';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'email',
      elementConfig: {
        type: 'text',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    delveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Select Delivery Method' },
          { value: 'Teleport', displayValue: 'Teleport' },
          { value: 'Cheapest', displayValue: 'Cheapest' },
        ],
        placeholder: 'Deliver Method',
      },
      value: 'Teleport',
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderSubmitHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  // inputChangeHandler = Two-way binding
  const inputChangeHandler = (event, inputId) => {
    const updatedFormElement = updateObject(orderForm[inputId], {
      value: event.target.value,
      valid: checkInputValidity(event.target.value, orderForm[inputId].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormElement,
    });

    let formIsValid = true;
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push(
      <Input
        key={key}
        elementType={orderForm[key].elementType}
        elementConfig={orderForm[key].elementConfig}
        value={orderForm[key].value}
        inputChange={event => inputChangeHandler(event, key)}
        invalid={!orderForm[key].valid}
        shouldValidate={orderForm[key].validation}
        touched={orderForm[key].touched}
      />
    );
  }

  let form = (
    <form onSubmit={orderSubmitHandler}>
      {formElementsArray.map(formElement => formElement)}
      <Button btnType='Success' disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
