import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { getGenshinArtById } from '../../http/artsAPI';
import { getHonkaiArtById } from '../../http/honkai/artsAPI';
import { getZzzArtById } from '../../http/zzz/artsAPI';

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
    const characters = chars.chars.chars?.filter(e =>
        e.charInfo?.firstArtSetfirstHalfId === props.artId ||
        e.charInfo?.firstArtSetSecondHalfId === props.artId ||
        e.charInfo?.secondArtSetfirstHalfId === props.artId ||
        e.charInfo?.secondArtSetSecondHalfId === props.artId ||
        e.charInfo?.thirdArtSetfirstHalfId === props.artId ||
        e.charInfo?.thirdArtSetSecondHalfId === props.artId ||
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
                        {characters?.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                            <StyledTitle fz='18px'>Подходит Персонажам</StyledTitle>
                            <StyledBox display='flex' gap='5px'>
                                {characters?.map(e =>
                                    <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>
                                )}
                            </StyledBox>
                        </StyledBox>}
                    </StyledBox>
                </StyledBox>
            </Modal.Body>
        </Modal >)
})