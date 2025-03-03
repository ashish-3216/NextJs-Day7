"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageGallery() {
  const [image, setImage] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.slingacademy.com/v1/sample-data/photos/1"
        );
        const data = await response.json();
        setImage(data.photo.url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex justify-center p-4">
      {image && (
        <Image
          src={image}
          width={600}
          height={400}
          alt="Random Image"
          className="rounded-lg shadow-lg"
        />
      )}
    </div>
  );
}
