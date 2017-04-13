import fs from 'fs-extra';
import { current } from './config';
import { isOkaFilename } from './utils';

export const listVideos = () => current()
  .then((config) => new Promise((resolve, reject) => {
    fs.readdir(config.videosPath, (err, files) => {
      if (err) return reject(err);
      return resolve(files
        .filter(isOkaFilename)
        .map(filename => {
          const filePath = `${config.videosPath}/${filename}`;
          return fs.readJsonSync(filePath);
        }));
    });
  }));
