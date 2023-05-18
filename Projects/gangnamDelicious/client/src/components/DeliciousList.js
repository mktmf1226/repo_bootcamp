import {Link} from 'react-router-dom'

const DeliciousList = ({delist, title}) => {
  // const delist = delist.props;
  // console.log('props --> ', props);
  // console.log('props delist ', delist);

  return (
    <div className="delicious-list">
      <p>{delist.message}</p>
      <h2 className="title">{title}</h2>

      {delist.map((item) => (
        <div className="delicious-preview" key={item.num}>
          <Link to={`/delist/${item.num}`}>
          <h2>{item.foodName}</h2>
          </Link>
          <p>가게이름:{item.spaceName}</p>
          <p>별점:{item.stars}</p>
          <p>가격:{item.price}원</p>
          {/* <p>작성자:{item.userID}</p>
          <p>생성일:{item.regdate}</p> */}
        </div>
      ))}
    </div>
  );
};
export default DeliciousList;
