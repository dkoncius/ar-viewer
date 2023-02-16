import Script from "next/script";
import home from '@/styles/Home.module.css'

import { useEffect, useRef, useState } from "react";

export default function Home() {
  // 3D model
  // Upload
  const [model, setModel] = useState()
  const [modelUrl, setModelUrl] = useState()

  useEffect(() => {
    if(model){
      const newModelUrl = URL.createObjectURL(model)
      setModelUrl(newModelUrl)
    }
  }, [model])
  
  function onModelChange(e) {
    setModel(...e.target.files)
    alert("uploaded")
  }

  // Sizes
  const modelSize = useRef(null)
  useEffect(() => {
    modelSize.current.style.width = "100%"
    modelSize.current.style.height = "90vh"
  }, [])


  return (
    <>
      <Script
        id="model-viewer"
        type="module" 
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.0/model-viewer.min.js"
      />
      {/* Upload model */}
      <input type="file" onChange={onModelChange} />
      {/* Model */}
      <model-viewer ref={modelSize} src={modelUrl} ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="poster.webp" shadow-intensity="1" render-scale="5">
        <div class="progress-bar hide" slot="progress-bar">
            <div class="update-bar"></div>
        </div>
      </model-viewer>
    
    </>
  )
}
