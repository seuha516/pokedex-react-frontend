import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000e9;
`;
const Image = styled.img`
  width: 100%;
  max-height: 370px;
  opacity: 0.3;
`;

const Default1 = () => {
  return (
    <Wrapper>
      <Image src="images/default.png" alt="default" />
    </Wrapper>
  );
};

export default Default1;
