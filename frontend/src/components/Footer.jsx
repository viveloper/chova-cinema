import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="center">
        <h1 className={classes.logo}>chova cinema</h1>
        <p className={classes.copyright}>
          COPYRIGHT &copy; CHOVA CINEMA ALL RIGHT RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
