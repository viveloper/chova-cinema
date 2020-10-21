import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = ({ theme, isLogin, onLogout }) => {
  return (
    <header
      className={`${classes.header} ${
        theme === 'light' ? `${classes.light}` : ''
      }`}
    >
      <div className="center">
        <div className={classes.upper}>
          <h1 className={classes.logo}>
            <Link to="/">chova cinema</Link>
          </h1>
          <ul className={`${classes.menu} ${classes.menu1}`}>
            <li>
              <a href="##">
                <span>
                  <i className="fab fa-facebook"></i>
                </span>{' '}
                좋아요
              </a>
            </li>
            <li>
              <a href="##">
                <span>
                  <i className="fab fa-youtube"></i>
                </span>{' '}
                구독하기
              </a>
            </li>
          </ul>
          <ul className={`${classes.menu} ${classes.menu2}`}>
            <li>
              <a href="##">멤버십</a>
            </li>
            <li>
              <a href="##">고객센터</a>
            </li>
            <li>
              {!isLogin ? (
                <Link to="/login">로그인</Link>
              ) : (
                <Link to="/" onClick={onLogout}>
                  로그아웃
                </Link>
              )}
            </li>
          </ul>
        </div>
        <nav className={classes.navigation}>
          <ul className={classes.links}>
            <li>
              <Link to="/ticketing">예매</Link>
            </li>
            <li>
              <Link to="/movies">영화</Link>
            </li>
            <li>
              <a href="##">영화관</a>
            </li>
            <li>
              <a href="##">이벤트</a>
            </li>
            <li>
              <a href="##">스토어</a>
            </li>
            <li>
              <a href="##">VOD</a>
            </li>
          </ul>
          <ul className={`${classes.menu} ${classes.menu3}`}>
            <li>
              {!isLogin ? (
                <Link to="/signin">
                  <span>
                    <i className="fas fa-user"></i>
                  </span>{' '}
                  회원가입
                </Link>
              ) : (
                <Link to="/MyPage">
                  <span>
                    <i className="fas fa-user"></i>
                  </span>{' '}
                  마이페이지
                </Link>
              )}
            </li>
            <li>
              <Link to="/ticketing">
                <span>
                  <i className="fas fa-bookmark"></i>
                </span>{' '}
                바로예매
              </Link>
            </li>
            <li>
              <button className={classes['btn-menu']}>
                <span className={classes.icon}>
                  <i className="fas fa-bars"></i>
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
