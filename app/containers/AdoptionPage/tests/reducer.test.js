import { fromJS } from 'immutable';
import adoptionPageReducer from '../reducer';
import { loadAnimal, animalsLoaded } from '../actions';

describe('adoptionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      animalType: 'cat',
      animals: [],
      loading: false,
      error: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(adoptionPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadAnimal action', () => {
    const fixture = 'dog';
    const expectedResult = state
      .set('animalType', fixture)
      .set('loading', true)
      .set('animals', []);

    expect(adoptionPageReducer(state, loadAnimal(fixture))).toEqual(expectedResult);
  });

  it('should handle the load of animals action', () => {
    const fixture = ['any dog', 'any cat'];
    const expectedResult = state
      .set('animals', fixture)
      .set('loading', false);

    expect(adoptionPageReducer(state, animalsLoaded(fixture))).toEqual(expectedResult);
  });
});
