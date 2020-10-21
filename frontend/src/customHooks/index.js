import { useState } from 'react';

export const useLayerMovieTrailer = () => {
  const [src, setSrc] = useState('');
  const [isActive, setIsActive] = useState(false);
  const handlePlay = (src) => {
    if (!src) return;
    setSrc(src);
    setIsActive(true);
  };
  const handleClose = () => {
    setIsActive(false);
  };

  return {
    src,
    isActive,
    handlePlay,
    handleClose,
  };
};
