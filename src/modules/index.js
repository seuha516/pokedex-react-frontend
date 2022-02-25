import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import pokedex, { pokedexSaga } from 'modules/pokedex';

const rootReducer = combineReducers({
  loading,
  pokedex,
});

export function* rootSaga() {
  yield all([pokedexSaga()]);
}

export default rootReducer;
