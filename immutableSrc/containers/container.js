

import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import allActions from '../actions';
import { connect } from 'react-redux';

import Box from '../components/box';


class Container extends Component {

  constructor(props){
    super(props);
  }
  
  render() {

    return (
      <Box 
        {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.get('reduxReducers'),
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);