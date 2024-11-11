/**
 * ▶ startscript.js
 *
 * Windows 환경에서 PM2로 Next.js 서버 실행
 * ① pm2 설치 : npm install pm2 -g
 * ② pm2 실행 : pm2 start startscript.js --name "mindmood"
 */
import { exec } from "child_process";

exec("npx next start", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});