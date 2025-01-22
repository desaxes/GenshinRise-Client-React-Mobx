import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { getGenshinArtById } from '../../http/artsAPI';
import { getHonkaiArtById } from '../../http/honkai/artsAPI';
import { getZzzArtById } from '../../http/zzz/artsAPI';
import { Col, Row } from 'react-bootstrap';

export const ArtOptions = observer((props) => {
    const { app, chars } = useContext(AppContext)
    const [art, setArt] = useState()
    const [currentGame, setCurrentGame] = useState(props.currentGame)
    useEffect(() => {
        let getArt
        switch (app.game) {
            case 'Genshin':
                getArt = getGenshinArtById
                break;
            case 'Honkai':
                getArt = getHonkaiArtById
                break;
            case 'Zzz':
                getArt = getZzzArtById
                break;
            default:
                break;
        }
        getArt(props.artId).then(res => {
            setArt(res.data)
        })
    }, [])
    useEffect(() => {
        if (app.game != currentGame) {
            props.onHide()
        }
    }, [app.game])

    const zzzCharactersFourParts = chars.chars.chars?.filter(e =>
        e.charInfo?.firstArtSetfirstHalfId === props.artId ||
        e.charInfo?.secondArtSetfirstHalfId === props.artId ||
        e.charInfo?.thirdArtSetfirstHalfId === props.artId
    )
    const zzzCharactersTwoParts = chars.chars.chars?.filter(e =>
        e.charInfo?.firstArtSetSecondHalfId === props.artId ||
        e.charInfo?.secondArtSetSecondHalfId === props.artId ||
        e.charInfo?.thirdArtSetSecondHalfId === props.artId
    )
    const charactersTwoParts = chars.chars.chars?.filter(e =>
        e.charInfo?.firstArtSetfirstHalfId != e.charInfo?.firstArtSetSecondHalfId && e.charInfo?.firstArtSetfirstHalfId === props.artId ||
        e.charInfo?.firstArtSetSecondHalfId != e.charInfo?.firstArtSetfirstHalfId && e.charInfo?.firstArtSetSecondHalfId === props.artId ||
        e.charInfo?.secondArtSetfirstHalfId != e.charInfo?.secondArtSetSecondHalfId && e.charInfo?.secondArtSetfirstHalfId === props.artId ||
        e.charInfo?.secondArtSetSecondHalfId != e.charInfo?.secondArtSetfirstHalfId && e.charInfo?.secondArtSetSecondHalfId === props.artId ||
        e.charInfo?.thirdArtSetfirstHalfId != e.charInfo?.thirdArtSetSecondHalfId && e.charInfo?.thirdArtSetfirstHalfId === props.artId ||
        e.charInfo?.thirdArtSetSecondHalfId != e.charInfo?.thirdArtSetfirstHalfId && e.charInfo?.thirdArtSetSecondHalfId === props.artId
    )
    const charactersFourParts = chars.chars.chars?.filter(e =>
        e.charInfo?.firstArtSetfirstHalfId === props.artId && props.artId === e.charInfo?.firstArtSetSecondHalfId ||
        e.charInfo?.secondArtSetfirstHalfId === props.artId && props.artId === e.charInfo?.secondArtSetSecondHalfId ||
        e.charInfo?.thirdArtSetfirstHalfId === props.artId && props.artId === e.charInfo?.thirdArtSetSecondHalfId
    )
    const charPlanars = chars.chars.chars?.filter(e =>
        e.charInfo?.firstPlanarSetId === props.artId ||
        e.charInfo?.secondPlanarSetId === props.artId ||
        e.charInfo?.thirdPlanarSetId === props.artId
    )
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ textShadow: '2px 2px 2px black' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {art?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledBox display='flex' gap='40px' dir='row' jstf='center' width='100%' padding='10px 50px' align='center'>
                    <img style={{ width: '150px', height: '150px' }} alt='art' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? "/zzz/arts/" : '/honkai/arts/')) + art?.img}></img>
                    <StyledBox color='yellow' display='flex' dir='column' align='center'>
                        {art?.planar && < StyledTitle fz='24px'>Планарное Украшение</StyledTitle>}
                        <StyledBox display='flex' gap='40px'>
                            <StyledBox>
                                <StyledTitle fz='24px'>2 части</StyledTitle>
                                <StyledTitle fz='18px'>{art?.twoPartsEffect}</StyledTitle>
                            </StyledBox>
                        </StyledBox>
                        {art?.fourPartsEffect && <StyledBox>
                            <StyledTitle fz='24px'>4 части</StyledTitle>
                            <StyledTitle fz='18px'>{art?.fourPartsEffect}</StyledTitle>
                        </StyledBox>}
                        {app.game === 'Zzz' && zzzCharactersFourParts?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам (4 части)</StyledTitle>
                            <Row display='flex' gap='5px'>
                                {zzzCharactersFourParts?.map(e =>
                                    <Col style={{ marginBottom: '10px' }}>
                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>

                                    </Col>)}
                            </Row>
                        </StyledBox>}
                        {app.game === 'Zzz' && zzzCharactersTwoParts?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам (2 части)</StyledTitle>
                            <Row display='flex' gap='5px'>
                                {zzzCharactersTwoParts?.map(e =>
                                    <Col style={{ marginBottom: '10px' }}>
                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>

                                    </Col>)}
                            </Row>
                        </StyledBox>}
                        {app.game !== 'Zzz' && charactersFourParts?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам (4 части)</StyledTitle>
                            <Row display='flex' gap='5px'>
                                {charactersFourParts?.map(e =>
                                    <Col style={{ marginBottom: '10px' }}>
                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>

                                    </Col>)}
                            </Row>
                        </StyledBox>}
                        {app.game !== 'Zzz' && charactersTwoParts?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам (2 части)</StyledTitle>
                            <Row display='flex' gap='5px'>
                                {charactersTwoParts?.map(e =>
                                    <Col style={{ marginBottom: '10px' }}>
                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>

                                    </Col>)}
                            </Row>
                        </StyledBox>}
                        {app.game === 'Honkai' && charPlanars?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам</StyledTitle>
                            <Row display='flex' gap='5px'>
                                {charPlanars?.map(e =>
                                    <Col style={{ marginBottom: '10px' }}>
                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>

                                    </Col>)}
                            </Row>
                        </StyledBox>}
                    </StyledBox>
                </StyledBox>
            </Modal.Body>
        </Modal >)
})