import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => locomotiveScroll.destroy();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "red",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "black",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  // GSAP animation for headings and text on scroll
  useEffect(() => {
    gsap.utils.toArray(".animate-text").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%", // Start the animation when the element is 80% in view
            toggleActions: "play none none reverse", // Play animation on scroll down and reverse on scroll up
          },
        }
      );
    });
  }, []);

  const handleReload = () => {
    setIsReloaded(!isReloaded);
    gsap.fromTo(
      ".textcontainer",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  };

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-sans">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md animate-text">ChiliStation</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we spice things up",
                "Contact us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-md hover:text-gray-300 animate-text"
                >
                  {link}
                </a>
              ))}
              <button onClick={handleReload} className="text-md bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded animate-text">
                Reload
              </button>
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%] animate-text">
              <h3 className="text-4xl leading-[1.2]">
                At ChiliStation, we bring the heat to digital creativity, crafting spicy and bold experiences for brands that want to stand out.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal animate-text">
                We’re passionate about pushing the boundaries of digital design, delivering fiery solutions that captivate and engage.
              </p>
              <p className="text-md mt-10 animate-text">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[17rem] font-normal tracking-tight leading-none pl-5 animate-text"
            >
              CHILLISSSSS
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <h1 className="text-6xl tracking-tighter font-bold animate-text">About ChiliStation</h1>
        <p className="text-3xl leading-[1.8] w-[80%] mt-10 font-normal animate-text ">
          We’re a team of designers and strategists who specialize in adding spice to digital storytelling. At ChiliStation, our goal is to deliver bold, impactful solutions that leave a lasting impression.
        </p>
        <div className="flex items-center justify-center h-screen">
          <img
            className="w-[50%] mt-10 p-40"
            src="Assets\pngwing.com.png"
            alt=""
          />
        </div>
      </div>
      <div className="w-full h-screen mt-96 px-10 relative">
        {showCanvas &&
          data[2].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <h1 className="text-6xl tracking-tighter font-bold animate-text">Our Services</h1>
        <p className="text-3xl leading-[1.8] w-[80%] mt-10 font-normal animate-text">
          At ChiliStation, we offer a range of creative solutions to spice up your brand. From vibrant designs to innovative digital campaigns, we ensure your message leaves a fiery impression.
        </p>
        <div className="flex items-center justify-center h-screen">
          <img
            className="w-[50%] mt-10 p-40"
            src="Assets\pngwing.com (1).png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;
