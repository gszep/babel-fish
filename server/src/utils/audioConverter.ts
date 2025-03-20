import { Readable } from 'stream';
import { Transform } from 'stream';
import ffmpeg from 'fluent-ffmpeg';

export const convertAudioToWav = (audioStream: Readable): Readable => {
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk);
            callback();
        }
    });

    const ffmpegStream = ffmpeg(audioStream)
        .toFormat('wav')
        .on('error', (err) => {
            console.error('Error converting audio:', err);
        });

    ffmpegStream.pipe(transformStream);

    return transformStream;
};