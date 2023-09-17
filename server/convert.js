import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = './tmp/audio.mp4';
const outputPath = filePath.replace('.mp4', '.wav');

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Converting the video...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        //Float32Array is the format that the AI can handle
        const floatArray = new Float32Array(audioData)

        console.log("The video has been converted successfully!")
        
        resolve(floatArray)
        fs.unlinkSync(outputPath)

      }).on("error", (error) => {
        console.log("Error converting video.", error);
        reject(error);
      }).save(outputPath)
  });