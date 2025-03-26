import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Apk from "../../assets/app-release.apk";
import { useGetPdfLinkQuery } from "../../services/User.Auth";

const LandingPage = () => {
  const { data, error } = useGetPdfLinkQuery();
  console.log(data?.data?.pdfLink);
  console.log({ error });
  const [slides, setSlides] = useState([
    {
      title: "QuickInvest",
      description: "Invest Earn Repeat",
      image: logo,
    },
    {
      //   title: "",
      //   description: "",
      // url: "https://drive.google.com/file/d/1poZt3fVKUPOcA-MDjqPWID41E1uCyDIx/preview",
      url: "",
    },
  ]);
  // Update the slides when data changes
  useEffect(() => {
    if (data && data.data && data.data.pdfLink) {
      setSlides((prevSlides) => [
        prevSlides[0], // Keep the first slide unchanged
        {
          url: data.data.pdfLink,
        },
      ]);
    }
  }, [data]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, slides.length]);
  return (
    <>
      <div className="tb__layout">
        <div className="user__container">
          <div className="tb__landingPage__container">
            <div className="tb__landingPage__content">
              <div className="tb__custom__slider">
                <div className="tb__slider__container">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`tb__slide ${
                        index === currentIndex ? "active" : ""
                      }`}
                    >
                      {slide.url && (
                        <iframe
                          title="planPdf"
                          src={slide.url}
                          width="420px"
                          height="100%"
                          allow="autoplay"
                        />
                      )}
                      {slide.image && (
                        <div className="tb__landingPage__logo">
                          <img src={slide.image} alt="logo" />
                        </div>
                      )}

                      {slide.title && (
                        <div className="tb__landingPage__title">
                          <h2>{slide.title}</h2>
                        </div>
                      )}

                      {slide.description && (
                        <div className="tb__landingPage__desc">
                          <p>{slide.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <DotNav
                  slides={slides}
                  currentIndex={currentIndex}
                  handleDotClick={goToSlide}
                />
              </div>

              <div className="tb__landingPage__button">
                <a rel="noreferrer" target="_blank" href={Apk}>
                  Download App
                </a>
              </div>
              <div className="tb__landingPage__button">
                <Link to="/login">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
const DotNav = ({ slides, currentIndex, handleDotClick }) => {
  return (
    <div className="dot-nav">
      {slides.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? "active" : ""}`}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  );
};
