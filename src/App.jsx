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

const filteredProduct = (isActive, isQuery, isCategory, isSelectedItem) => {
  const result = products.filter(product => {
    const matchUser = !isActive || product.userName === isActive;
    const mathQuery =
      !isQuery ||
      product.name.toLowerCase().includes(isQuery.toLowerCase().trim());
    const matchCategory =
      isCategory.length === 0 ||
      isCategory.some(category => category.title === product.category);

    return matchUser && mathQuery && matchCategory;
  });

  result.sort((a, b) => {
    switch (isSelectedItem) {
      case 'ID':
        return b.id - a.id;
      case 'Product':
        return a.name.localeCompare(b.name);
      case 'Category':
        return a.category.localeCompare(b.category);
      case 'User':
        return a.userName.localeCompare(b.userName);
      default:
        return '';
    }
  });

  return result;
};

export const App = () => {
  const [activeUser, setActiveUser] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleCategoryChange = category => {
    setActiveCategory(previousCategory => {
      if (previousCategory.includes(category)) {
        return previousCategory.filter(cat => cat !== category);
      }

      return [...previousCategory, category];
    });
  };

  const visibleProducts = filteredProduct(
    activeUser,
    query,
    activeCategory,
    selectedItem,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Panel
          users={usersFromServer}
          categories={categoriesFromServer}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setActiveUser={setActiveUser}
          activeUser={activeUser}
          setQuery={setQuery}
          query={query}
          handleCategoryChange={handleCategoryChange}
          setSelectedItem={setSelectedItem}
        />

        <Table
          visibleProducts={visibleProducts}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};
