import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url:`mongodb://${username}:${password}@ac-uulrxll-shard-00-00.c06jgpy.mongodb.net:27017,ac-uulrxll-shard-00-01.c06jgpy.mongodb.net:27017,ac-uulrxll-shard-00-02.c06jgpy.mongodb.net:27017/?ssl=true&replicaSet=atlas-11nnmg-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-EVENT-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-EVENT-${file.originalname}`
        }
    }
});

export default multer({storage}); 