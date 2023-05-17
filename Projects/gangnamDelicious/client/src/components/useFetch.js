import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    //데이터를 불러올 때 어떤 이유로 인해 중지를 원한다면 fetch시키는 것을 중단할 필요가 있다.
    const abortCont = new AbortController();

    setTimeout(() => {
    //   fetch(url, { signal: abortCont.signal })
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // 허용할 도메인
        },
        signal: abortCont.signal
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("데이터를 불러올 수 없습니다");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("불러오기를 중단합니다");
          } else {
            setPending(null);
            setError(err.message);
          }
        });
    }, 1000);
    return () => {
        abortCont.abort();
    }
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
