import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  //store our from and to languages
  const [from, setForm] = useState("en");
  const [to, setTo] = useState("es");

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState({});


  //unsplash data
  const [imageURL, setImageURL] = useState('');

   // Handle translation form submit
   async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    try {
      const res = await axios.get(API);
      setTranslation(res.data);
      setImageURL(res.data.image);
      console.log(res.data);
    } catch (error) {
      console.error('Error translating:', error);
    }
  }


  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="container">
          <select onChange={(event) => setForm(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          <input placeholder="Translate" onChange={(event) => setWord(event.target.value)}/>
        </div>

        <div className="container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          <div className='output'>
            {translation.translation}
        </div>
        </div>
        <button>Submit</button>
      </form>
      
        <div>
          <h2>Image:</h2>
          <img src={imageURL} alt="Image" />
        </div>
    
      </>
  )
}

export default App
