"use client";

import React, { useState, useEffect } from "react";
import ImageReview from "./components/ImageReview/ImageReview";

import axios from "axios";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [sessionActive, setSessionActive] = useState(true);

  useEffect(() => {
    // Загрузка списка изображений с сервера
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images");
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  const handleFinish = () => {
    setSessionActive(false);
  };

  return (
    <div className="App">
      {sessionActive ? (
        <ImageReview images={images} onFinish={handleFinish} />
      ) : (
        <div>Просмотр завершен</div>
      )}
    </div>
  );
}
