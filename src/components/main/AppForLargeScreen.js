import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoEarth } from 'react-icons/io5';
import { BsSortDownAlt, BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

import { setOption } from 'modules/pokedex';
import Loading from '../etc/Loading';
import Default1 from '../etc/Default1';
import Default2 from '../etc/Default2';
import PokemonInfo from '../tool/PokemonInfo';
import PokemonList from '../tool/PokemonList';
import PokemonSpec from 'components/tool/PokemonSpec';
import PokemonStat from 'components/tool/PokemonStat';
import SecondSort from 'components/tool/SecondSort';
import Search from 'components/tool/Search';

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
  font-display: block;
  img {
    -webkit-user-drag: none;
  }
  @media all and (max-width: 700px) {
    padding: 50px 10px;
  }
  @media all and (max-width: 450px) {
    padding: 50px 5px;
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
  position: relative;
  background-color: #000000e8;
  display: flex;
  justify-content: space-between;
`;
const BottomScreen = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  padding: 15px;
  position: relative;
  background-color: #000000e8;
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
const ListWrapper = styled.div`
  width: calc(50% - 10px);
  height: 100%;
`;
const SpecWrapper = styled.div`
  width: 40%;
  height: 100%;
`;
const StatWrapper = styled.div`
  width: calc(60% - 10px);
  height: 100%;
`;

const LanguageButtonWrapper = styled.div`
  position: absolute;
  top: -22.5px;
  left: calc(100% - 100px);
  width: 65px;
  height: 35px;
  border-radius: 24px;
  font-size: 22px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #ff6161;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  opacity: 0.7;
  transition: all 0.2s linear;
  cursor: pointer;
  border: 2px solid #ffffff89;
  z-index: 5;
  &:hover {
    opacity: 1;
  }
  svg {
    margin-left: -1px;
    margin-right: 5px;
  }
`;
const FirstSortButtonWrapper = styled.div`
  position: absolute;
  top: -22.5px;
  left: calc(100% - 215px);
  width: 110px;
  height: 35px;
  border-radius: 24px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #870000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  opacity: 0.7;
  transition: all 0.2s linear;
  cursor: pointer;
  border: 2px solid #ffffff89;
  z-index: 5;
  &:hover {
    opacity: 1;
  }
`;
const SecondSortButtonWrapper = styled.div`
  position: absolute;
  top: 382.5px;
  left: 0px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  svg {
    width: 25px;
    height: 25px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 2px solid white;
  border-color: ${(props) => (props.popUp ? 'white' : '#ffffff99')};
  background-color: ${(props) => (props.popUp ? '#ff6800' : '#9d4a11')};
  opacity: ${(props) => (props.popUp ? 1 : 0.75)};
  transition: all 0.2s linear;
  cursor: pointer;
  z-index: 5;
`;
const SearchButtonWrapper = styled.div`
  position: absolute;
  top: 382.5px;
  left: 45px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  svg {
    width: 25px;
    height: 25px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 2px solid white;
  border-color: ${(props) => (props.popUp ? 'white' : '#ffffff99')};
  background-color: ${(props) => (props.popUp ? '#edc412' : '#7a660f')};
  opacity: ${(props) => (props.popUp ? 1 : 0.75)};
  transition: all 0.2s linear;
  cursor: pointer;
  z-index: 5;
`;

const AppForLargeScreen = () => {
  const list = useSelector((state) => state.pokedex.list);
  const data = useSelector((state) => state.pokedex.data);
  const [popUp, setPopUp] = useState([false, false]);

  return (
    <Background>
      <Wrapper>
        <TopScreen>
          <InfoWrapper>{data ? <PokemonInfo /> : <Default1 />}</InfoWrapper>
          <ListWrapper>{list ? <PokemonList /> : <Loading r="100px" />}</ListWrapper>
          <LanguageButton />
          <FirstSortButton />
          <SecondSortButton popUp={popUp} setPopUp={setPopUp} />
          <SearchButton popUp={popUp} setPopUp={setPopUp} />
        </TopScreen>
        <BottomScreen>
          {data || popUp[0] || popUp[1] ? (
            <>
              <SpecWrapper>{popUp[0] ? <SecondSort /> : data && <PokemonSpec />}</SpecWrapper>
              <StatWrapper>{popUp[1] ? <Search /> : data && <PokemonStat />}</StatWrapper>
            </>
          ) : (
            <Default2 />
          )}
        </BottomScreen>
      </Wrapper>
    </Background>
  );
};

export default AppForLargeScreen;

const LanguageButton = () => {
  const option = useSelector((state) => state.pokedex.option);
  const dispatch = useDispatch();
  const onClick = () => {
    if (option.language === 'name_kor') {
      if (option.firstSort1.substring(0, 4) === 'name') {
        dispatch(setOption({ ...option, language: 'name_jap', firstSort1: 'name_jap' }));
      } else {
        dispatch(setOption({ ...option, language: 'name_jap' }));
      }
    } else if (option.language === 'name_jap') {
      if (option.firstSort1.substring(0, 4) === 'name') {
        dispatch(setOption({ ...option, language: 'name_eng', firstSort1: 'name_eng' }));
      } else {
        dispatch(setOption({ ...option, language: 'name_eng' }));
      }
    } else if (option.language === 'name_eng') {
      if (option.firstSort1.substring(0, 4) === 'name') {
        dispatch(setOption({ ...option, language: 'name_kor', firstSort1: 'name_kor' }));
      } else {
        dispatch(setOption({ ...option, language: 'name_kor' }));
      }
    }
  };
  return (
    <LanguageButtonWrapper onClick={onClick}>
      <IoEarth />
      {option.language[5].toUpperCase()}
    </LanguageButtonWrapper>
  );
};
const FirstSortButton = () => {
  const option = useSelector((state) => state.pokedex.option);
  const dispatch = useDispatch();
  const onClick = () => {
    if (option.firstSort1 === 'num_nat' && option.firstSort2 === 'ASC') {
      dispatch(setOption({ ...option, firstSort1: 'num_nat', firstSort2: 'DESC' }));
    } else if (option.firstSort1 === 'num_nat' && option.firstSort2 === 'DESC') {
      dispatch(setOption({ ...option, firstSort1: option.language, firstSort2: 'ASC' }));
    } else if (option.firstSort1 !== 'num_nat' && option.firstSort2 === 'ASC') {
      dispatch(setOption({ ...option, firstSort1: option.language, firstSort2: 'DESC' }));
    } else if (option.firstSort1 !== 'num_nat' && option.firstSort2 === 'DESC') {
      dispatch(setOption({ ...option, firstSort1: 'num_nat', firstSort2: 'ASC' }));
    }
  };
  return <FirstSortButtonWrapper onClick={onClick}>{(option.firstSort1 === 'num_nat' ? '번호순' : '이름순') + (option.firstSort2 === 'ASC' ? ' ↑' : ' ↓')}</FirstSortButtonWrapper>;
};
const SecondSortButton = ({ popUp, setPopUp }) => {
  return (
    <SecondSortButtonWrapper popUp={popUp[0]} onClick={() => setPopUp([!popUp[0], popUp[1]])}>
      <BsSortDownAlt />
    </SecondSortButtonWrapper>
  );
};
const SearchButton = ({ popUp, setPopUp }) => {
  return (
    <SearchButtonWrapper popUp={popUp[1]} onClick={() => setPopUp([popUp[0], !popUp[1]])}>
      <BsSearch />
    </SearchButtonWrapper>
  );
};
