import React, { useState } from 'react';
import {
  StatusBar, View
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {connect} from 'react-redux';
import {verifyUser} from './src/actions/userManagement';

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    isLoggedIn: state.isLoggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    verify: (payload) => dispatch(verifyUser(payload)),
  }
}

const App = (props) => {
  const [customer, setCustomer] = useState([]);
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <StatusBar barStyle="light-content" />
        <AppNavigator />
   
    </>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

