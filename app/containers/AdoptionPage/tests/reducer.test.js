import { fromJS } from 'immutable';
import adoptionPageReducer from '../reducer';
import { changeAnimal, loadAnimal, animalsLoaded } from '../actions';

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
    const expectedResult = state
      .set('loading', true)
      .set('animals', []);

    expect(adoptionPageReducer(state, loadAnimal())).toEqual(expectedResult);
  });

  it('should handle the changeAnimal action', () => {
    const fixture = 'dog';
    const expectedResult = state
      .set('animalType', fixture);

    expect(adoptionPageReducer(state, changeAnimal(fixture))).toEqual(expectedResult);
  });

  it('should handle the load of animals action', () => {
    const fixture = ['any dog', 'any cat'];
    const expectedResult = state
      .set('animals', fixture)
      .set('loading', false);

    expect(adoptionPageReducer(state, animalsLoaded(fixture))).toEqual(expectedResult);
  });
});
