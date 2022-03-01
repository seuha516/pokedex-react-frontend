import React from 'react';
import { useSelector } from 'react-redux';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const HeightWrapper = styled.div`
  font-size: 25px;
  font-family: 'Saira Condensed', sans-serif;
  height: 25px;
  margin-top: 10px;
  @media all and (max-width: 600px) {
    margin-top: 2.5px;
  }
`;
const WeightWrapper = styled.div`
  font-size: 25px;
  font-family: 'Saira Condensed', sans-serif;
  height: 25px;
  margin-top: 5px;
`;
const RateWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: 'Gowun Dodum', sans-serif;
  svg {
    width: 20px;
    height: 20px;
  }
  height: 25px;
  margin-top: 10px;
`;
const TypeTitle = styled.div`
  font-size: 18px;
  font-family: 'Gowun Dodum', sans-serif;
  height: 25px;
  margin-top: 23px;
`;
const TypeWrapper = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const TypeRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;
const TypeNumber = styled.div`
  font-size: ${(props) => props.fontSize};
  font-family: 'Gowun Dodum', sans-serif;
  width: 42px;
  margin-top: 1.5px;
  letter-spacing: ${(props) => props.letterSpacing};
`;
const Types = styled.div`
  width: calc(100% - 42px);
  display: flex;
  flex-wrap: wrap;
