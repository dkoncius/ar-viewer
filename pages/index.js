import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Router from 'next/router'

export default function Home() {
  let [model, setModel] = useState('/glb/Chair.glb')

  // Model sizes
  const modelViewer = useRef(null)

  // Upload model
  useEffect(() => {
      document.querySelector('input[type="file"]').addEventListener('change', function() {
          if (this.files && this.files[0]) {
              modelViewer.onload = () => {
                  URL.revokeObjectURL(modelViewer.src);  // no longer needed, free memory
              }
  
              modelViewer.src = URL.createObjectURL(this.files[0]); // set src to blob url

              setModel( modelViewer.src)
          }
      });

  }, [model])


  // Slider data
  const sliderData = ['Chair', 'Canoe', 'GeoPlanter', 'Mixer', "ToyTrain"]

  // Change model
  const switchSrc = (event, name) => {
    modelViewer.src = `/glb/${name}.glb`;

    setModel( modelViewer.src)
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
    <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> Custom Upload
    </label>
    <input id="file-upload" type="file"/>
      {/* Model */}
      <model-viewer ref={modelViewer} src={model} ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="poster.webp" shadow-intensity="1" render-scale="1" camera-orbit="-60deg auto 100%" 
      field-of-view='7deg' max-field-of-view='12deg'>
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
