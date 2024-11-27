import React from 'react';

export const Panel = ({
  users,
  setActiveUser,
  activeUser,
  setQuery,
  query,
}) => {
  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            onClick={() => {
              setActiveUser('');
            }}
            className={`${activeUser ? '' : 'is-active'}`}
            href="#/"
          >
            All
          </a>

          {users.map(user => (
            <a
              onClick={() => setActiveUser(user.name)}
              className={`${activeUser === user.name ? 'is-active' : ''}`}
              key={user.id}
              data-cy="FilterUser"
              href="#/"
            >
              {user.name}
            </a>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              onChange={text => {
                setQuery(text.target.value);
              }}
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={query}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              {query ? (
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                  onClick={() => {
                    setQuery('');
                  }}
                />
              ) : null}
            </span>
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className="button is-success mr-6 is-outlined"
          >
            All
          </a>

          <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
            Category 1
          </a>

          <a data-cy="Category" className="button mr-2 my-1" href="#/">
            Category 2
          </a>

          <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
            Category 3
          </a>
          <a data-cy="Category" className="button mr-2 my-1" href="#/">
            Category 4
          </a>
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={() => {
              setActiveUser('');
              setQuery('');
            }}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
