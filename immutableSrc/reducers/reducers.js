
import * as types from '../actions/actionType';
import config from '../config'

import { fromJS } from 'immutable';

const initState = fromJS(config);

function reduxReducers(state = initState, action) {
    switch (action.type) {
        case types.XSY_REDUX_DEMO_CLICK:
            return state.setIn(['instances','default','name'],'你点我就变');
        default:
            return state;
    }

}

export default reduxReducers;
