import { createAction, handleActions } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import { startLoading, finishLoading } from 'modules/loading';
import * as pokedexAPI from 'lib/api/pokedex';

const INIT_GETLIST_ERROR = 'pokedex/INIT_LIST_INIT_GETLIST_ERRORERROR';
const INIT_READ_ERROR = 'pokedex/INIT_READ_ERROR';
const [GETLIST, GETLIST_SUCCESS, GETLIST_FAILURE] = createRequestActionTypes('pokedex/GETLIST');
const [READ, READ_SUCCESS, READ_FAILURE] = createRequestActionTypes('pokedex/READ');
const SET_OPTION = 'pokedex/SET_OPTION';

export const initGetListError = createAction(INIT_GETLIST_ERROR);
export const initReadError = createAction(INIT_READ_ERROR);
export const getList = createAction(GETLIST, (query) => query);
export const read = createAction(READ, (num) => num);
export const setOption = createAction(SET_OPTION, (option) => option);

function* setOptionSaga() {
  yield put({ type: GETLIST });
}
function* getListSaga() {
  yield put(startLoading(GETLIST));
  try {
    const option = yield select((state) => state.pokedex.option);
    const queryString = Object.entries(option)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const list = yield call(pokedexAPI.list, queryString);
    yield put({ type: GETLIST_SUCCESS, payload: list.data });
  } catch (e) {
    yield put({
      type: GETLIST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GETLIST));
}
const readSaga = createRequestSaga(READ, pokedexAPI.read);

export function* pokedexSaga() {
  yield takeLatest(GETLIST, getListSaga);
  yield takeLatest(READ, readSaga);
  yield takeLatest(SET_OPTION, setOptionSaga);
}

const initialState = {
  list: null,
  data: null,
  getListError: null,
  readError: null,
  option: {
    language: 'name_kor',
    firstSort1: 'num_nat',
    firstSort2: 'ASC',
    secondSort1: '',
    secondSort2: 'ASC',
    minH: 0,
    maxH: 255,
    minA: 0,
    maxA: 255,
    minB: 0,
    maxB: 255,
    minC: 0,
    maxC: 255,
    minD: 0,
    maxD: 255,
    minS: 0,
    maxS: 255,
    minTotal: 0,
    maxTotal: 720,
    minHeight: 0.0,
    maxHeight: 15.0,
    minWeight: 0.0,
    maxWeight: 999.0,
    type1: '',
    type2: '',
  },
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
    [SET_OPTION]: (state, { payload: option }) => {
      return { ...state, option: option };
    },
  },
  initialState,
);
export default pokedex;
