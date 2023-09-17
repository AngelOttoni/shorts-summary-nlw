import { pipeline } from '@xenova/transformers'
import { transcriptionExample } from './utils/transcription.js'

export async function transcribe(audio) {
  try {
    //return transcriptionExample

    console.log("Transcribing the video...")
    const transcribe = await pipeline(
      'automatic-speech-recognition',
      'Xenova/whisper-small')

    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    })

    console.log("Transcription completed successfully...!")
    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    console.log("Transcription failed", error)
    throw new Error(error)
  }
}