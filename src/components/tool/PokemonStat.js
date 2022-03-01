import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
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
const CanvasWrapper = styled.div`
  width: 100%;
  max-width: 422px;
  margin-left: max(calc(50% - 211px), 0px);
  height: 73%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Canvas = styled.canvas`
  width: 100%;
  border-radius: 15px;
  background-color: #ffffff2b;
`;
const StatWrapper = styled.div`
  width: 100%;
  height: 27%;
  margin-top: 25px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StatTextWrapper1 = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-around;
`;
const StatText1 = styled.div`
  font-size: 15px;
  width: 14.285714%;
  text-align: center;
  color: white;
  font-family: 'Gowun Batang', serif;
  @media all and (max-width: 350px) {
    font-size: 12.5px;
  }
`;
const StatTextWrapper2 = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StatText2 = styled.div`
  font-size: 25px;
  width: 14.285714%;
  text-align: center;
  color: white;
  font-family: 'Gowun Batang', serif;
  @media all and (max-width: 350px) {
    font-size: 21px;
  }
`;

const PokemonStat = () => {
  const { base_stat, color } = useSelector(({ pokedex }) => ({
    base_stat: pokedex.data.base_stat,
    color: pokedex.data.color,
  }));
  const canvasRef = useRef(null);
  useEffect(() => {
    var maxStat = Math.max(base_stat.h, base_stat.a, base_stat.b, base_stat.c, base_stat.d, base_stat.s);
    var minStat = Math.min(base_stat.h, base_stat.a, base_stat.b, base_stat.c, base_stat.d, base_stat.s);
    var newMaxStat = Math.floor(maxStat / 30) * 30 + 60;
    var newMinStat = Math.max(Math.ceil(minStat / 30) * 30 - 60, 0);
    if (newMaxStat - maxStat > 45) newMaxStat -= 30;
    if (minStat - newMinStat > 45) newMinStat += 30;
    var cnt = (newMaxStat - newMinStat) / 30 + 1;

    const dotY = (n) => {
      return 220 - 7.5 - (n - newMinStat) * (180 / (newMaxStat - newMinStat));
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.fillStyle = 'white';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(60 + 20, dotY(base_stat.h));
    ctx.lineTo(60 * 2 + 20, dotY(base_stat.a));
    ctx.lineTo(60 * 3 + 20, dotY(base_stat.b));
    ctx.lineTo(60 * 4 + 20, dotY(base_stat.c));
    ctx.lineTo(60 * 5 + 20, dotY(base_stat.d));
    ctx.lineTo(60 * 6 + 20, dotY(base_stat.s));
    ctx.stroke();
    for (var j = 0; j < 6; j++) {
      ctx.beginPath();
      ctx.arc(60 * j + 80, dotY([base_stat.h, base_stat.a, base_stat.b, base_stat.c, base_stat.d, base_stat.s].at(j)), 5, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fill();
    }
    ctx.fillStyle = 'gray';
    ctx.font = '14px League Spartan';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < cnt; i++) {
      const x = 30;
      const y = 220 - 7.5 - (180 / (cnt - 1)) * i;
      const num = newMinStat + 30 * i;
      ctx.fillText(`${num}`, x, y);
    }
    for (i = 0; i < 6; i++) {
      ctx.fillText(`${['H', 'A', 'B', 'C', 'D', 'S'].at(i)}`, 60 * i + 80, 245);
    }

    return () => {
      ctx.clearRect(0, 0, 422, 260);
    };
  }, [base_stat, color]);

  return (
    <Wrapper>
      <CanvasWrapper>
        <Canvas ref={canvasRef} width="422" height="260" />
      </CanvasWrapper>
      <StatWrapper>
        <StatTextWrapper1>
          {['체력', '공격', '방어', '특공', '특방', '스피드', '총합'].map((i) => (
            <StatText1 key={i}>{i}</StatText1>
          ))}
        </StatTextWrapper1>
        <StatTextWrapper2>
          {[base_stat.h, base_stat.a, base_stat.b, base_stat.c, base_stat.d, base_stat.s, base_stat.total].map((i, idx) => (
            <StatText2 key={idx}>{i}</StatText2>
          ))}
        </StatTextWrapper2>
      </StatWrapper>
    </Wrapper>
  );
};

export default PokemonStat;
