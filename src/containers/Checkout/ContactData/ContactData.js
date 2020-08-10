import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Button from '../.././../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { updateObject, checkInputValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  };

  orderSubmitHandler = event => {
    event.preventDefault();
    
    

    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  // inputChangeHandler = Two-way binding
  inputChangeHandler = (event, inputId) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
      value: event.target.value,
      valid: checkInputValidity(event.target.value, this.state.orderForm[inputId].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement,
    });

    let formIsValid = true;
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push(
        <Input
          key={key}
          elementType={this.state.orderForm[key].elementType}
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          inputChange={event => this.inputChangeHandler(event, key)}
          invalid={!this.state.orderForm[key].valid}
          shouldValidate={this.state.orderForm[key].validation}
          touched={this.state.orderForm[key].touched}
        />
      );
    }

    let form = (
      <form onSubmit={this.orderSubmitHandler}>
        {formElementsArray.map(formElement => formElement)}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

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
