import React, { useState } from 'react';
import axios from 'axios';

interface ImageReviewProps {
  images: string[];
  onFinish: () => void;
}

const ImageReview: React.FC<ImageReviewProps> = ({ images, onFinish }) => {
  const [index, setIndex] = useState(0);

  const handleLike = async () => {
    try {
      await axios.post('/api/like', { image: images[index] });
      nextImage();
    } catch (error) {
      console.error('Error liking image', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post('/api/dislike', { image: images[index] });
      nextImage();
    } catch (error) {
      console.error('Error disliking image', error);
    }
  };

  const nextImage = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div>
      {images.length > 0 && (
        <div>
          <img src={images[index]} alt={`Image ${index + 1}`} />
          <div>
            <button onClick={handleLike}>Лайк</button>
            <button onClick={handleDislike}>Дизлайк</button>
          </div>
        </div>
      )}
      <button onClick={onFinish}>Закончить просмотр</button>
    </div>
  );
};

export default ImageReview;