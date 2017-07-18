import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';

import { makeSelectAnimalType } from './selectors';
import messages from './messages';
import { changeAnimal, loadAnimal } from './actions';

export class AdoptionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.searchAnimals();
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <H2>{this.props.animalType}</H2>
        <form onSubmit={this.props.searchAnimals}>
          <label htmlFor="animalType">
            <input
              id="animalType"
              type="text"
              placeholder="dog"
              value={this.props.animalType}
              onChange={this.props.onChangeAnimal}
            />
          </label>
        </form>
      </div>
    );
  }
}

AdoptionPage.propTypes = {
  searchAnimals: PropTypes.func,
  onChangeAnimal: PropTypes.func,
  animalType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  animalType: makeSelectAnimalType(),
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
