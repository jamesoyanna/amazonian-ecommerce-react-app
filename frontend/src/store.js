import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import Cookie from 'js-cookie';

import {
    productListReducer,
    productDetaildReducer,
    productSaveReduccer,
    productReviewSaveReducer,
    productDeleteReducer,
 
} from "./recuers/productReducers";
import {cartReducer } from "reducers/cartReducer";


const cartItrms = Cookie.getJSON("cartItems") || [];
const 