# Redux Sagas
---
## Agenda
* Fundamentals
* Redux
* Redux-Thunk
* Redux-Saga
* References
---
## Fundamentals
*
---
## Redux
__Redux is a predictable state container for JavaScript apps.__

1. Single source of truth (store)
```js
store.getState()
// returns
{
    animalType: 'cat',
    pets: [{
        name: 'John Snow',
        age: 2,
        description: 'nya nya nya'
    }]
}
```

2. State is read-only (actions)
```js
store.dispatch({
    type: 'CHANGE_ANIMAL',
    animalType: 'dog'
});
```

3. Changes are made with pure functions (reducers)
```js
const initialState = fromJS({
  animalType: 'cat',
  pets: []
});

function adoptionPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ANIMAL:
      return state.set('animalType', action.animalType);
    default:
      return state;
  }
```
---
## Redux Thunk (redux middleware)
__A thunk is a function that wraps an expression to delay its evaluation__
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.

#### Action Creator
Functions that create actions:
```js
function changeAnimal(animalType) {
    return {
        type: 'CHANGE_ANIMAL',
        animalType
    }
}
```
### __Example__: I want to change the animal type on click of button
#### SYNC
```html
<button onClick={() => dispatch(changeAnimal('dog'))}> Dog </button>
```
```js
function changeAnimal(animelType) {
    return {
        type: 'CHANGE_ANIMAL',
        animalType
    };
}
```

#### ASYNC without Thunk
```html
<div onClick={() => asyncChangeAnimal(this.props.dispatch, 'dog')}> Dog </div>
```
```js
function asyncChangeAnimal(dispatch, animalType) {
    checkIfAnimalTypeIsAvailable
        .then(() => dispatch(changeAnimal(animalType))
        .catch((e) => dispatch(errorWrapper(e))
}
```

#### ASYNC with Thunk (Inversion of Control)
```html
<button onClick={() => dispatch(asyncChangeAnimal('dog'))}> Dog </button>
```
```js
function asyncChangeAnimal(animalType)
    dispatch => checkIfAnimalTypeIsAvailable
        .then(() => dispatch(changeAnimal(animalType))
        .catch((e) => dispatch(errorWrapper(e))
```

##### *It does not fix the callback hell problem (or promise hell if you prefer)
---
## Redux Saga (redux middleware)

### Underlying Concepts:
* CQRS & Event Sourcing
* Observables & Generators
* Actions, Events, Commands
* Try, Catch, Async, Await
* Process Manager Pattern

### Generators


### Sagas Example

```js
function* fetchPets(action) {
   try {
      const user = yield call(PetsApi.fetch, action.animalType);
      yield put({ type: 'PETS_LOADED', pets });
   } catch (e) {
      yield put({ type: 'PETS_LOAD_ERROR', message: e.message });
   }
}

function* mySaga() {
  yield takeEvery("LOAD_PETS", fetchPets);
}
```

## References

* ##### [Redux](http://redux.js.org/)
* ##### [Redux Thunk](https://github.cron/redux-thunk)
* ##### [Redux Sagas](https://redux-saga.js.org)
* ##### [Why use sagas](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux?noredirect=1&lq=1)
* ##### [The Basics Of ES6 Generators](https://davidwalsh.name/es6-generators)
* ##### [A Practical Introduction to ES6 Generator Functions](http://thejsguy.com/2016/10/15/a-practical-introduction-to-es6-generator-functions.html)
* ##### [Aweomse wrap up of discussions around redux, thunk and sagas ](http://blog.isquaredsoftware.com/2017/01/idiomatic-redux-thoughts-on-thunks-sagas-abstraction-and-reusability/)
* ##### [Managing Side Effects In React + Redux Using Sagas](https://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/)
