import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { reject, isNil, map } from 'ramda';

import { makeSelectAnimalType, makeSelectAnimals } from './selectors';
import messages from './messages';
import { changeAnimal, loadAnimal } from './actions';
const PetsWrapper = styled.div`
  position: relative;
`;

const SinglePetContainer = styled.div`
  display: inline-block;
  text-align: justify;
  width: 120px;
`;

const PetImage = styled.img`
  display: block;
  margin: 0 auto;
`;

const PetName = styled.p`
  width: 120px;
`;

const InputWrapper = styled.input`
  border: 1px solid;
  padding: 2px;
  height: 30px;
`;

const toPetItem = (animal) => {
  if (animal.photos[0]) {
    return (
      <SinglePetContainer class="pet-container">
        <PetName>{animal.name}</PetName>
        <PetImage alt={animal.description} src={animal.photos[0]} ></PetImage>
      </SinglePetContainer>
    );
  }
  return null;
};


export class AdoptionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.searchAnimals();
  }

  render() {
    const listItems = reject(isNil, map(toPetItem)(this.props.animals));

    return (
      <div>
        <FormattedMessage {...messages.header} />

        <form onSubmit={this.props.searchAnimals}>
          <label htmlFor="animalType">
            <p>Choose your animal type:</p>
            <InputWrapper
              id="animalType"
              type="text"
              placeholder="dog"
              value={this.props.animalType}
              onChange={this.props.onChangeAnimal}
            />
          </label>
        </form>
        <PetsWrapper class="pets">
          {listItems}
        </PetsWrapper>
      </div>
    );
  }
}

AdoptionPage.propTypes = {
  searchAnimals: PropTypes.func,
  onChangeAnimal: PropTypes.func,
  animalType: PropTypes.string,
  animals: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  animalType: makeSelectAnimalType(),
  animals: makeSelectAnimals(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchAnimals: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadAnimal());
    },
    onChangeAnimal: (evt) => dispatch(changeAnimal(evt.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdoptionPage);
