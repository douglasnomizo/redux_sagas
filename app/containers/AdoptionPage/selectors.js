import { createSelector } from 'reselect';

const selectAdoptionPageDomain = () => (state) => state.get('adoption');

const makeSelectAnimalType = () => createSelector(
  selectAdoptionPageDomain(),
  (adoptionState) => adoptionState.get('animalType')
);

export {
  makeSelectAnimalType,
};
