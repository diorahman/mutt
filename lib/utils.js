/* eslint-disable one-var */
import AWS from 'aws-sdk';
import { file } from 'tmp';
import { parse } from 'path';
import request from 'request';
import Promise from 'bluebird';
import { exec } from 'child_process';
import { createWriteStream } from 'fs';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.env.AWS_SQS_REGION || 'ap-southeast-1'
});

const execute = (args, file = 'mutt') => {
    return new Promise((resolve, reject) => {
        args.unshift(file);
        exec(args.join(' '), (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            return resolve({
                stdout,
                stderr
            });
        });
    });
};

const tmp = (options = {}) => {
    return new Promise((resolve, reject) => {
        file(options, (error, path, fd, cleanup) => {
            if (error) {
                return reject(error);
            }
            resolve({
                path,
                fd,
                cleanup
            });
        });
    });
};

const tmpFromPath = async (path, extension) => {
    const { name, ext } = parse(path);
    return tmp({
        keep: true,
        prefix: `${name}___`,
        postfix: extension || ext
    });
};

const downloadFileFromLink = async (link, destination) => {
    return new Promise((resolve, reject) => {
        const stream = createWriteStream(destination);
        request(link)
            .on('response', (response) => {
                const { statusCode } = response;
                if (statusCode !== 200) {
                    return reject(new Error(statusCode));
                }
            })
            .pipe(stream);
        stream.on('finish', () => {
            resolve(destination);
        });
        stream.on('error', reject);
    });
};

const downloadFileFromS3 = async (Key, Bucket, destination) => {
    const link = s3.getSignedUrl('getObject', { Key, Bucket });
    return downloadFileFromLink(link, destination);
};

const download = async ({ link, key, bucket, ext }) => {
    const { path, cleanup } = await tmpFromPath(link || key, ext);
    if (link) {
        await downloadFileFromLink(link, path);
    } else if (key && bucket) {
        await downloadFileFromS3(key, bucket, path);
    } else {
        return null;
    }
    return { path, cleanup };
};

export { execute, tmp, download };
