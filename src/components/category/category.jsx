import React from 'react';

export const Category = ({
  categories,
  setActiveCategory,
  activeCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={`button is-success mr-6 ${activeCategory.length === 0 ? '' : 'is-outlined'}`}
        onClick={() => setActiveCategory([])}
      >
        All
      </a>

      {categories.map(category => (
        <a
          key={category.id}
          data-cy="Category"
          className={`button mr-2 my-1 ${activeCategory.includes(category) ? 'is-info' : ''}`}
          href="#/"
          onClick={() => {
            handleCategoryChange(category);
          }}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
