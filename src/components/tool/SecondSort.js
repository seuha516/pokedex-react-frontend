import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BiReset } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { ImSortNumericAsc, ImSortNumbericDesc } from 'react-icons/im';
import { GiHeartPlus, GiSwordInStone, GiArrowsShield, GiOrbWand, GiShieldcomb, GiConverseShoe, GiBodyHeight, GiWeight, GiBattleGear } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { setOption } from 'modules/pokedex';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
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
  margin-bottom: 22.5px;
  @media all and (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 12.5px;
  }
`;
const Title = styled.div`
  width: 100px;
  font-size: 25px;
  font-family: 'Gowun Dodum', sans-serif;
`;
const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  height: ${(props) => props.h};
`;
const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => props.margin};
  border-radius: 5px;
  padding: 0 5px;
  background-color: ${(props) => props.backgroundColor};
  svg {
    width: 24px;
    height: 24px;
  }
  transition: all 0.2s linear;
  cursor: pointer;
  opacity: ${(props) => props.opacity};
  &:hover {
    opacity: 1;
  }
`;
const Text = styled.div`
  width: calc(100% - 24px);
  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-family: 'Gowun Batang', serif;
`;

const SecondSort = () => {
  const option = useSelector((state) => state.pokedex.option);
  const dispatch = useDispatch();
  const sortCategory = [
    [
      {
        icon: <GiHeartPlus />,
        text: '체력',
        name: 'h',
      },
      {
        icon: <GiSwordInStone />,
        text: '공격',
        name: 'a',
      },
    ],
    [
      {
        icon: <GiArrowsShield />,
        text: '방어',
        name: 'b',
      },
      {
        icon: <GiOrbWand />,
        text: '특공',
        name: 'c',
      },
    ],
    [
      {
        icon: <GiShieldcomb />,
        text: '특방',
        name: 'd',
      },
      {
        icon: <GiConverseShoe />,
        text: '스피드',
        name: 's',
      },
    ],
    [{ icon: <GiBattleGear />, text: '종족값 총합', name: 'total' }],
    [
      {
        icon: <GiBodyHeight />,
        text: '키',
        name: 'height',
      },
      {
        icon: <GiWeight />,
        text: '몸무게',
        name: 'weight',
      },
    ],
    [
      {
        icon: <BsGenderMale />,
        text: '수컷 비율',
        name: 'male_rate',
      },
      {
        icon: <BsGenderFemale />,
        text: '암컷 비율',
        name: 'female_rate',
      },
    ],
    [
      {
        icon: <ImSortNumericAsc />,
        text: '오름차순',
        name: 'ASC',
      },
      {
        icon: <ImSortNumbericDesc />,
        text: '내림차순',
        name: 'DESC',
      },
    ],
  ];

  const onClick = (name) => {
    if (name === 'ASC') {
      dispatch(setOption({ ...option, secondSort2: 'ASC' }));
    } else if (name === 'DESC') {
      dispatch(setOption({ ...option, secondSort2: 'DESC' }));
    } else {
      if (option.secondSort1 === name) {
        dispatch(setOption({ ...option, secondSort1: '' }));
      } else {
        dispatch(setOption({ ...option, secondSort1: name }));
      }
    }
  };
  const onReset = () => {
    dispatch(setOption({ ...option, secondSort1: '', secondSort2: 'ASC' }));
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>정렬 기준</Title>
        <BiReset onClick={onReset} />
      </TitleWrapper>
      {sortCategory.map((i, idx) => (
        <RowWrapper key={i[0].name} h={idx < 5 ? '35px' : '60px'}>
          {i.map((j) => (
            <ItemWrapper
              key={j.name}
              backgroundColor={
                j.name === 'ASC'
                  ? option.secondSort1 === ''
                    ? '#1e1e1e'
                    : '#337A2E'
                  : j.name === 'DESC'
                  ? option.secondSort1 === ''
                    ? '#1e1e1e'
                    : '#19478D'
                  : option.secondSort1 === j.name || option.secondSort2 === j.name
                  ? '#666666'
                  : '#323232'
              }
              opacity={option.secondSort1 === j.name || option.secondSort2 === j.name ? 1 : 0.5}
              margin={option.secondSort1 === j.name || option.secondSort2 === j.name ? '-3px 6px 3px 0px' : '0 3px'}
              onClick={() => onClick(j.name)}
            >
              {j.icon}
              <Text fontSize={j.text.length > 2 ? '16px' : '18px'}>{j.text}</Text>
            </ItemWrapper>
          ))}
        </RowWrapper>
      ))}
    </Wrapper>
  );
};

export default SecondSort;
