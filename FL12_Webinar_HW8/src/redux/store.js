import {createStore} from 'redux';
import Reducer from './state';
const store = createStore(Reducer);
export default store;