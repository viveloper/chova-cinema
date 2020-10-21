import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MovieDetail from '../components/MovieDetail';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovieDetail,
  getMovieReview,
  addMovieReview,
  deleteMovieReview,
  editMovieReview,
} from '../modules/movie';
import { useHistory } from 'react-router-dom';

const ONE_PAGE_REVIEW_NUM = 10;

const MovieDetailContainer = ({ movieCode }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [reviewPageOffset, setReviewPageOffset] = useState(1);
  const [sortType, setSortType] = useState('recent');
  const [reviewMode, setReviewMode] = useState('add');
  const [targetReview, setTargetReview] = useState(null);

  const {
    loading: movieDetailLoading,
    data: movieDetail,
    error: movieDetailError,
  } = useSelector((state) => state.movie.movieDetail);

  const {
    loading: movieReviewLoading,
    data: movieReview,
    error: movieReviewError,
  } = useSelector((state) => state.movie.movieReview);

  const loginData = useSelector((state) => state.login.data);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMovieDetail(movieCode));
  }, [dispatch, movieCode]);

  useEffect(() => {
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: 10,
        sortType,
      })
    );
  }, [dispatch, movieCode, sortType]);

  const carouselItems = useMemo(
    () =>
      movieDetail
        ? movieDetail.Trailer.Items.filter(
            (trailer) => trailer.ImageDivisionCode === '1'
          ).map((trailer) => ({
            img: trailer.ImageURL,
          }))
        : null,
    [movieDetail]
  );

  const totalReviewCount = useMemo(
    () => (movieReview ? movieReview.ReviewCounts.TotalReviewCount : 0),
    [movieReview]
  );
  const reviewScore = useMemo(
    () => (movieReview ? movieReview.ReviewCounts.MarkAvg : 0),
    [movieReview]
  );
  const reviewList = useMemo(
    () => (movieReview ? movieReview.TotalReviewItems.Items : null),
    [movieReview]
  );

  const likedReviewList = useMemo(
    () =>
      loginData ? (loginData.user ? loginData.user.reviewLikeList : []) : [],
    [loginData]
  );

  const handleTicketingClick = useCallback(() => {
    history.push('/ticketing');
  }, [history]);

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const handleReviewSortClick = useCallback((type) => {
    setSortType(type);
    setReviewPageOffset(1);
  }, []);

  const handleReivewMoreClick = useCallback(() => {
    dispatch(
      getMovieReview({
        movieCode,
        page: 1,
        count: (reviewPageOffset + 1) * ONE_PAGE_REVIEW_NUM,
        sortType,
      })
    );
    setReviewPageOffset(reviewPageOffset + 1);
  }, [dispatch, movieCode, reviewPageOffset, sortType]);

  const handleReviewSubmit = useCallback(
    async ({ reviewText, evaluation }) => {
      if (!loginData) {
        history.push('/login');
        return;
      }
      if (!reviewText) return;

      if (reviewMode === 'add') {
        dispatch(addMovieReview({ movieCode, reviewText, evaluation }));
      } else {
        await dispatch(
          editMovieReview({
            movieCode,
            reviewId: targetReview.ReviewID,
            reviewText,
            evaluation,
          })
        );
        setReviewMode('add');
        setTargetReview(null);
      }
    },
    [movieCode, history, loginData, reviewMode, targetReview, dispatch]
  );

  const handleReveiwDelete = useCallback(
    (reviewId) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(deleteMovieReview({ movieCode, reviewId }));
      }
    },
    [movieCode, dispatch]
  );

  const handleReviewEdit = useCallback(
    (reviewId) => {
      setReviewMode('edit');
      setTargetReview(reviewList.find((item) => item.ReviewID === reviewId));
    },
    [reviewList]
  );

  const handleReviewRecommendClick = useCallback(
    (reviewId) => {
      if (!loginData) {
        history.push('/login');
        return;
      }
      dispatch(
        editMovieReview({
          movieCode,
          reviewId,
          recommend: true,
        })
      );
    },
    [dispatch, history, loginData, movieCode]
  );

  if (movieDetailLoading || (movieReviewLoading && !movieReview))
    return <div>loading...</div>;
  if (movieDetailError) return <div>error!</div>;
  if (!movieDetail || !movieReview) return null;

  return (
    <MovieDetail
      carouselItems={carouselItems}
      movieDetail={movieDetail}
      activeTab={activeTab}
      reviewList={reviewList}
      likedReviewList={likedReviewList}
      totalReviewCount={totalReviewCount}
      reviewScore={reviewScore}
      reviewSortType={sortType}
      movieReviewError={movieReviewError}
      reviewMode={reviewMode}
      targetReview={targetReview}
      onTicketingClick={handleTicketingClick}
      onTabClick={handleTabClick}
      onReviewSortClick={handleReviewSortClick}
      onReviewMoreClick={handleReivewMoreClick}
      onReviewSubmit={handleReviewSubmit}
      onReviewDelete={handleReveiwDelete}
      onReviewEdit={handleReviewEdit}
      onReviewRecommendClick={handleReviewRecommendClick}
    />
  );
};

export default MovieDetailContainer;
