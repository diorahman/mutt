/* eslint-disable one-var */
/** @module Mutt*/
import { execute, download, tmp } from './utils';
import Promise from 'bluebird';
import { writeFile } from 'fs';

const writeFileAsync = Promise.promisify(writeFile);

/** Class representing Mutt */
export default class Mutt {
    /**
     * Constructs Mutt
     *
     * @param {String} name - The name.
     */
    constructor({ from, to = [], cc = [], bcc = [], subject = '', content = '', contentType = 'text/plain', attachments = [] } = []) {
        // FIXME: validation
        this.from = from;
        this.to = Array.isArray(to) ? to : [ to ];
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.content = content;
        this.contentType = contentType;
        this.attachments = Array.isArray(attachments) ? attachments : [ attachments ];
    }

    /**
     * Sends the email.
     *
     */
    async send(keep = true) {
        const args = [];
        if (this.from) {
            args.push('-e');
            args.push(`my_hdr From: ${this.from}`);
        }

        args.push('-e');
        args.push(`set content_type=${this.contentType}`);

        args.push('-s');
        args.push(`"${this.subject}"`);

        for (let to of this.to) {
            args.push(to);
        }

        for (let cc of this.cc) {
            args.push('-c');
            args.push(cc);
        }

        for (let bcc of this.bcc) {
            args.push('-b');
            args.push(bcc);
        }

        if (this.attachments.length > 0) {
            args.push('-a');

            const downloaded = await Promise.map(this.attachments, (attachment) => {
                return download(attachment);
            });

            this.attachments = [];
            this.cleanups = [];
            for (let file of downloaded) {
                this.attachments.push(file.path);
                this.cleanups.push(file.cleanup);
            }

            for (let attachment of this.attachments) {
                args.push(attachment);
            }

            args.push('--');
        }

        const tmpFile = await tmp({ keep }),
            { path } = tmpFile;

        await writeFileAsync(path, this.body);
        args.push('<');
        args.push(path);
        const result = await execute(args);

        if (!keep) {
            for (let cleanup of this.cleanups) {
                cleanup();
            }
        }

        result.args = args;
        return result;
    }
}
