import { config } from "dotenv/types";
import express from "express";
import multer from "multer";
import mluterS3 from  "multer-s3";
import aws from "../config";

const storage = mluter.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads');
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    },
});

const uplaod = multer({storage});
const router = express.Router();

router.post("/", uplaod.single('image'), (req, res) =>{
    res.send(`/${req.file.path}`);
})

aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
});

const s3 = new aws.S3();
const storageS3 = mluterS3({
    s3,
    bucket: 'amazona-bucket'
})