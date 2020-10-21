import React from 'react';
import classes from './TypeMenu.module.css';

const TypeMenu = ({ sortType, viewType, onSortTypeClick, onViewTypeClick }) => {
  return (
    <div className={classes['type-menu']}>
      <select
        className={classes['select-sort-type']}
        value={sortType}
        onChange={(e) => onSortTypeClick(e.target.value)}
      >
        <option value="A">예매순</option>
        <option value="B">관객순</option>
        <option value="C">평점순</option>
        <option value="D">예정작</option>
      </select>
      <div className={classes['view-type']}>
        <button
          className={`${classes['btn-view-type']} ${
            viewType === 'text' ? classes['active'] : ''
          }`}
          onClick={() => onViewTypeClick('text')}
        >
          <span className={classes['icon']}>
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <button
          className={`${classes['btn-view-type']} ${
            viewType === 'thumbnail' ? classes['active'] : ''
          }`}
          onClick={() => onViewTypeClick('thumbnail')}
        >
          <span className={classes['icon']}>
            <i className="fas fa-th-large"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TypeMenu;
