import { filter, anyPass, propEq, assocPath, pathOr, uniqBy, prop, pick, pipe, map } from 'ramda';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_ANIMALS } from 'containers/AdoptionPage/constants';
import { animalsLoaded, animalsLoadingError } from 'containers/AdoptionPage/actions';

import request from 'utils/request';
import { makeSelectAnimalType } from 'containers/AdoptionPage/selectors';
import { makeSelectApiKey, makeSelectCors } from 'containers/App/selectors';

export function* fetchAnimals() {
  const animalType = yield select(makeSelectAnimalType());
  const apiKey = yield select(makeSelectApiKey());
  const corsCall = yield select(makeSelectCors());
  const requestURL = `${corsCall}http://api.petfinder.com/pet.find?format=json&key=${apiKey}&animal=${animalType}&location=NY`;

  try {
    const response = yield call(request, requestURL, { dataType: 'jsonp' });

    const animals = pipe(
      pathOr({}, ['petfinder', 'pets', 'pet']),
      map(pick(['age', 'media', 'name', 'animal', 'description'])),
      map(mapMedia),
      map(map(prop('$t'))),
    )(response);

    yield put(animalsLoaded(animals));
  } catch (err) {
    console.log(err);
    yield put(animalsLoadingError(err));
  }
}

export function* findPetsForAdoption() {
  yield takeLatest(LOAD_ANIMALS, fetchAnimals);
}

export default [
  findPetsForAdoption,
  fetchAnimals,
];

const mapMedia = (pet) => {
  const photos = pipe(
    pathOr([], ['media', 'photos', 'photo']),
    // filter(anyPass([propEq('@size', 'x'), propEq('@size', 'pn')])),
    filter(anyPass([propEq('@size', 'fpm')])),
    uniqBy(prop('@id')),
    map(pathOr('', ['$t']))
  )(pet);
  return assocPath(['photos', '$t'], photos, pet);
};
