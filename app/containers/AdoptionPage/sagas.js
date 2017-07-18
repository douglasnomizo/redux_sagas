import { path, pipe } from 'ramda';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_ANIMALS } from 'containers/AdoptionPage/constants';
import { animalsLoaded, animalsLoadingError } from 'containers/AdoptionPage/actions';

import request from 'utils/request';
import { makeSelectAnimalType } from 'containers/AdoptionPage/selectors';
import { makeSelectApiKey } from 'containers/App/selectors';

// Define what to do when change animal type happens
export function* fetchAnimals() {
  const animalType = yield select(makeSelectAnimalType());
  const apiKey = yield select(makeSelectApiKey());

  const requestURL = `https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?format=json&key=${apiKey}&animal=${animalType}&location=NY`;

  try {
    const response = yield call(request, requestURL, { dataType: 'jsonp' });
    const animals = pipe(
      path(['petfinder', 'pets', 'pet'])
    )(response);

    yield put(animalsLoaded(animals));
  } catch (err) {
    yield put(animalsLoadingError(err));
  }
}

export function* findPetsForAdoption() {
  const watcher = yield takeLatest(LOAD_ANIMALS, fetchAnimals);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  findPetsForAdoption,
];
