import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import { extname, resolve } from 'path';
import { v4 } from 'uuid';

const uploadDir = resolve(__dirname, '..', '..', 'uploads');
if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, v4() + extname(file.originalname)),
});

const multerConfig: multer.Options = {
    storage,
};

export default multerConfig;
