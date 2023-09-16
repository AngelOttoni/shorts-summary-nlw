import ytdl from "ytdl-core";
import fs from "fs"; //file system

export const download = (videoId) => {
  const videoURL = "http://www.youtube.com/shorts/" + videoId
  console.log("Downloading...", videoId);

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info",
      (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;
        console.log(seconds)

        if (seconds > 60) {
          throw new Error("The duration of this video is longer than 60 seconds!")
        }
      }
    ).on("end",
      (info) => {
        console.log("Download of the finished video.")
      }).on("error", (error) => {
        console.log("It was not possible to download the video. More details:", error)
      }).pipe(fs.createWriteStream("./tmp/audio.mp4"));
}