import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding-left: 50px;
  @media all and (max-width: 700px) {
    padding-left: 35px;
  }
  @media all and (max-width: 550px) {
    padding-left: 20px;
  }
  @media all and (max-width: 350px) {
    align-items: center;
    padding: 0;
  }
`;
const Text1 = styled.div`
  color: white;
  font-size: 60px;
  font-family: 'Luckiest Guy', cursive;
  opacity: 0.35;
  margin-top: -10px;
  margin-bottom: 20px;
  @media all and (max-width: 350px) {
    font-size: 55px;
  }
`;
const Text2 = styled.div`
  color: white;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  opacity: 0.35;
  @media all and (max-width: 450px) {
    display: none;
  }
`;
const Text3 = styled.div`
  color: white;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  height: 38px;
  opacity: 0.35;
  display: none;
  @media all and (max-width: 450px) {
    display: block;
  }
`;
const Image = styled.img`
  width: 240px;
  height: 200px;
  opacity: 0.25;
  position: absolute;
  top: 85px;
  left: calc(100% - 270px);
  @media all and (max-width: 400px) {
    left: calc(50% - 120px);
  }
`;

const Default2 = () => {
  return (
    <Wrapper>
      <Text1>Pokédex</Text1>
      <Text2>Made by Seungha Jeon</Text2>
      <Text3>Made by</Text3>
      <Text3>Seungha Jeon</Text3>
      <Image src="images/pokedex.png" alt="default" />
    </Wrapper>
  );
};

export default Default2;
