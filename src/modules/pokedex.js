import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as pokedexAPI from 'lib/api/pokedex';

const INIT_GETLIST_ERROR = 'pokedex/INIT_LIST_INIT_GETLIST_ERRORERROR';
const INIT_READ_ERROR = 'pokedex/INIT_READ_ERROR';
const [GETLIST, GETLIST_SUCCESS, GETLIST_FAILURE] = createRequestActionTypes('pokedex/GETLIST');
const [READ, READ_SUCCESS, READ_FAILURE] = createRequestActionTypes('pokedex/READ');

export const initGetListError = createAction(INIT_GETLIST_ERROR);
export const initReadError = createAction(INIT_READ_ERROR);
export const getList = createAction(GETLIST, (query) => query);
export const read = createAction(READ, ({ num }) => ({ num }));

const getListSaga = createRequestSaga(GETLIST, pokedexAPI.list);
const readSaga = createRequestSaga(READ, pokedexAPI.read);

export function* pokedexSaga() {
  yield takeLatest(GETLIST, getListSaga);
  yield takeLatest(READ, readSaga);
}

const initialState = {
  list: null,
  data: null,
  getListError: null,
  readError: null,
};

const pokedex = handleActions(
  {
    [INIT_GETLIST_ERROR]: (state) => {
      return { ...state, getListError: null };
    },
    [INIT_READ_ERROR]: (state) => {
      return { ...state, readError: null };
    },
    [GETLIST]: (state) => {
      return { ...state, list: null, getListError: null };
    },
    [GETLIST_SUCCESS]: (state, { payload: result }) => {
      return { ...state, list: result, getListError: false };
    },
    [GETLIST_FAILURE]: (state, { payload: error }) => {
      return { ...state, getListError: error };
    },
    [READ]: (state) => {
      return { ...state, readError: null };
    },
    [READ_SUCCESS]: (state, { payload: result }) => {
      return { ...state, data: result, readError: false };
    },
    [READ_FAILURE]: (state, { payload: error }) => {
      return { ...state, readError: error };
    },
  },
  initialState,
);
export default pokedex;
