/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import { BackAndroid } from 'react-native';
import NavigationExperimental from 'react-native-experimental-navigation';

import Actions, { ActionMap } from './Actions';
import getInitialStateFromRoot from './State';
import Reducer, { findElement } from './Reducer';
import DefaultRenderer from './DefaultRenderer';
import Scene from './Scene';
import * as ActionConst from './ActionConst';

import global from './Global';

const {
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

const propTypes = {
  dispatch: PropTypes.func,
  backAndroidHandler: PropTypes.func,
  onBackAndroid: PropTypes.func,
  onExitApp: PropTypes.func,
};

class Router extends Component {
  static childContextTypes = {
    routes: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.renderNavigation = this.renderNavigation.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.handleBackAndroid = this.handleBackAndroid.bind(this);
    const reducer = this.handleProps(props);
    this.state = { reducer };
    console.log('router-flux:constructor:' + JSON.stringify(props.myType) + '___' + JSON.stringify(global[props.myType]));
  }

  getChildContext() {
    return {
      routes: Actions,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  componentWillReceiveProps(props) {
    const reducer = this.handleProps(props);
    this.setState({ reducer });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    console.log('router-flux:componentWillUnmount:');
  }

  handleBackAndroid() {
    const {
      backAndroidHandler,
      onBackAndroid,
      onExitApp,
    } = this.props;
    // optional for customizing handler
    if (backAndroidHandler) {
      return backAndroidHandler();
    }

    try {
      Actions.androidBack();
      if (onBackAndroid) {
        onBackAndroid();
      }
      return true;
    } catch (err) {
      if (onExitApp) {
        return onExitApp();
      }

      return false;
    }
  }

  handleProps(props) {
    let scenesMap;

    if (props.scenes) {
      scenesMap = props.scenes;
    } else {
      let scenes = props.children;

      if (Array.isArray(props.children) || props.children.props.component) {
        scenes = (
          <Scene
            key="__root"
            hideNav
            {...this.props}
          >
            {props.children}
          </Scene>
        );
      }
      scenesMap = Actions.create(scenes, props.wrapBy);
    }
    console.log('router-flux:scenesMap:' + JSON.stringify(scenesMap));
    console.log('router-flux:myInitialState:' + JSON.stringify(global.myInitialState));
    console.log('router-flux:props:' + JSON.stringify(Object.keys(this.props)));
    // eslint-disable-next-line no-unused-vars
    const { children, styles, scenes, reducer, createReducer, ...parentProps } = props;
    scenesMap.rootProps = parentProps;

    const secondState = getInitialStateFromRoot(scenesMap);
    let myInitialState = global.myInitialState;
    if (this.props.myType != 'intial' && myInitialState && myInitialState.scenes) {
      // scenesMap[scens]
      const rootRoute = Object.keys(myInitialState.scenes).find(route => ({}).hasOwnProperty.call(myInitialState.scenes, route) && !myInitialState.scenes[route].parent);
      const secondRootRoute = Object.keys(scenesMap).find(route => ({}).hasOwnProperty.call(scenesMap, route) && !scenesMap[route].parent);
      scenesMap[secondRootRoute].parent = rootRoute;
      myInitialState.scenes[rootRoute].children.push.apply(myInitialState.scenes[rootRoute].children,scenesMap[secondRootRoute].children);
      alert(rootRoute);
      myInitialState.scenes = Object.assign(myInitialState.scenes, scenesMap);
      secondState.children[0].parent = rootRoute
      myInitialState.children.push(secondState.children[0]);
      myInitialState.index++;
    } else {
      myInitialState = getInitialStateFromRoot(scenesMap);
    }
    const initialState = myInitialState;
    // scenesMap = global.myInitialState.scenes;
    const reducerCreator = props.createReducer || Reducer;
    console.log('router-flux:initialState:33' + JSON.stringify(initialState));
    const routerReducer = props.reducer || (
      reducerCreator({
        initialState,
        scenes: scenesMap,
      }));

    return routerReducer;
  }

  renderNavigation(navigationState, onNavigate) {
    if (!navigationState) {
      return null;
    }
    if (this.props.myType == 'intial') {
      global.myInitialState = navigationState;
    }
    console.log('router-flux:navigationState:' + JSON.stringify(global.myInitialState));
    Actions.get = key => findElement(navigationState, key, ActionConst.REFRESH);
    Actions.callback = (props) => {
      const constAction = (props.type && ActionMap[props.type] ? ActionMap[props.type] : null);
      if (this.props.dispatch) {
        if (constAction) {
          this.props.dispatch({ ...props, type: constAction });
        } else {
          this.props.dispatch(props);
        }
      }
      return (constAction ? onNavigate({ ...props, type: constAction }) : onNavigate(props));
    };

    return <DefaultRenderer onNavigate={onNavigate} navigationState={navigationState} />;
  }

  render() {
    if (!this.state.reducer) return null;

    return (
      <NavigationRootContainer
        reducer={this.state.reducer}
        renderNavigation={this.renderNavigation}
      />
    );
  }
}

Router.propTypes = propTypes;

export default Router;
