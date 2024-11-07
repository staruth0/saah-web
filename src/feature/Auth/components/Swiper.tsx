import "../styles/swiper.scss";
import { back_arrow } from "../../../assets/icons";
import { useEffect, useState } from "react";
import { slides } from "../../../Data/Data";

function Swiper() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
    
  const handleCurrentSlide = (index:number) => {
    setActiveSlide(index);
    };
    
    useEffect(() => {
        setInterval(handleNextSlide, 6000);
    },[])

  return (
    <div className="swiper">
          <div className="swiper__logo">
              REEPLS
        {/* <img src={back_arrow} alt="Logo" /> */}
      </div>

      <div className="swiper__image__container">
        <div className="swiper__buttons">
          <div className="swiper__button " onClick={handlePrevSlide}>
            <img src={back_arrow} alt="arrow-left" />
          </div>
          <div className="swiper__button" onClick={handleNextSlide}>
            <img src={back_arrow} alt="arrow-right" className="arrow-right" />
          </div>
        </div>

        <div className="swiper__image__wrapper"></div>
      </div>

      <div className="swiper__text">
        <h2>{slides[activeSlide].text}</h2>
        <p>{slides[activeSlide].description}</p>
      </div>

      <div className="swiper__indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`swiper__indicator ${
              index === activeSlide ? "active" : ""
            }`}
            onClick={() => handleCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Swiper;
