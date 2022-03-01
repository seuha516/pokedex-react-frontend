import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOption } from 'modules/pokedex';
import { BiReset } from 'react-icons/bi';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding-right: 8px;
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
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  svg {
    width: 25px;
    height: 25px;
    margin-left: 5px;
    color: grey;
    transition: all 0.2s linear;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  margin-bottom: 25px;
  @media all and (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;
const Title = styled.div`
  width: 100px;
  font-size: 25px;
  font-family: 'Gowun Dodum', sans-serif;
`;
const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const StatWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StatText = styled.div`
  min-width: ${(props) => `${props.w}px`};
  font-size: 24px;
  font-family: 'Smooch Sans', sans-serif;
`;
const SliderWrapper = styled.div`
  width: ${(props) => `calc(100% - ${props.w}px)`};
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;
const RealSlider = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background-color: #484848;
  position: relative;
`;
const RealSliderRange = styled.div`
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  height: 5px;
  border-radius: 5px;
  background-color: #6a2d2d;
  position: absolute;
  top: 0;
`;
const RealLeftThumb = styled.div`
  width: 0px;
  height: 0px;
  border-top: 18px solid #992f2f;
  border-right: 0px solid transparent;
  border-left: 8px solid transparent;
  position: absolute;
  top: -15.5px;
  left: ${(props) => props.left};
  z-index: 3;
`;
const RealRightThumb = styled.div`
  width: 0px;
  height: 0px;
  border-top: 18px solid #992f2f;
  border-right: 8px solid transparent;
  border-left: 0px solid transparent;
  position: absolute;
  top: -15.5px;
  left: ${(props) => props.left};
  z-index: 3;
`;
const SmallNumber = styled.div`
  font-size: 10px;
  text-align: ${(props) => props.textAlign};
  width: 20px;
  position: absolute;
  color: #a3a3a3;
  top: 5px;
  left: ${(props) => props.left};
`;
const VolumeSlider = styled.input`
  -webkit-appearance: none;
  position: absolute;
  width: calc(100% + 8px);
  height: 5px;
  top: 3.5px;
  left: ${(props) => props.left};
  opacity: 0;
  background-color: #484848;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    pointer-events: all;
    background-color: #850000;
    width: 16px;
    height: 18px;
    cursor: pointer;
  }
  z-index: 10;
  pointer-events: none;
  -webkit-appearance: none;
`;
const TypeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 69px;
`;
const Type = styled.div`
  font-size: 11px;
  font-family: 'Nanum Gothic', sans-serif;
  font-display: block;
  width: 34px;
  letter-spacing: ${(props) => props.letterSpacing};
  line-height: 20px;
  height: 20px;
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  margin: 1.5px 2px;
  opacity: ${(props) => props.opacity};
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Search = () => {
  const option = useSelector((state) => state.pokedex.option);
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.name.substring(0, 3) === 'min') {
      dispatch(setOption({ ...option, [e.target.name]: Math.min(e.target.value, option['max' + e.target.name.substring(3)]) }));
    } else if (e.target.name.substring(0, 3) === 'max') {
      dispatch(setOption({ ...option, [e.target.name]: Math.max(e.target.value, option['min' + e.target.name.substring(3)]) }));
    }
  };
  const selectType = (name) => {
    if (option.type1 === name) {
      dispatch(setOption({ ...option, type1: option.type2, type2: '' }));
    } else if (option.type2 === name) {
      dispatch(setOption({ ...option, type2: '' }));
    } else if (option.type1 === '') {
      dispatch(setOption({ ...option, type1: name }));
    } else if (option.type2 === '') {
      dispatch(setOption({ ...option, type2: name }));
    } else {
      dispatch(setOption({ ...option, type1: option.type2, type2: name }));
    }
  };
  const onReset = () => {
    dispatch(
      setOption({
        ...option,
        minH: 0,
        maxH: 255,
        minA: 0,
        maxA: 255,
        minB: 0,
        maxB: 255,
        minC: 0,
        maxC: 255,
        minD: 0,
        maxD: 255,
        minS: 0,
        maxS: 255,
        minTotal: 0,
        maxTotal: 720,
        minHeight: 0,
        maxHeight: 15,
        minWeight: 0,
        maxWeight: 999,
        type1: '',
        type2: '',
      }),
    );
  };

  const statCategory = [
    [
      {
        text: 'H P',
        name: 'H',
        min: 0,
        max: 255,
        width: 40,
      },
      {
        text: 'Atk',
        name: 'A',
        min: 0,
        max: 255,
        width: 40,
      },
    ],
    [
      {
        text: 'Def',
        name: 'B',
        min: 0,
        max: 255,
        width: 40,
      },
      {
        text: 'SpA',
        name: 'C',
        min: 0,
        max: 255,
        width: 40,
      },
    ],
    [
      {
        text: 'Spd',
        name: 'D',
        min: 0,
        max: 255,
        width: 40,
      },
      {
        text: 'Spe',
        name: 'S',
        min: 0,
        max: 255,
        width: 40,
      },
    ],
    [
      {
        text: 'Total Stat',
        name: 'Total',
        min: 0,
        max: 720,
        width: 80,
      },
    ],
    [
      {
        text: 'Height',
        name: 'Height',
        min: 0.0,
        max: 15.0,
        width: 65,
      },
      {
        text: 'Weight',
        name: 'Weight',
        min: 0.0,
        max: 999.0,
        width: 65,
      },
    ],
  ];
  const types = ['노말', '불꽃', '물', '풀', '전기', '얼음', '격투', '독', '땅', '비행', '에스퍼', '벌레', '바위', '고스트', '드래곤', '악', '강철', '페어리'];
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

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>검색 조건</Title>
        <BiReset onClick={onReset} />
      </TitleWrapper>
      {statCategory.map((i) => (
        <RowWrapper key={i[0].name}>
          {i.map((j, jdx) => (
            <StatWrapper key={j.name} style={{ marginLeft: jdx === 1 ? '25px' : '0px' }}>
              <StatText w={j.width}>{j.text}</StatText>
              <SliderWrapper w={j.width}>
                <RealSlider>
                  <RealLeftThumb left={`calc(${(100 * option['min' + j.name]) / j.max}% - 8px)`} />
                  <SmallNumber left={`calc(${(100 * option['min' + j.name]) / j.max}% - 20px)`} textAlign="right">
                    {option['min' + j.name]}
                  </SmallNumber>
                  <RealRightThumb left={`${(100 * option['max' + j.name]) / j.max}%`} />
                  <SmallNumber left={`calc(${(100 * option['max' + j.name]) / j.max}% )`} textAlign="left">
                    {option['max' + j.name]}
                  </SmallNumber>
                  <RealSliderRange width={`${(100 * (option['max' + j.name] - option['min' + j.name])) / j.max}%`} left={`${(100 * option['min' + j.name]) / j.max}%`} />
                </RealSlider>
                <VolumeSlider type="range" min={j.min} max={j.max} value={option['min' + j.name]} name={'min' + j.name} left="-12px" step={j.name.length === 6 ? 0.1 : 1} onInput={onChange} />
                <VolumeSlider type="range" min={j.min} max={j.max} value={option['max' + j.name]} name={'max' + j.name} left="4px" step={j.name.length === 6 ? 0.1 : 1} onInput={onChange} />
              </SliderWrapper>
            </StatWrapper>
          ))}
        </RowWrapper>
      ))}
      <TypeWrapper>
        {types.map((i) => (
          <Type key={i} name={i} color={typeColor[i]} letterSpacing={i.length === 3 ? '-1.5px' : '0px'} opacity={option.type1 === i || option.type2 === i ? '1' : '0.3'} onClick={() => selectType(i)}>
            {i}
          </Type>
        ))}
      </TypeWrapper>
    </Wrapper>
  );
};

export default Search;
