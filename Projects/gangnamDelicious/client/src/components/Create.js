import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [userID, setUserID] = useState('');
  const [foodName, setFoodName] = useState('');
  const [spaceName, setSpaceName] = useState('')
  const [price, setPrice] = useState('')
  const [stars, setStars] = useState('')
  const [isPending, setPending] = useState(false);
  const history = useNavigate();

  const handleSubmit= (e)=>{  
    e.preventDefault();
    const data = { userID, foodName, spaceName, price, stars};

    fetch("http://localhost:8000/insertdelist",{ 
      method:'POST',
      headers : { 'Content-Type':"application/json"},
      body : JSON.stringify(data)
    }).then( ()=>{
      console.log("Added new data")
      setPending(false);
      history('/')
    })
  }

  return (  
    <div className="create">
      <h2>추천하는 음식 등록</h2>
      <form action="" onSubmit={handleSubmit}>
        <label>등록자 :</label>
        <input type="text" 
          required
          value={userID}
          onChange={ (e)=>{ setUserID(e.target.value)} } />
        <br/>
        <label> 음식명 :</label>
        <textarea  required 
          value={foodName} placeholder='ex)치즈떡볶이'
          onChange={(e)=> { setFoodName(e.target.value)} } >
        </textarea>
        <br/>
        <label> 가게명 :</label>
        <textarea required
          value={spaceName} 
          onChange={(e)=>{setSpaceName(e.target.value)}}>
        </textarea>
        <br/>
        <label> 가격 :</label>
        <input type="number"
          value={price} 
          onChange={(e)=>{setPrice(e.target.value)}}/>
          <br/>
        <label> 별점 :</label>
        <input type="number"
          value={stars} 
          onChange={(e)=>{setStars(e.target.value)}}/>
          <br/>
        <button>등록</button>

        <p>userID : {userID}</p>
        <p>foodName : {foodName}</p>
        <p>spaceName : {spaceName}</p>
        <p>price : {price}</p>
        <p>stars : {stars}</p>
      </form>
    </div>
  );
}
export default Create;