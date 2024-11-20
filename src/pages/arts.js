import { observer } from "mobx-react-lite";
import { getGenshinArts } from "../http/artsAPI";
import { getZzzArts } from "../http/zzz/artsAPI";
import { getHonkaiArts } from "../http/honkai/artsAPI";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "..";
import { Col, Container, Row } from "react-bootstrap";
import { ArtOptions } from "../components/modals/artOptions";
import { Art } from "../components/art";
import { getChars } from "../http/charAPI";
import { getZzzChars } from "../http/zzz/charAPI";
import { getHonkaiChars } from "../http/honkai/charAPI";

export const Arts = observer((props) => {
    const { app, chars } = useContext(AppContext)
    const [artId, setArtId] = useState()
    const [arts, setArts] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id) => {
        setArtId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (app.game === 'Genshin') {
            getGenshinArts().then(res => { res && setArts(res.data); console.log(arts) })
            getChars().then(res => chars.setChars(res.data))
        }
        else if (app.game === 'Zzz') {
            getZzzArts().then(res => { res && setArts(res.data) })
            getZzzChars().then(res => chars.setChars(res.data))
        }
        else if (app.game === 'Honkai') {
            getHonkaiArts().then(res => { res && setArts(res.data) })
            getHonkaiChars().then(res => chars.setChars(res.data))
        }
    }, [app.game])
    let artsArray = arts?.map(e => <Art gridpart={3} key={e.id} art={e} onShow={createModal} />)
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }}>
                <Row className='mt-3 pb-5'>
                    <Col className='mt-4 d-flex flex-column align-items-center' md={12}>
                        <Row className='d-flex justify-content-center'
                            jstf='space-between' gap='30px' style={{ width: '100%' }}
                        >
                            {artsArray}
                        </Row>
                    </Col>
                </Row >
                {modalOptions && <ArtOptions
                    show={true}
                    onHide={() => setModalOptions(false)}
                    artId={artId}
                    currentGame={app.game}
                />
                }
            </Container >
        </>
    )
})