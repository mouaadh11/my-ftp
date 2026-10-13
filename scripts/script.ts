import { error, log } from "console";
import SftpClient from "ssh2-sftp-client";
const sftp = new SftpClient();
const host = process.env.SSH_HOST;
const port = Number(process.env.SSH_PORT);
const username = process.env.SSH_USER;
const password = process.env.SSH_PASSWORD;

const conn = {
  host,
  port,
  username,
  password,
};

async function main(){
    console.log(host, port, username, password);
    try{
        await sftp.connect(conn);
        const path = await sftp.cwd() + "/web/mouaadh-sh.com.es/public_html"
        console.log(path);
        const list = await sftp.list(path)
        list.map((element)=>{ if (!element.name.startsWith(".")) {
            
            console.log(element.name, '-', element.type)
        }
        })
        await sftp.get(path+'/index.html', './index.html')
    }
    catch(err){
        console.log('Error', err);
        
    }finally{
        sftp.end()
    }

}
main()