import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

function Header({ bannerUrl }) {
  return (
    <div>
      <A href="https://twitter.com/mxstbr">
        <Img src={bannerUrl} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  bannerUrl: React.PropTypes.string,
};

export default Header;
