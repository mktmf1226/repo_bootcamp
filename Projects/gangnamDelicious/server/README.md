Node.js를 이용한 백엔드단

- mysql2를 이용하여 db가 연결된 상태
- 라우터를 이용하여 client과 데이터 교환이 가능한 상태
- select문 insert문 정상 작동

----------------------------------------------------------
현재 생성된 delist 테이블<br/>
![image](https://github.com/mktmf1226/repo_bootcamp/assets/110094602/c130b4fc-a9a7-4830-a312-a437227eeab1)

sql문
- create database gangnam_db;
- use gangnam_db;
- create table delist(
	num INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 순번(PK)
	userID CHAR(12) NOT NULL, -- 아이디(FK) 
	foodName CHAR(20) NOT NULL, -- 물품 
	spaceName CHAR(50), -- 가게이름
	price INT NOT NULL, -- 단가
    stars SMALLINT NOT NULL, -- 좋아요(1~5)
	regdate datetime default now() -- 수량, smallint 자료형은 2bytes
);

- drop table delist;

- INSERT INTO delist(userID, foodName, spaceName, price, stars, regdate) VALUES ("userTEST", "혜자도시락", "GS25", 5000, 5, "2008-8-8"); 
- INSERT INTO delist(userID, foodName, spaceName, price, stars, regdate) VALUES ("userTEST", "치즈떡볶이", "신전떡볶이", 15000, 4, "2009-9-9"); 
- select * from delist;
