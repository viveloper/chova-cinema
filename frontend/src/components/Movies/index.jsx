import React from 'react';

import Carousel from '../Carousel';
import SectionTop5Movies from './SectionTop5Movies';
import Top5Movies from './Top5Movies';
import ExhibitionList from './ExhibitionList';
import Exhibition from './Exhibition';

const Movies = ({
  carouselItems,
  top5CurrentMovies,
  top5PreMovies,
  arteMovies,
  operaMovies,
}) => {
  return (
    <>
      <Carousel height={420} items={carouselItems} />

      <SectionTop5Movies>
        <Top5Movies
          title="현재 상영작"
          movies={top5CurrentMovies}
          type="current"
        />
        <Top5Movies title="상영 예정작" movies={top5PreMovies} type="pre" />
      </SectionTop5Movies>

      <ExhibitionList>
        <Exhibition
          type="arte"
          title="아트&컬쳐"
          subTitle="감성을 적시는"
          linkName="아르떼 바로가기"
          movies={arteMovies}
        />
        <Exhibition
          type="opera"
          title="해외명작"
          subTitle="스크린에서 보는"
          linkName="오페라 바로가기"
          movies={operaMovies}
        />
        <Exhibition type="festival" title="인생영화" subTitle="초바시네마의" />
      </ExhibitionList>
    </>
  );
};

export default React.memo(Movies);
