import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

// .env
const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
    const [photoData, setPhotoData] = useState(null);

    // Grab the pic from the API
        useEffect(() => {
        fetchPhoto();
    
        async function fetchPhoto() {
          const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
          );
           const data = await res.json();
           // Setting my state 
           setPhotoData(data);
           // console.log(data);
         }
      }, []);

      if (!photoData) return <div />;

 return (
     <>
     <NavBar />
    <div className="nasa-photo">
       {photoData.media_type === "image" ? (
        <img
          src={photoData.url}
          alt={photoData.title}
          className="photo"
        />
       ) : (
         // if API returns a video
        <div className="nasa-vid">
        <iframe
          title="space-video"
          src={photoData.url}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
          className="photo"
          width="750"
          height="500"
        />
        </div>
      )}
      <div>
        <h1>{photoData.title}</h1>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
      </div>
     </div>
     <Footer />
     </>
   );
  }

  

