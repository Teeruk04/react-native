import *as constant from '../Constants';

export const setToken =payload => dispatch =>
dispatch({
    type: constant.ACCOUNT_SET_TOKEN,
    payload,
});

export const clear =()=>dispatch=>
dispatch({
    type: constant.ACCOUNT_CLEAR,
});

export const setUser =payload =>dispatch=>
dispatch({
    type: constant.ACCOUNT_SET_USER,
    payload,
});