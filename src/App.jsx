import React, { useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faSpinner} from "@fortawesome/free-solid-svg-icons"
import { faShareSquare, faHeart } from "@fortawesome/free-regular-svg-icons"

const App = () => {
  const [fetchData, setFetchData] = useState([]);
  const [likesActive, setLikesActive] = useState("")
  const [retweetActive, setRetweetActive] = useState("")
  const [shareActive, setShareActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);

  const apikey = import.meta.env.VITE_API_KEY;

  console.log(fetchData);
  console.log(startDate);

  useEffect(() => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=3&api_key=${apikey}`

    const dataFetcher = async() => {
      try {
        const result = await axios.get(url);
        setFetchData(result.data.photos);
        setLoading(false);
      }catch(error){
        console.log(error)
      }
      
    }

    dataFetcher();
  }, [])

  // const handleOnClick = () => {
  //   setLikes(!likes)
  // }

  return (
    <div className="container:md p-6 bg-gray-200">
      <h2 className="font-bold text-3xl">Spacetagram</h2>
      <p className="mt-3 sm:text-l">Brought to you by NASA's Image API</p>
      <div className="mt-4">
        select date of image 
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date.toLocaleDateString())} isClearable placeholderText="select date" className="p-2 rounded" forma/>
      </div>
      <div className="flex gap-8 align-center flex-wrap justify-center mt-6">
      {(loading) && (
        <div className="mt-2">
          <p>loading, kindly check your internet connection</p>
          <FontAwesomeIcon icon={faSpinner} className="text-2xl"/>
        </div>
      )}
      {
        fetchData.map((photo) => (
          <div key={photo.id} className="flex flex-col w-64 gap-4 bg-white border-2">
            <img src={photo.img_src} alt="nasa imagery" className="w-full h-full" />
            <div className="py-2 px-4 flex flex-col gap-2">
              <h5 className="font-bold capitalize"> Image Description</h5>
              <p className=""><span className="font-bold capitalize">camera name:</span> {photo.camera.name}</p>
              <p><span className="font-bold capitalize">image date:</span> {photo.earth_date}</p>
              <p><span className="font-bold capitalize">satelite rover:</span> {photo.rover.name}</p>
              
              <div className="p-4 flex justify-between items-center ">
                <FontAwesomeIcon icon={faHeart} className="text-2xl cursor-pointer" onClick={() => setLikesActive(photo.id)} style={{color: likesActive === photo.id ? "red" : "black"}}/>
                <FontAwesomeIcon icon={faRetweet} className="text-2xl cursor-pointer"  onClick={() => setRetweetActive(photo.id)} style={{color: retweetActive === photo.id ? "blue" : "black"}}/>
                <FontAwesomeIcon icon={faShareSquare}  className="text-2xl cursor-pointer"  onClick={() => setShareActive(photo.id)} style={{color: shareActive === photo.id ? "purple" : "black"}}/>
              </div>
            </div>
          </div>
        ))
      }
          
      </div>
     
    </div>
  )
}

export default App