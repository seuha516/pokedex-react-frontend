import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getList, initGetListError } from 'modules/pokedex';
import PokemonList from './PokemonList';
import PokemonImage from './PokemonImage';
import Loading from './Loading';
import PokemonInfo from './PokemonInfo';

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/background.jpg');
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  img {
    -webkit-user-drag: none;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 750px;
  height: 815px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TopScreen = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 10px 1fr 10px 2fr;
  grid-template-rows: 1fr 10px 1fr;
  background-color: #000000e8;
`;
const PokemonImageWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7.5px;
  background-color: #000000e9;
  border: 3px solid;
  border-radius: 10px;
  border-color: ${(props) => props.color};
`;
const PokemonInfoWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PokemonStatWrapper = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 4;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #000000e9;
`;
const PokemonListWrapper = styled.div`
  grid-row: 1 / 4;
  grid-column: 5 / 6;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 185px 5px 180px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-image: linear-gradient(to right, #cb356b, #bd3f32);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
`;
const BottomScreen = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background-color: #000000e8;
`;
const DefaultImage = styled.img`
  width: 100%;
  max-height: 159px;
  opacity: 0.3;
`;

const Base = () => {
  const { list, data, getListError, readError } = useSelector(({ pokedex }) => ({
    list: pokedex.list,
    data: pokedex.data,
    getListError: pokedex.getListError,
    readError: pokedex.readError,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList(''));
    return () => {
      dispatch(initGetListError());
    };
  }, [dispatch]);

  return (
    <Background>
      <Wrapper>
        <TopScreen>
          <PokemonImageWrapper color={data ? data.color : '#ffffff00'}>{data ? <PokemonImage /> : <DefaultImage src="images/default.png" alt="default" />}</PokemonImageWrapper>
          <PokemonInfoWrapper>{data && <PokemonInfo />}</PokemonInfoWrapper>
          <PokemonStatWrapper />
          <PokemonListWrapper id="PokemonListWrapper">{list ? <PokemonList /> : <Loading r="80px" />}</PokemonListWrapper>
        </TopScreen>
        <BottomScreen></BottomScreen>
      </Wrapper>
    </Background>
  );
};

export default Base;
