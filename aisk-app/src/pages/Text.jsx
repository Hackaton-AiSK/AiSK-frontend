import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioDataArrayRef = useRef(null);
  const silenceStartRef = useRef(null);
  const [transcript, setTranscript] = useState('');

  

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    return () => {
      stopRecording();
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      // Set up the audio context and analyser for silence detection
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      audioDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      silenceStartRef.current = null;

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // TODO: send post request to send post audioBlob to fastapi server that expects UploadFile
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');


        // Post request to FastAPI server
        axios.post('https://223.130.155.79:8001/transcribe_and_ask_to_powerful_llm', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response.data);
        });

        }


      mediaRecorderRef.current.start();
      monitorAudio(); // Start monitoring for silence
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
      audioDataArrayRef.current = null;
      silenceStartRef.current = null;
    }
  };

  const monitorAudio = () => {
    if (!analyserRef.current) return;

    analyserRef.current.getByteFrequencyData(audioDataArrayRef.current);

    const averageVolume = audioDataArrayRef.current.reduce((sum, value) => sum + value, 0) / audioDataArrayRef.current.length;
    if (averageVolume < 50) { // Silence threshold
      if (!silenceStartRef.current) {
        silenceStartRef.current = Date.now();
      } else if (Date.now() - silenceStartRef.current > 2000) { // 2 seconds of silence
        setIsRecording(false); // Stop recording
      }
    } else {
      silenceStartRef.current = null;
    }

    requestAnimationFrame(monitorAudio);
  };

  return (
    <div>
      <button onClick={() => setIsRecording(true)}>Start Recording</button>
      <button onClick={() => setIsRecording(false)}>Stop Recording</button>
      {isRecording ? <p>Recording...</p> : <p>Not Recording</p>}
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
          <a href={audioURL} download="audio.wav">Download Recording</a>
        </div>
      )}
      <p>{transcript}</p>
    </div>
  );
}

export default AudioRecorder;
