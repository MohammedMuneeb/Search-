import React ,{useState ,useEffect }from 'react'; 
import axios from 'axios'; 

import ReactPlayer from "react-player";
import Plyr from "plyr"; 
const Search =()=>{ 
  const [query ,setQuery ]=useState (''); 
  const [videos ,setVideos ]=useState ([]); 
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }; 
  const handleSubmit = async (event) => {
    event .preventDefault (); 
    try { 
      const response =await axios.get (`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q :query, 
          key: process.env.REACT_APP_YOUTUBE_API_KEY , 
        }, 
      }); 
      setVideos (response.data.items ); 
    }catch (error ){ 
      console.error('Error fetching data:', error ); 
      // Handle errors appropriately (e.g., display an error message)
    } 
  }; 
  return ( 
    <div > 
      <form onSubmit ={handleSubmit }> 
        <input 
          type="text" 
          value={query} 
          onChange={handleInputChange} 
          placeholder="Search YouTube" 
        /> 
        <button type ="submit">Search </button > 
      </form > 
      <ul > 
        {videos.map ((video )=>( 
          <li key={video.id.videoId }> 
          <ReactPlayer src ={`https://www.youtube.com/watch?v=${video.id.videoId }`}/> 
          <video 
        src ={`https://www.youtube.com/watch?v=${video.id.videoId }`} 
        poster ={`https://www.youtube.com/watch?v=${video.id.videoId }`} 
      /> 
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              {video.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ); 
}; 
export default Search ; 