import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getList, read, initGetListError } from 'modules/pokedex';

const App = () => {
  const { list, data, getListError, readError } = useSelector(({ pokedex }) => ({
    list: pokedex.list,
    data: pokedex.data,
    getListError: pokedex.getListError,
    readError: pokedex.readError,
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
          <div key={i.num_nat} onClick={() => dispatch(read({ num: i.num_nat }))} style={{ cursor: 'pointer' }}>
            <div>{i.num_nat}</div>
            <div>{i.name_kor}</div>
          </div>
        ))}
        {data && (
          <div style={{ position: 'fixed', top: '0', left: '80px', backgroundColor: 'lightblue' }}>
            <div>{data.num_nat}</div>
            <div>{data.name_kor}</div>
            <div>{data.name_jap}</div>
            <div>{data.name_eng}</div>
            <div>{JSON.stringify(data.base_stat)}</div>
            <div>{JSON.stringify(data.types)}</div>
            <div>{data.classification}</div>
            <div>{data.height}m</div>
            <div>{data.weight}kg</div>
            <div>성비 {data.male_rate < 0 ? '무성' : `${data.male_rate} : ${1 - data.male_rate}`}</div>
          </div>
        )}
      </div>
    );
  } else {
    return <div>x</div>;
  }
};

export default App;
