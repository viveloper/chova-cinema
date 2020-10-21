import React from 'react';
import styled from 'styled-components';

import SectionCinema from './SectionCinema';
import SectionTitle from '../SectionTitle';
import DivisionTabs from './DivisionTabs';
import Divisions from './Divisions';
import DivisionList from './DivisionList';
import CinemaList from './CinemaList';
import SectionMovie from './SectionMovie';
import TypeMenu from './TypeMenu';
import MovieList from './MovieList';
import SectionTime from './SectionTime';
import Calendar from './Calendar';
import FilteringTabs from './FilteringTabs';
import ResultView from './ResultView';

const StepBlock = styled.div`
  width: 1200px;
  display: flex;
`;

const Step01 = ({
  divisionTab,
  divisions,
  detailDivisionCode,
  cinemas,
  cinemaId,
  movieListSortType,
  movieListViewType,
  movies,
  selectedMovieCode,
  selectedDate,
  playDates,
  filteringTab,
  playMovieListState,
  onDivisionTabClick,
  onDivisionClick,
  onCinemaClick,
  onMovieListSortTypeClick,
  onMovieListViewTypeClick,
  onMovieClick,
  onDateClick,
  onFilteringTabClick,
  onTimeClick,
}) => {
  return (
    <StepBlock>
      <SectionCinema>
        <SectionTitle title="영화관" />
        <DivisionTabs tab={divisionTab} onClick={onDivisionTabClick} />
        <Divisions>
          <DivisionList
            divisions={divisions}
            tab={divisionTab}
            detailDivisionCode={detailDivisionCode}
            onDivisionClick={onDivisionClick}
          />
          <CinemaList
            cinemas={cinemas}
            cinemaId={cinemaId}
            onCinemaClick={onCinemaClick}
          />
        </Divisions>
      </SectionCinema>
      <SectionMovie>
        <SectionTitle title="영화 선택" />
        <TypeMenu
          sortType={movieListSortType}
          viewType={movieListViewType}
          onSortTypeClick={onMovieListSortTypeClick}
          onViewTypeClick={onMovieListViewTypeClick}
        />
        <MovieList
          movies={movies}
          sortType={movieListSortType}
          viewType={movieListViewType}
          selectedMovieCode={selectedMovieCode}
          onMovieClick={onMovieClick}
        />
      </SectionMovie>
      <SectionTime>
        <SectionTitle title={selectedDate} />
        <Calendar playDates={playDates} onDateClick={onDateClick} />
        <FilteringTabs tab={filteringTab} onClick={onFilteringTabClick} />
        {playMovieListState.loading ? (
          <div>loading...</div>
        ) : playMovieListState.error ? (
          <div>error!</div>
        ) : (
          <ResultView
            playMovieList={playMovieListState.data}
            onTimeClick={onTimeClick}
          />
        )}
      </SectionTime>
    </StepBlock>
  );
};

export default Step01;
