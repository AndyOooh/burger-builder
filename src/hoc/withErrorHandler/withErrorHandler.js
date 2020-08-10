/* import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrapperComponet, axios) => {
  return class extends Component {
    state = { error: null };
    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    reqInterceptor = axios.interceptors.request.use((req) => {
      this.setState({ error: null });
      return req;
    });
    //    reqInterceptor = axios.interceptors.response.use(
    //      res => res,
    //      error => {
    //        this.setState({ error: error });
    //        return error;
    //      }
    //    );
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponet {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler; */

import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// class is anonymous bc we never use it. We return it, so in effect it's a class 'factory'.

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
