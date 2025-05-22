const DEV_MODE = true; // 배포할 땐 false로 바꾸기

const DEV_API_URL = "http://localhost:8000";  // Django 백엔드 로컬 주소
const PROD_API_URL = "https://your-backend-api.com"; // AWS 등 배포 주소로 수정

export const API_BASE_URL = DEV_MODE ? DEV_API_URL : PROD_API_URL;