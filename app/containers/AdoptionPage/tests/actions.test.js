import { loadAnimal, animalsLoaded, animalsLoadingError } from '../actions';
import { LOAD_ANIMALS, LOAD_ANIMALS_SUCCESS, LOAD_ANIMALS_ERROR } from '../constants';

describe('AdoptionPage actions', () => {
  describe('Change animal type', () => {
    it('should return the correct type and the animal type', () => {
      const fixture = 'dog';

      const expected = {
        type: LOAD_ANIMALS,
        animalType: fixture,
      };
      expect(loadAnimal(fixture)).toEqual(expected);
    });
  });

  describe('Animals loaded', () => {
    it('should return the list of animals', () => {
      const fixture = ['john snow', 'lessi'];

      const expected = {
        type: LOAD_ANIMALS_SUCCESS,
        animals: fixture,
      };
      expect(animalsLoaded(fixture)).toEqual(expected);
    });
  });

  describe('Animals load error', () => {
    it('should return the error info', () => {
      const fixture = 'there is something wrong';

      const expected = {
        type: LOAD_ANIMALS_ERROR,
        error: fixture,
      };
      expect(animalsLoadingError(fixture)).toEqual(expected);
    });
  });
});
