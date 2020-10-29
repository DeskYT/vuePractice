'use strict';
import {PORT} from "./constants";
import path from "path";
import fs from "fs";
import os from "os";
import http from 'http';

console.log("Filename: ", __filename) //Абсолютный путь к файлу
console.log("Basename: ",path.basename(__filename)) //Название файла с расширением
console.log("Dirname: ",path.dirname(__filename)) //Абсолютный путь к директории с файлом
console.log("Extname: ",path.extname(__filename)) //Расширение файла

//Объект с корневой директорией, пути к директории с файлом, название файла с расширением, расширение файла и его имя без расширения
console.log("Parse: ",path.parse(__filename))

console.log("Join: ", path.join(__dirname, 'test', 'second.html')); //Создание пути из частей
console.log("Resolve: ", path.resolve(__dirname, './test', 'second.html')); //Последовательность путей или сегментов путей

const DIR_PATH = path.join(__dirname, '/files')
if(fs.lstatSync(DIR_PATH).isDirectory()) //lstat получает данные о пути, isDirectory - ну тут все понятно ;)
{
    const FILE_PATH = path.join(DIR_PATH, 'test.txt')
    //Запись в файл
    fs.writeFile(FILE_PATH, 'TestMessage',  (err) => {
        if (err) return console.error(err);
    });
    //Чтение из файла
    fs.readFile(FILE_PATH, (err, data) =>{
        if(err) return console.error(err);
        console.log("test2.txt: ", data.toString())
    })
}

console.log(os.cpus()); //Информация о логических ядрах CPU
console.log(os.hostname()); //Выводит имя хоста
console.log(os.freemem()); //Выводит кол-во свободной ОЗУ

const server = http.createServer((req, res) => {
    switch (req.url){
        case '/': {
            res.writeHead(200, {
                'Content-type': 'text/html'
            })
            res.end('<h1>Index page</h1>')
            break;
        }
        case '/users': {
            const users = [{name: "Test", age: 54},{name: "Test2", age: 33}]
            res.writeHead(200, {
                'Content-type': 'text/json'
            })
            res.end(JSON.stringify(users))
            break;
        }
        default: {
            res.writeHead(404, {
                'Content-type': 'text/html'
            })
            res.write("<h1>Error 404. Page not found</h1>")
        }
    }
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});