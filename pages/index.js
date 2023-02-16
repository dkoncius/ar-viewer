import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Router from 'next/router'

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
    console.log(...e.target.files)
  }

  // Sizes
  const modelViewer = useRef(null)
  useEffect(() => {
    modelViewer.current.style.width = "100%"
    modelViewer.current.style.height = "90vh"
  }, [])

  // Load model
  

  // Slider data
  const sliderData = ['Chair', 'Canoe', 'GeoPlanter', 'Mixer', "ToyTrain"]

  // Change model
  const switchSrc = (event, name) => {
    modelViewer.src = `/slider/${name}.glb`;
    // modelViewer.poster = `/glb/${name}.glb`;
    const slides = document.querySelectorAll(".slide");
    slides.forEach((element) => {element.classList.remove("selected");});
    event.currentTarget.classList.add("selected")    
  };
  



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
      <model-viewer ref={modelViewer} src={modelUrl} ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="poster.webp" shadow-intensity="1" render-scale="5">
        <div class="progress-bar hide" slot="progress-bar">
            <div class="update-bar"></div>
        </div>

      {/* Slider */}
      <div className="slider">
        <div className="slides">
            {
                sliderData.map(data => 
                  <button 
                  onClick={(e) => switchSrc(e, data)}
                  className="slide"
                  style={{
                    background: `url(/slider/${data}.webp)`,
                    backgroundSize: 'contain',
                    backgroundColor: 'white',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  ></button>
                  )
            }
        </div>
      </div>
      </model-viewer>
    
    </>
  )
}
