import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getList } from 'modules/pokedex';

import AppForLargeScreen from './AppForLargeScreen';
import AppForSmallScreen from './AppForSmallScreen';

const LargeScreen = styled.div`
  width: 100%;
  height: 100%;
  @media all and (max-width: 600px) {
    display: none;
  }
`;
const SmallScreen = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  @media all and (max-width: 600px) {
    display: block;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <>
      <LargeScreen>
        <AppForLargeScreen />
      </LargeScreen>
      <SmallScreen>
        <AppForSmallScreen />
      </SmallScreen>
    </>
  );
};

export default App;
