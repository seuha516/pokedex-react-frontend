import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.img`
  width: 100%;
  max-height: 159px;
`;

const PokemonImage = () => {
  const data = useSelector((state) => state.pokedex.data);
  const image = useRef(null);
  useEffect(() => {
    image.current.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      easing: 'linear',
    });
  }, [data]);
  return <Wrapper src={`${process.env.REACT_APP_API_URL}image?value=picture_${data.num_nat}`} alt={`picture_${data.num_nat}`} ref={image} />;
};

export default PokemonImage;
