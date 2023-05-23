import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Details = () => {
  const { id } = useParams();
  const { data: item, error, isPending } = useFetch('http://localhost:8000/delist/' + id);
  const history = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:8000/delist/' + id, {
      method: 'DELETE'})
      .then(() => {
        history('/');
    })
  }
  return ( 
    <div className="item-details">

      {/* <h2>item-Details -{id} </h2> */}
      { error && <div> ddderror</div>} 
      { isPending && <div>Loadig ... </div>} 
      {item  && ( 
      <article>
        <h2>{item[0].foodName}</h2>
        <p>가게이름:{item[0].spaceName}</p>
          <p>별점:{item[0].stars}</p>
          <p>가격:{item[0].price}원</p>
          <p>작성자:{item[0].userID}</p>
          <p>등록일:{item[0].regdate}</p>
        <button onClick={handleClick}>Delete</button>
      </article>)}
    </div>
   );
}
export default Details;