import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should render image from prop bannerUrl', () => {
    const bannerUrl = 'http://something.com';
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <Header bannerUrl={bannerUrl} />
      </IntlProvider>);
    expect(renderedComponent.find('img').prop('src')).toEqual(bannerUrl);
  });
});
