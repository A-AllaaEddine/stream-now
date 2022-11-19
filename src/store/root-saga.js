import { all, call } from 'redux-saga/effects';

import { catalogSaga } from './catalog/catalog.sagas';


export function* rootSaga() {
    yield all([
        call(catalogSaga)
    ])
}