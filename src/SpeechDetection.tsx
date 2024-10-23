import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechDetection = ({ onDetect }: { onDetect: (transcript: string) => void }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      console.log("Detected speech:", transcript);
      onDetect(transcript);
    }
  }, [transcript, onDetect]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className="speech-detection">
      <div>
        <p>{listening ? "Listening..." : "Click to start speaking"}</p>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechDetection;