`;
const PokemonType = styled.div`
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
`;

const TypeCalculate = (t) => {
  const types = ['노말', '불꽃', '물', '풀', '전기', '얼음', '격투', '독', '땅', '비행', '에스퍼', '벌레', '바위', '고스트', '드래곤', '악', '강철', '페어리'];
  const typesCounter = {
    노말: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: 1,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: 0,
      바위: 0,
      고스트: -9999,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: 0,
    },
    불꽃: {
      노말: 0,
      불꽃: -1,
      물: 1,
      풀: -1,
      전기: 0,
      얼음: -1,
      격투: 0,
      독: 0,
      땅: 1,
      비행: 0,
      에스퍼: 0,
      벌레: -1,
      바위: 1,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: -1,
      페어리: -1,
    },
    물: {
      노말: 0,
      불꽃: -1,
      물: -1,
      풀: 1,
      전기: 1,
      얼음: -1,
      격투: 0,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: 0,
      바위: 0,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: -1,
      페어리: 0,
    },
    풀: {
      노말: 0,
      불꽃: 1,
      물: -1,
      풀: -1,
      전기: -1,
      얼음: 1,
      격투: 0,
      독: 1,
      땅: -1,
      비행: 1,
      에스퍼: 0,
      벌레: 1,
      바위: 0,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: 0,
    },
    전기: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: -1,
      얼음: 0,
      격투: 0,
      독: 0,
      땅: 1,
      비행: -1,
      에스퍼: 0,
      벌레: 0,
      바위: 0,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: -1,
      페어리: 0,
    },
    얼음: {
      노말: 0,
      불꽃: 1,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: -1,
      격투: 1,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: 0,
      바위: 1,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 1,
      페어리: 0,
    },
    격투: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: 0,
      독: 0,
      땅: 0,
      비행: 1,
      에스퍼: 1,
      벌레: -1,
      바위: -1,
      고스트: 0,
      드래곤: 0,
      악: -1,
      강철: 0,
      페어리: 1,
    },
    독: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: -1,
      전기: 0,
      얼음: 0,
      격투: -1,
      독: -1,
      땅: 1,
      비행: 0,
      에스퍼: 1,
      벌레: -1,
      바위: 0,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: -1,
    },
    땅: {
      노말: 0,
      불꽃: 0,
      물: 1,
      풀: 1,
      전기: -9999,
      얼음: 1,
      격투: 0,
      독: -1,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: 0,
      바위: -1,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: 0,
    },
    비행: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: -1,
      전기: 1,
      얼음: 1,
      격투: -1,
      독: 0,
      땅: -9999,
      비행: 0,
      에스퍼: 0,
      벌레: -1,
      바위: 1,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: 0,
    },
    에스퍼: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: -1,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: -1,
      벌레: 1,
      바위: 0,
      고스트: 1,
      드래곤: 0,
      악: 1,
      강철: 0,
      페어리: 0,
    },
    벌레: {
      노말: 0,
      불꽃: 1,
      물: 0,
      풀: -1,
      전기: 0,
      얼음: 0,
      격투: -1,
      독: 0,
      땅: -1,
      비행: 1,
      에스퍼: 0,
      벌레: 0,
      바위: 1,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 0,
      페어리: 0,
    },
    바위: {
      노말: -1,
      불꽃: -1,
      물: 1,
      풀: 1,
      전기: 0,
      얼음: 0,
      격투: 1,
      독: -1,
      땅: 1,
      비행: -1,
      에스퍼: 0,
      벌레: 0,
      바위: 0,
      고스트: 0,
      드래곤: 0,
      악: 0,
      강철: 1,
      페어리: 0,
    },
    고스트: {
      노말: -9999,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: -9999,
      독: -1,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: -1,
      바위: 0,
      고스트: 1,
      드래곤: 0,
      악: 1,
      강철: 0,
      페어리: 0,
    },
    드래곤: {
      노말: 0,
      불꽃: -1,
      물: -1,
      풀: -1,
      전기: -1,
      얼음: 1,
      격투: 0,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: 0,
      바위: 0,
      고스트: 0,
      드래곤: 1,
      악: 0,
      강철: 0,
      페어리: 1,
    },
    악: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: 1,
      독: 0,
      땅: 0,
      비행: 0,
      에스퍼: -9999,
      벌레: 1,
      바위: 0,
      고스트: -1,
      드래곤: 0,
      악: -1,
      강철: 0,
      페어리: 1,
    },
    강철: {
      노말: -1,
      불꽃: 1,
      물: 0,
      풀: -1,
      전기: 0,
      얼음: -1,
      격투: 1,
      독: -9999,
      땅: 1,
      비행: -1,
      에스퍼: -1,
      벌레: -1,
      바위: -1,
      고스트: 0,
      드래곤: -1,
      악: 0,
      강철: -1,
      페어리: -1,
    },
    페어리: {
      노말: 0,
      불꽃: 0,
      물: 0,
      풀: 0,
      전기: 0,
      얼음: 0,
      격투: -1,
      독: 1,
      땅: 0,
      비행: 0,
      에스퍼: 0,
      벌레: -1,
      바위: 0,
      고스트: 0,
      드래곤: -9999,
      악: -1,
      강철: 1,
      페어리: 0,
    },
  };
  var temp = [];
  for (var i = 0; i < types.length; i++) {
    temp.push({ name: types[i], count: typesCounter[types[i]][t.type1] });
  }
  if (t.type2) {
    for (i = 0; i < types.length; i++) {
      temp[i].count += typesCounter[types[i]][t.type2];
    }
  }
  var result = { 4: [], 2: [], 1: [], 0.5: [], 0.25: [], 0: [] };
  for (i = 0; i < types.length; i++) {
    if (temp[i].count < -9000) {
      result['0'].push(temp[i].name);
    } else if (temp[i].count === 2) {
      result['4'].push(temp[i].name);
    } else if (temp[i].count === 1) {
      result['2'].push(temp[i].name);
    } else if (temp[i].count === 0) {
      result['1'].push(temp[i].name);
    } else if (temp[i].count === -1) {
      result['0.5'].push(temp[i].name);
    } else if (temp[i].count === -2) {
      result['0.25'].push(temp[i].name);
    }
  }
  return result;
};
const getGCD = (num1, num2) => (num2 > 0 ? getGCD(num2, num1 % num2) : num1);
const rateCalculate = (x) => {
  if (x === -1) return '없음';
  const a = x * 1000;
  const b = (1 - x) * 1000;
  return `${a / getGCD(a, b)} : ${b / getGCD(a, b)}`;
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

const PokemonSpec = () => {
  const data = useSelector((state) => state.pokedex.data);
  const counter = TypeCalculate(data.types);
  return (
    <Wrapper>
      <HeightWrapper>{`Height: ${data.height}m`}</HeightWrapper>
      <WeightWrapper>{`Weight: ${data.weight}kg`}</WeightWrapper>
      <RateWrapper>
        <div style={{ marginRight: '10px' }}>성비: </div>
        <BsGenderMale style={{ color: '#2d6eff' }} />
        <div style={{ margin: '0 7.5px' }}>{rateCalculate(data.male_rate)}</div>
        <BsGenderFemale style={{ color: '#ff76e8' }} />
      </RateWrapper>
      <TypeTitle>- 타입 상성 -</TypeTitle>
      <TypeWrapper>
        {['4', '2', '1', '0.5', '0.25', '0'].map(
          (i) =>
            counter[i].length > 0 && (
              <TypeRow key={i}>
                <TypeNumber letterSpacing={i.length === 4 ? '-1.5px' : i.length === 3 ? '-1px' : '0px'} fontSize={i.length === 4 ? '15px' : i.length === 3 ? '16px' : '18px'}>{`${i}배: `}</TypeNumber>
                <Types>
                  {counter[i].map((j) => (
                    <PokemonType key={j} color={typeColor[j]} letterSpacing={j.length === 3 ? '-1.5px' : '0px'}>
                      {j}
                    </PokemonType>
                  ))}
                </Types>
              </TypeRow>
            ),
        )}
      </TypeWrapper>
    </Wrapper>
  );
};

export default PokemonSpec;
