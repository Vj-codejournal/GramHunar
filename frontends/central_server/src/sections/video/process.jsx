// src/components/CSR.js

import React, { useState, useEffect } from "react";
import styles from "./process.module.css"; // Import the CSS module

const steps = [
  "Video requested to JS server",
  "Communicating with servers",
  "Video to audio conversion",
  "Audio received at server",
  "Transcripting audio",
  "Decoding transcript",
  "Summary done!",
];

const icons = [
  "📤", // CloudUploadIcon
  "🌐", // HttpIcon
  "🔄", // TransformIcon
  "🎵", // AudiotrackIcon
  "🎤", // MicIcon
  "🔤", // TextFieldsIcon
  "✅", // DoneIcon
];

export default function CSR(props) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(props.temprature);
  }, [props.temprature]);

  return (
    <div className={styles.stack} style={{ width: "96vw" }}>
      <div className={styles.stepper}>
        {steps.map((label, index) => (
          <div key={label} className={styles.step}>
            <div
              className={`${styles.stepIcon} ${
                index <= activeStep ? styles.active : ""
              }`}
            >
              {icons[index]}
            </div>
            <div className={styles.stepLabel}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
