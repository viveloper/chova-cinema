import React from 'react';
import classes from './Casting.module.css';

const Casting = ({ items }) => {
  return (
    <div className={classes['casting-container']}>
      <h4 className={classes['title']}>감독 및 배우</h4>
      <ul className={classes['casting']}>
        {items.map((item) => (
          <li key={item.StaffImage} className={classes['staff']}>
            <img
              src={item.StaffImage}
              alt="Staff"
              width="90"
              height="90"
              className={classes['staff-image']}
            />
            <div className={classes['staff-info']}>
              <a href="##" className={classes['name']}>
                {item.StaffName}
              </a>
              <p className={classes['role']}>{item.Role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Casting;
