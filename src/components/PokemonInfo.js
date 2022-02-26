import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PokemonNumber = styled.div`
  font-size: 30px;
  font-family: 'Abel', sans-serif;
  margin-bottom: 5px;
`;
const PokemonName = styled.div`
  font-size: 36px;
  font-family: 'Do Hyeon', sans-serif;
  margin-bottom: 15px;
`;
const PokemonTypes = styled.div`
  div + div {
    margin-top: 5px;
  }
`;
const PokemonType = styled.div`
  font-size: 15px;
  font-weight: 700;
  font-family: 'Nanum Gothic', sans-serif;
  font-display: block;
  width: 64px;
  line-height: 24px;
  height: 25px;
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const addZero = (n) => {
  if (n < 10) return `00${n}`;
  else if (n < 100) return `0${n}`;
  else return `${n}`;
};
const typeColor = {
  노말: '#ADA594',
  불꽃: '#F08030',
  물: '#0267C2',
  풀: '#389A02',
  전기: '#EDA900',
  얼음: '#6DD3F5',
  격투: '#C03028',
  독: '#6B246E',
  땅: '#E0C068',
  비행: '#5D73D4',
  에스퍼: '#DC3165',
  벌레: '#888C0E',
  바위: '#9E863D',
  고스트: '#695582',
  드래곤: '#4E3BA4',
  악: '#3C2D23',
  강철: '#8E8E9F',
  페어리: '#E08EE0',
};
const PokemonInfo = () => {
  const data = useSelector((state) => state.pokedex.data);
  return (
    <>
      <PokemonNumber>{`No. ${addZero(data.num_nat)}`}</PokemonNumber>
      <PokemonName>{data.name_kor}</PokemonName>
      <PokemonTypes>
        <PokemonType color={typeColor[data.types.type1]}>{data.types.type1}</PokemonType>
        {data.types.type2 && <PokemonType color={typeColor[data.types.type2]}>{data.types.type2}</PokemonType>}
      </PokemonTypes>
    </>
  );
};

export default PokemonInfo;
