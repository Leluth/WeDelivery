import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import video from '../../videos/video.mp4';
import {Button} from '../ButtonElements';
import {ArrowForward, HeroBg, HeroBtnWrapper, HeroContainer, HeroContent, HeroH1, HeroP, VideoBg} from './HeroElements';
import {Input, message} from 'antd';
import {getDeliveryOrder} from "../../utils";
import MyOrders from "../MyOrders";

const {Search} = Input;

const HeroSection = (props) => {
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(false)
    const [trackingInfo, setTrackingInfo] = useState(null)

    const onHover = () => {
        setHover(!hover)
    }

    const onSearch = (token) => {
        setLoading(true)
        getDeliveryOrder(token)
            .then((data) => {
                setTrackingInfo(data)
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setTrackingInfo(null)
    }, [props.home]);

    return (
        trackingInfo != null ? (
            <MyOrders trackingInfo={trackingInfo}/>
        ) : (
            <HeroContainer>
                <HeroBg>
                    <VideoBg autoPlay loop muted
                             src={video} type='video.mp4'/>

                </HeroBg>
                <HeroContent>
                    <HeroH1>Lai Delivery Made Everything Easy </HeroH1>
                    <HeroP>
                        Sign up today and receive $150 in credit towards your next payment.
                    </HeroP>
                    <HeroBtnWrapper>
                        <Button to="signup" onMouseEnter={onHover}
                                onMouseLeave={onHover}
                                primary="true"
                                dark='true'
                                onClick={props.getStarted}
                        >
                            Get Started {hover ? <ArrowForward/> : <FaArrowRight/>}
                        </Button>
                    </HeroBtnWrapper>
                    <HeroP>
                        Or
                    </HeroP>
                    <div>
                        <Search
                            placeholder="Input tracking number"
                            enterButton="Track"
                            size="large"
                            allowClear
                            loading={loading}
                            onSearch={onSearch}/>
                    </div>
                </HeroContent>
            </HeroContainer>
        )
    );
};

export default HeroSection;
