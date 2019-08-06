import {store} from '../redux/store';

let token =  store.getState().token.value

export default token;
