/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Panel } from './components/panel/panel';
import { Table } from './components/table/table';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(u => u.id === category.ownerId); // find by category.ownerId

  return {
    id: product.id,
    name: product.name,
    categoryIcon: category.icon,
    category: category.title,
    userName: user.name,
    userSex: user.sex,
  };
});

const filteredProduct = (isActive, isQuery) => {
  return products.filter(product => {
    const matchUser = !isActive || product.userName === isActive;
    const mathcQuery =
      !isQuery ||
      product.name.toLowerCase().includes(isQuery.toLowerCase().trim());

    return matchUser && mathcQuery;
  });
};

export const App = () => {
  const [activeUser, setActiveUser] = useState('');
  const [query, setQuery] = useState('');

  const visibleProducts = filteredProduct(activeUser, query);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Panel
          users={usersFromServer}
          setActiveUser={setActiveUser}
          activeUser={activeUser}
          setQuery={setQuery}
          query={query}
        />

        <Table visibleProducts={visibleProducts} />
      </div>
    </div>
  );
};
