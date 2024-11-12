import "./index.css"
import Canvas from "./Canvas";
import data from "./data";
import { useEffect } from "react";
import LocomotiveScroll from 'locomotive-scroll'
function App() {

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  })

  return (
    <>
      <div className="w-full relative min-h-screen">
        {
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)
        }
      </div>


      <div className="w-full relative min-h-screen">
        {
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)
        }
      </div>


      <div className="w-full relative min-h-screen">
        {
          data[2].map((canvasdets, index) => <Canvas details={canvasdets} />)
        }
      </div>
    </>
  )
}

export default App;
