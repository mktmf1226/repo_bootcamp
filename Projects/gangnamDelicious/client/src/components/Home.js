import { useEffect, useState } from "react";
import useFectch from "./useFetch";
import DeliciousList from "./DeliciousList";


const Home = () => {
  const {data, isPending, error} = useFectch("http://localhost:8000/");


  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <DeliciousList delist={data} title="맛집 리스트" /> }
    </div>
  );
};

export default Home;
