import * as React from 'react';
import { withRouter } from 'react-router';
import { Header, HeaderProps } from '../components/Header';
import { withPreferences } from './withPreferences';
import { withSearch, WithSearchProps } from './withSearch';

type HeaderContainerProps = HeaderProps & WithSearchProps;

const HeaderContainer: React.FunctionComponent<HeaderContainerProps> = (props: HeaderContainerProps) => {
  return (
    <Header { ...props }/>
  );
};

export default withRouter(withPreferences(withSearch(HeaderContainer)));
