import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ANIMALS } from 'containers/App/constants';
import { animalsLoaded, animalsLoadingError } from 'containers/AdoptionPage/actions';

import { fetchAnimals, findPetsForAdoption } from '../sagas';

const animalType = 'dog';
const apiKey = 'someapikey';

/* eslint-disable redux-saga/yield-effects */
describe('fetchAnimals Saga', () => {
  let fetchAnimalsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    fetchAnimalsGenerator = fetchAnimals();

    const selectDescriptor = fetchAnimalsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptorAnimalType = fetchAnimalsGenerator.next(animalType).value;
    expect(callDescriptorAnimalType).toMatchSnapshot();

    const callDescriptorApiKey = fetchAnimalsGenerator.next(apiKey).value;
    expect(callDescriptorApiKey).toMatchSnapshot();
  });

  it('should dispatch the animalsLoaded action if it requests the data successfully', () => {
    const response = [{ name: 'Dog 1' }, { name: 'Dog 2' }];
    const putDescriptor = fetchAnimalsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(animalsLoaded(response)));
  });

  it('should call the animalsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = fetchAnimalsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(animalsLoadingError(response)));
  });
});

describe('findPetsForAdoption Saga', () => {
  const findPetsForAdoptionSaga = findPetsForAdoption();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_ANIMALS action', () => {
    const takeLatestDescriptor = findPetsForAdoptionSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ANIMALS, fetchAnimals));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = findPetsForAdoptionSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = findPetsForAdoptionSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
