import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>강남맛집</h1>
      <div className="links">
        <Link to='/'>홈</Link>
        <Link to='/create'>등록하기</Link>
      </div>
    </nav>
  );
};

export default Navbar;
