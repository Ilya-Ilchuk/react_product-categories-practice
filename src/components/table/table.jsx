import { Product } from '../product/product';

export const Table = ({ visibleProducts, setSelectedItem }) => {
  const tableRowItems = ['ID', 'Product', 'Category', 'User'];

  const arrowIcons = {
    default: 'fas fa-sort',
    arrowIsDown: 'fas fa-sort-down',
    arrowIsUp: 'fas fa-sort-up',
  };

  return (
    <div className="box table-container">
      {!visibleProducts.length ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableRowItems.map(item => (
                <th key={item}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {item}
                    <a href="#/">
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                      <span
                        className="icon"
                        onClick={() => setSelectedItem(item)}
                      >
                        <i data-cy="SortIcon" className={arrowIcons.default} />
                      </span>
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
