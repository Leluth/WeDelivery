import React from 'react';
import { Button } from 'react-scroll';
import { 
    InfoContainer,
    InfoWrapper, 
    InfoRow,
    Column1, 
    Column2, 
    TextWrapper, 
    TopLine, 
    Heading, 
    Subtitle,
    BtnWrap,
    Img,
    ImgWrap
  } from './InfoElements';

function InfoSection() {
    return (
        <>
            <InfoContainer>
                <InfoWrapper>
                    <InfoRow>
                        <Column1>
                        <TextWrapper>
                            <TopLine>TopLine</TopLine>
                            <Heading>Heading</Heading>
                            <Subtitle>Subtitle</Subtitle>
                            <BtnWrap>
                                <Button to="home"/>
                            </BtnWrap>
                        </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                            <Img/>
                        </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection;
