import React from 'react';

import Carousel from '../Carousel';
import Summary from './Summary';
import PosterImage from './PosterImage';
import SummaryTitle from './SummaryTitle';
import SummaryStatistics from './SummaryStatistics';
import SummaryDetail from './SummaryDetail';
import SummarySpecialScreen from './SummarySpecialScreen';
import SummaryAsideMenu from './SummaryAsideMenu';
import DetailInfo from './DetailInfo';
import Tabs from './Tabs';
import MovieInfo from './MovieInfo';
import Articles from './Articles';
import Synopsis from './Synopsis';
import Preference from './Preference';
import GenderPrefer from './GenderPrefer';
import AgePrefer from './AgePrefer';
import Trailer from './Trailer.jsx';
import Poster from './Poster.jsx';
import Casting from './Casting';
import ScoreAndReview from './ScoreAndReview';
import ScoreBox from './ScoreBox';
import ReviewBox from './ReviewBox';
import ReviewList from './ReviewList';

const MovieDetail = ({
  carouselItems,
  movieDetail,
  activeTab,
  totalReviewCount,
  reviewScore,
  reviewList,
  likedReviewList,
  reviewSortType,
  movieReviewError,
  reviewMode,
  targetReview,
  onTicketingClick,
  onTabClick,
  onReviewSortClick,
  onReviewMoreClick,
  onReviewSubmit,
  onReviewDelete,
  onReviewEdit,
  onReviewRecommendClick,
}) => {
  return (
    <>
      <Carousel height={560} width={840} items={carouselItems} />
      <Summary>
        <PosterImage
          posterUrl={movieDetail.Movie.PosterURL}
          width={205}
          height={293}
        />
        <SummaryTitle
          viewGradeCode={movieDetail.Movie.ViewGradeCode}
          movieName={movieDetail.Movie.MovieNameKR}
        />
        <SummaryStatistics
          viewEvaludation={movieDetail.Movie.ViewEvaluation}
          bookingRate={movieDetail.Movie.BookingRate}
          cumulativeAudience={movieDetail.Movie.KOFCustCnt}
        />
        <SummaryDetail movieDetail={movieDetail} />
        <SummarySpecialScreen
          specialScreenDivisionCode={
            movieDetail.Movie.SpecialScreenDivisionCode
          }
        />
        <SummaryAsideMenu
          likeCount={movieDetail.Movie.LikeCount}
          onTicketingClick={onTicketingClick}
        />
      </Summary>

      <DetailInfo>
        <Tabs
          activeTab={activeTab}
          reviewCount={totalReviewCount}
          onTabClick={onTabClick}
        />
        {activeTab === 'info' ? (
          <MovieInfo>
            <Articles>
              <Synopsis synopsisHtml={movieDetail.Movie.SynopsisKR} />
              <Preference>
                <GenderPrefer
                  manPrefer={movieDetail.Movie.ManPrefer}
                  womanPrefer={movieDetail.Movie.WomanPrefer}
                />
                <AgePrefer
                  agePrefer10={movieDetail.Movie.AgePrefer10}
                  agePrefer20={movieDetail.Movie.AgePrefer20}
                  agePrefer30={movieDetail.Movie.AgePrefer30}
                  agePrefer40={movieDetail.Movie.AgePrefer40}
                />
              </Preference>
            </Articles>
            <Trailer items={movieDetail.Trailer.Items} />
            <Poster items={movieDetail.Trailer.Items} />
            <Casting items={movieDetail.Casting.Items} />
          </MovieInfo>
        ) : (
          <ScoreAndReview>
            <ScoreBox score={reviewScore} />
            <ReviewBox
              reviewMode={reviewMode}
              targetReview={targetReview}
              onReviewSubmit={onReviewSubmit}
            />
            <ReviewList
              reviewList={reviewList}
              likedReviewList={likedReviewList}
              totalCount={totalReviewCount}
              sortType={reviewSortType}
              movieReviewError={movieReviewError}
              onSortClick={onReviewSortClick}
              onMoreClick={onReviewMoreClick}
              onDelete={onReviewDelete}
              onEdit={onReviewEdit}
              onReviewRecommendClick={onReviewRecommendClick}
            />
          </ScoreAndReview>
        )}
      </DetailInfo>
    </>
  );
};

export default React.memo(MovieDetail);
