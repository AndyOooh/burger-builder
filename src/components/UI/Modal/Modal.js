import React, { memo } from 'react';
import classes from './Model.module.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  // }

  return (
    <Aux>
      <BackDrop showing={props.show} clickBD={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '0.9' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  );
};

export default memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show && prevProps.children === nextProps.children
);

// We pass in a function as 2nd arg to the memo method to only check for certain prop changes, as we don't expect/know other props will never change. React.memo is similar to React.PureComponent but different from the hook useMemo. It memoizes (caches) a previos version of the component and only updates if the components props changes (or the props specified in the callback passed as 2nd argument). It is also a substitute of ShouldComponentUpdate - in memo() we set prev and next === which is opposite SCU where we use !==.
