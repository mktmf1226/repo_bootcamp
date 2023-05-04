// const express = require('express');
// const path = require('path'); 

// const router = express.Router();

// // 1. [file] 파일 업로드를 처리하기 위해 선언 
// const multer = require('multer'); 

// // 3. [file] 업로드할 파일과 경로 설정 
// const upload = multer({ // multer객체를 생성한다
//     storage: multer.diskStorage({ // diskStorage메서드를 사용해서
//         destination(req, file, done) { // 파일이 저장될 경로와 
//             done(null, 'uploads/');
//         },
//         filename(req, file, done) { //파일명을 설정
//             const ext = path.extname(file.originalname);
//             done(null, path.basename(file.originalname, ext) + Date.now() + ext); //업로드된 원래 파일명+현재시각
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 }, //5MB이하의 파일크기제한
// });

// // GET /upload 라우터
// router.get('/', (req, res) => {
//     //res.send("test")
//     //console.log(path.join(__dirname, 'multipart.html'))
//     res.sendFile(path.join(__dirname, 'multipart.html'));
// });

// // POST /upload 라우터
// router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
//     console.log(req.file);
//     res.send('ok');
// });

// module.exports = router;