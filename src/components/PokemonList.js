import { read } from 'modules/pokedex';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { throttle } from 'lodash';

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
`;
const PokemonName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
`;

const addZero = (n) => {
  if (n < 10) return `00${n}`;
  else if (n < 100) return `0${n}`;
  else return `${n}`;
};
const makeStyle = (idx) => {
  const size1 = Math.max(600 - Math.abs(document.getElementById('PokemonListWrapper').scrollTop + 185 - 180 - (45 * idx + 25)), 420) / 6;
  const size2 = Math.max(360 - Math.abs(document.getElementById('PokemonListWrapper').scrollTop + 185 - 180 - (45 * idx + 25)), 180) / 3.6;
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
  return { width, backgroundColor, color, iconOpacity };
};

const PokemonList = () => {
  const list = useSelector((state) => state.pokedex.list);
  const [style, setStyle] = useState(Array.from({ length: list.length }, () => ({ width: '100%', backgroundColor: '#ff2020d9' })));
  const dispatch = useDispatch();
  const onClick = (num_nat) => {
    dispatch(read(num_nat));
    document.getElementById('PokemonListWrapper').scrollTop = 45 * num_nat - 20;
  };
  const onScroll = throttle(() => setStyle(style.map((_i, idx) => makeStyle(idx))), 25);
  useEffect(() => {
    document.getElementById('PokemonListWrapper').addEventListener('scroll', onScroll);
    document.getElementById('PokemonListWrapper').scrollTop = 25;
    return () => {
      document.getElementById('PokemonListWrapper').removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (list) {
    return list.map((i, idx) => (
      <PokemonWrapper key={i.num_nat} onClick={() => onClick(i.num_nat)} style={style[idx]}>
        <PokemonIconWrapper>
          <PokemonIcon src={`${process.env.REACT_APP_API_URL}image?value=icon_${i.num_nat}`} alt={`picture_${i.num_nat}`} style={{ opacity: style[idx].iconOpacity }} />
        </PokemonIconWrapper>
        <PokemonNumber>{addZero(i.num_nat)}</PokemonNumber>
        <PokemonName>{i.name_kor}</PokemonName>
      </PokemonWrapper>
    ));
  } else {
    return new Array(5).map((i, idx) => <PokemonWrapper></PokemonWrapper>);
  }
};

export default PokemonList;
