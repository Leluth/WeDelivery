import React, {useState} from 'react';
import { FaArrowRight } from 'react-icons/fa';
import video from '../../videos/video.mp4';
import {Button} from '../ButtonElements';
import {
    HeroContainer,
    HeroBg,
    VideoBg ,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './HeroElements';

const HeroSection = (props) => {
    const [hover, setHover ] = useState(false)
    const onHover = () => {
        setHover (!hover)
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted
                         src={video} type= 'video.mp4'/>

            </HeroBg>
            <HeroContent>
                <HeroH1>Lai Delivery Made Everything Easy </HeroH1>
                <HeroP>
                    Sign up today and receive $150 in credit towards your next payment.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="signup" onMouseEnter={onHover}
                            onMouseLeave={onHover}
                            primary ="true"
                            dark='true'
                            onClick={props.getStarted}
                    >
                        Get Started { hover? <ArrowForward/>:<FaArrowRight/>}
                    </Button>
                </HeroBtnWrapper>

            </HeroContent>

        </HeroContainer>
    );
};

export default HeroSection;
