import React from 'react';

export const Product = ({ product }) => {
  const { id, name, categoryIcon, category, userName, userSex } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">
        {categoryIcon} - {category}
      </td>

      <td
        data-cy="ProductUser"
        className={`${userSex === 'm' ? 'has-text-link' : 'has-text-danger'}`}
      >
        {userName}
      </td>
    </tr>
  );
};
