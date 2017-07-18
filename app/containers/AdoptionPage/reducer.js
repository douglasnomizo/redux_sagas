/*
 *
 * AdoptionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_ANIMAL,
  LOAD_ANIMALS,
  LOAD_ANIMALS_SUCCESS,
  LOAD_ANIMALS_ERROR,
} from './constants';

const initialState = fromJS({
  animalType: 'cat',
  animals: [],
  loading: false,
  error: false,
});

function adoptionPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ANIMAL:
      return state
        .set('animalType', action.animalType);
    case LOAD_ANIMALS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('animals', []);
    case LOAD_ANIMALS_SUCCESS:
      return state
        .set('animals', action.animals)
        .set('loading', false);
    case LOAD_ANIMALS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default adoptionPageReducer;
