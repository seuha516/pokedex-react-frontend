import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getList, initGetListError } from 'modules/pokedex';

const App = () => {
  const { list, getListError } = useSelector(({ pokedex }) => ({
    list: pokedex.list,
    getListError: pokedex.getListError,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList(''));
    return () => {
      dispatch(initGetListError());
    };
  }, [dispatch]);

  if (list) {
    return (
      <div>
        {list.map((i) => (
          <div>{i.name_kor}</div>
        ))}
      </div>
    );
  } else {
    return <div>x</div>;
  }
};

export default App;
