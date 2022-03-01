import { read } from 'modules/pokedex';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { throttle } from 'lodash';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 165px 5px 160px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
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
const PokemonWrapper = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    img {
      animation: hoverPokemon 0.3s 2;
    }
  }
  @keyframes hoverPokemon {
    0% {
      margin-bottom: 0px;
    }
    50% {
      margin-bottom: 12px;
    }
    100% {
      margin-bottom: 0px;
    }
  }
`;
const PokemonIconWrapper = styled.div`
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PokemonIcon = styled.img`
  width: auto;
`;
const PokemonNumber = styled.div`
  min-width: 54px;
  text-align: center;
  font-size: 20px;
  font-family: 'Rubik', sans-serif;
  overflow: hidden;
  white-space: nowrap;
`;
const PokemonName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
`;
const NoResult = styled.div`
  width: 100%;
  text-align: center;
  font-size: 40px;
  font-family: 'Smooch Sans', sans-serif;
  color: white;
`;

const addZero = (n) => {
  if (n < 10) return `00${n}`;
  else if (n < 100) return `0${n}`;
  else return `${n}`;
};

const PokemonList = () => {
  const listDiv = useRef(null);
  const list = useSelector((state) => state.pokedex.list);
  const language = useSelector((state) => state.pokedex.option.language);
  const dispatch = useDispatch();
  const [style, setStyle] = useState(Array.from({ length: list.length }, () => ({ width: '0' })));

  const makeStyle = (idx) => {
    const dist = Math.abs(listDiv.current.scrollTop - 45 * idx);
    if (dist > 360) {
      return { width: '70%', backgroundColor: '#00000000', color: '#00000000', iconOpacity: 0.7, nameFontSize: 80 };
    }
    const size1 = Math.max(600 - dist, 420) / 6;
    const size2 = Math.max(360 - dist, 180) / 3.6;
    const size3 = Math.max(900 - dist, 180) / 9;
    const makeColor = (maxColor, minColor, percent) => {
      const a = parseInt(maxColor.substring(1, 3), 16) * percent + parseInt(minColor.substring(1, 3), 16) * (1 - percent);
      const b = parseInt(maxColor.substring(3, 5), 16) * percent + parseInt(minColor.substring(3, 5), 16) * (1 - percent);
      const c = parseInt(maxColor.substring(5, 7), 16) * percent + parseInt(minColor.substring(5, 7), 16) * (1 - percent);
      const d = parseInt(maxColor.substring(7, 9), 16) * percent + parseInt(minColor.substring(7, 9), 16) * (1 - percent);
      return `#${Math.round(a).toString(16)}${Math.round(b).toString(16)}${Math.round(c).toString(16)}${Math.round(d).toString(16)}`;
    };
    const width = `${size1}%`;
    const backgroundColor = makeColor('#ff2020d9', '#00000000', size2 / 100);
    const color = makeColor('#ffffffff', '#00000000', size2 / 100);
    const iconOpacity = size2 / 100;
    const nameFontSize = size3;
    return { width, backgroundColor, color, iconOpacity, nameFontSize };
  };
  const onClick = (num_nat, idx) => {
    dispatch(read(num_nat));
    listDiv.current.scrollTop = 45 * idx;
  };
  const onScroll = throttle(() => setStyle(style.map((_i, idx) => makeStyle(idx))), 20);

  useEffect(() => {
    if (listDiv) {
      listDiv.current.addEventListener('scroll', onScroll);
      listDiv.current.scrollTop = 0;
    }
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDiv]);

  return (
    <Wrapper ref={listDiv}>
      {list.length > 0 ? (
        list.map((i, idx) => (
          <PokemonWrapper key={i.num_nat} onClick={() => onClick(i.num_nat, idx)} style={style[idx]}>
            <PokemonIconWrapper style={{ minWidth: `${style[idx].nameFontSize * 0.65}px` }}>
              <PokemonIcon src={`${process.env.REACT_APP_API_URL}image?value=icon_${i.num_nat}`} alt={`picture_${i.num_nat}`} style={{ opacity: style[idx].iconOpacity }} />
            </PokemonIconWrapper>
            <PokemonNumber style={{ fontSize: `${style[idx].nameFontSize * 0.2}px`, minWidth: `${style[idx].nameFontSize * 0.54}px` }}>{addZero(i.num_nat)}</PokemonNumber>
            <PokemonName style={{ fontSize: `${style[idx].nameFontSize * 0.18}px` }}>{i[language]}</PokemonName>
          </PokemonWrapper>
        ))
      ) : (
        <NoResult>No Result</NoResult>
      )}
    </Wrapper>
  );
};

export default PokemonList;
