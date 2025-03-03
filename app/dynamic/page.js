"use client";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
const DynamicComponent = dynamic(() => import("../components/PopUpComponent"), {
  ssr: false,
});

export default function dyno() {
  const [showPopUp, setShowPopUp] = useState(false);
  let btn_text = useRef(null);
  
  
  if (showPopUp) {
    btn_text.current = "close";
  } else {
    btn_text.current = "show";
  }
  
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {showPopUp && <DynamicComponent />}
      <button
        ref={btn_text}
        className="popup-button"
        onClick={() => setShowPopUp(!showPopUp)}
      >
        {btn_text.current}{" "}
      </button>
    </div>
  );
}
