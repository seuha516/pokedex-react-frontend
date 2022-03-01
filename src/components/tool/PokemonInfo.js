import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 10px 1fr;
  grid-template-rows: 1fr 10px 1fr;
  animation: appear 0.7s;
  @keyframes appear {
    from {
      margin-top: 30px;
      opacity: 0;
    }
    to {
      margin-top: 0px;
      opacity: 1;
    }
  }
  @media all and (max-width: 600px) {
    grid-template-columns: 2fr 20px 3fr;
    grid-template-rows: 3fr 10px 4fr;
  }
`;
const PokemonImageWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 7.5px;
  background-color: #333333e9;
  border: 3px solid white;
  border-color: ${(props) => props.borderColor};
  overflow: hidden;
  img {
    max-width: 100%;
    display: block;
  }
  @media all and (max-width: 600px) {
    grid-row: 1 / 4;
    grid-column: 1 / 2;
  }
  @media all and (max-width: 520px) {
    height: 65vw;
  }
`;
const PokemonIntroWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 600px) {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }
`;
const PokemonExplanationWrapper = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 4;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 600px) {
    grid-row: 3 / 4;
    grid-column: 3 / 4;
  }
`;

const PokemonInfo = () => {
  const data = useSelector((state) => state.pokedex.data);
  const language = useSelector((state) => state.pokedex.option.language);

  return (
    <Wrapper>
      <PokemonImageWrapper borderColor={data.color}>
        <PokemonImage num_nat={data.num_nat} />
      </PokemonImageWrapper>
      <PokemonIntroWrapper>
        <PokemonIntro data={data} language={language} />
      </PokemonIntroWrapper>
      <PokemonExplanationWrapper>
        <PokemonExplanation classification={data.classification} explanation={data.explanation} />
      </PokemonExplanationWrapper>
    </Wrapper>
  );
};

export default PokemonInfo;

const PokemonImage = ({ num_nat }) => {
  return <img src={`${process.env.REACT_APP_API_URL}image?value=picture_${num_nat}`} alt={`picture_${num_nat}`} />;
};

const PokemonNumber = styled.div`
  font-size: 30px;
  font-family: 'Abel', sans-serif;
  margin-top: 15px;
  margin-bottom: 5px;
`;
const PokemonName = styled.div`
  font-size: ${(props) => props.fontSize};
  height: 36px;
  line-height: 36px;
  font-family: 'Do Hyeon', sans-serif;
  margin-bottom: 10px;
  @media all and (max-width: 700px) {
    font-size: ${(props) => props.smallFontSize};
  }
`;
const PokemonTypes = styled.div`
  display: flex;
  div + div {
    margin-left: 8px;
  }
`;
const PokemonType = styled.div`
  font-size: 15px;
  font-weight: 700;
  font-family: 'Nanum Gothic', sans-serif;
  text-align: center;
  width: 64px;
  height: 25px;
  line-height: 24px;
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

const PokemonIntro = ({ data, language }) => {
  return (
    <>
      <PokemonNumber>{`No. ${addZero(data.num_nat)}`}</PokemonNumber>
      <PokemonName
        fontSize={language === 'name_kor' ? '36px' : language === 'name_jap' ? '30px' : language === 'name_eng' ? '28px' : '36px'}
        smallFontSize={language === 'name_kor' && data[language].length > 4 ? '32px' : language === 'name_jap' ? '25px' : language === 'name_eng' ? '25px' : '36px'}
      >
        {data[language]}
      </PokemonName>
      <PokemonTypes>
        <PokemonType color={typeColor[data.types.type1]}>{data.types.type1}</PokemonType>
        {data.types.type2 && <PokemonType color={typeColor[data.types.type2]}>{data.types.type2}</PokemonType>}
      </PokemonTypes>
    </>
  );
};

const ClassificationWrapper = styled.div`
  font-size: 25px;
  font-family: 'Gowun Dodum', sans-serif;
  margin-bottom: 18px;
  @media all and (max-width: 420px) {
    font-size: ${(props) => (props.len > 6 ? '21px' : '25px')};
  }
  @media all and (max-width: 370px) {
    font-size: ${(props) => (props.len > 6 ? '18px' : props.len > 4 ? '24px' : '25px')};
  }
  @media all and (max-width: 330px) {
    font-size: ${(props) => (props.len > 6 ? '16px' : props.len > 4 ? '22px' : '24px')};
  }
`;
const ExplanationWrapper = styled.div`
  font-size: 18px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 200;
  line-height: 22px;
  min-height: 80px;
  margin-bottom: 30px;
`;

const PokemonExplanation = ({ classification, explanation }) => {
  return (
    <>
      <ClassificationWrapper len={classification.length}>{classification}</ClassificationWrapper>
      <ExplanationWrapper>{explanation}</ExplanationWrapper>
    </>
  );
};
