import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-errorHandler'

// class is anonymous bc we never use it. We return it, so in effect it's a class 'factory'.

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} closeModal={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />;
      </Aux>
    );
  };
};

export default withErrorHandler;
