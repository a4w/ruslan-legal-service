import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Slider = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [inView, setInView] = useState(4);
    const [arrows, showArrows] = useState(true);
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        spacing: 20,
        slidesPerView: 4,
        centered: false,
        loop: false,
        breakpoints: {
            "(min-width: 0px) and (max-width: 600px)": {
                slidesPerView: 1,
                mode: "free",
            },
            "(min-width: 601px) and (max-width: 960px)": {
                slidesPerView: 2,
                mode: "free",
            },
            "(min-width: 961px) and (max-width: 1280px)": {
                slidesPerView: 3,
                mode: "free",
            },
        },
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide);
        },
    });
    const clacDots = () => {
        if (window.innerWidth <= 600) setInView(1);
        else if (window.innerWidth <= 960) setInView(2);
        else if (window.innerWidth <= 1280) setInView(3);
        else setInView(4);
        if(slider && inView >= slider.details().size) showArrows(false);
        else showArrows(true);
    };
    useEffect(clacDots, []);
    useEffect(() => {
        window.addEventListener("resize", clacDots);
        return () => window.removeEventListener("resize", clacDots);
    });

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider px-2">
                    {props.children &&
                        props.children.map((child, i) => <div className="keen-slider__slide" key={i}>{child}</div>)
                    }
                </div>
                {arrows && slider && (
                    <>
                        <ArrowLeft
                            onClick={(e) => e.stopPropagation() || slider.prev() }
                            disabled={currentSlide === 0 || inView >= slider.details().size}
                        />

                        <ArrowRight
                            onClick={(e) => e.stopPropagation() || slider.next() }
                            disabled={currentSlide === slider.details().size - 1 || inView >= slider.details().size}
                        />
                    </>
                )}
            </div>
            {slider && (
                <ul className="slick-dots">
                    {[
                        ...Array(
                            Math.abs(
                                inView >= slider.details().size
                                    ? 0
                                    : slider.details().size - inView + 1
                            )
                        ).keys()
                    ].map((idx) => {
                        return (
                            <li
                                key={idx}
                                className={"slick" +(currentSlide === idx ? "-active" : "")}
                            >
                                <button
                                    onClick={() => {slider.moveToSlideRelative(idx); }}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

function ArrowLeft(props) {
    console.log(props.disabled);
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="slick-prev slick-arrow"
        />
    );
}

function ArrowRight(props) {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="slick-next slick-arrow"
        />
    );
}
export default Slider;
