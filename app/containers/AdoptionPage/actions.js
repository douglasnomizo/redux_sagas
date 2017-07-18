import {
  CHANGE_ANIMAL,
  LOAD_ANIMALS,
  LOAD_ANIMALS_SUCCESS,
  LOAD_ANIMALS_ERROR,
} from './constants';

export function changeAnimal(animalType) {
  return {
    type: CHANGE_ANIMAL,
    animalType,
  };
}

export function loadAnimal() {
  return {
    type: LOAD_ANIMALS,
  };
}

export function animalsLoaded(animals) {
  return {
    type: LOAD_ANIMALS_SUCCESS,
    animals,
  };
}

export function animalsLoadingError(error) {
  return {
    type: LOAD_ANIMALS_ERROR,
    error,
  };
}
