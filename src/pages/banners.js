import { Button, Container, Dropdown, Row } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { CreateBanner } from "../components/modals/createBanner"
import { Banner } from "../components/banner"
import { getBanners } from "../http/bannerAPI"
import { StyledBox } from "../styledComponents/styled-components"
import { BannerModal } from "../components/modals/bannerModal"
import { AppContext } from ".."
import { getZzzBanners } from "../http/zzz/bannerAPI"
import { getHonkaiBanners } from "../http/honkai/bannerAPI"
import { getChars } from "../http/charAPI"
import { getZzzChars } from "../http/zzz/charAPI"
import { getHonkaiChars } from "../http/honkai/charAPI"

const Banners = observer(() => {
    const [modalOptions, setModalOptions] = useState(false)
    const [bannerModal, setBannerModal] = useState(false)
    const [banners, setBanners] = useState()
    const [id, setId] = useState()
    const [update, setUpdate] = useState()
    const [currentChar, setCurrentChar] = useState('')
    const { app, chars } = useContext(AppContext)
    const createModal = () => {
        setModalOptions(true)
    }
    const createBannerModal = (id) => {
        setId(id)
        setBannerModal(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        setCurrentChar('')
    }, [app.game])
    useEffect(() => {
        if (app.game === 'Genshin') {
            getBanners().then(res => {
                if (currentChar) {
                    let banners = res.data.banners.filter(e =>
                        +e.charId1 === +currentChar.id ||
                        +e.charId2 === +currentChar.id ||
                        +e.epicCharId1 === +currentChar.id ||
                        +e.epicCharId2 === +currentChar.id ||
                        +e.epicCharId3 === +currentChar.id
                    )
                    setBanners({ banners: banners, total: res.data.total })
                }
                else {
                    setBanners(res.data)
                }
                getChars().then(res => chars.setChars(res.data))
            })
        }
        else if (app.game === 'Zzz') {
            getZzzBanners().then(res => {
                if (currentChar) {
                    let banners = res.data.banners.filter(e =>
                        +e.charId1 === +currentChar.id ||
                        +e.charId2 === +currentChar.id ||
                        +e.epicCharId1 === +currentChar.id ||
                        +e.epicCharId2 === +currentChar.id ||
                        +e.epicCharId3 === +currentChar.id
                    )
                    setBanners({ banners: banners, total: res.data.total })
                }
                else {
                    setBanners(res.data)
                }
                getZzzChars().then(res => chars.setChars(res.data))
            })
        }
        else if (app.game === 'Honkai') {
            getHonkaiBanners().then(res => {
                if (currentChar) {
                    let banners = res.data.banners.filter(e =>
                        +e.charId1 === +currentChar.id ||
                        +e.charId2 === +currentChar.id ||
                        +e.charId3 === +currentChar.id ||
                        +e.charId4 === +currentChar.id ||
                        +e.epicCharId1 === +currentChar.id ||
                        +e.epicCharId2 === +currentChar.id ||
                        +e.epicCharId3 === +currentChar.id
                    )
                    setBanners({ banners: banners, total: res.data.total })
                }
                else {
                    setBanners(res.data)
                }
                getHonkaiChars().then(res => chars.setChars(res.data))
            })
        }
        setUpdate(false)
    }, [app.game, currentChar, update])
    // let bans
    // if (currentChar) {

    // }
    // else {
    // }
    const bannersArray = banners?.banners.map(e => <Banner id={e.id} patchNumber={e.patchNumber} img1={e.img1} img2={e.img2} onShow={createBannerModal} />).reverse()
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }} className="mt-5 mb-5" >
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {bannersArray}
                </Row>
                <Button onClick={() => createModal()}
                    style={{ position: 'fixed', bottom: "5%", right: '5%' }} variant="outline-warning">Добавить</Button>
                {modalOptions && <CreateBanner
                    show={true}
                    onHide={() => setModalOptions(false)}
                    setUpdate={setUpdate}
                />}
                {bannerModal && <BannerModal
                    show={true}
                    onHide={() => setBannerModal(false)}
                    id={id}
                />}
            </Container>
            <Dropdown style={{ position: 'fixed', top: '50%', marginLeft: '60px' }} className='mt-2 mb-2'>
                <Dropdown.Toggle variant='outline-warning'>
                    {currentChar === '' ? 'Выберите Персонажа' : currentChar.name}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Dropdown.Item
                        onClick={() => { setCurrentChar('') }}>
                        <StyledBox display='flex' align='center' jstf='center' >
                            <p style={{ fontWeight: 'bold' }}>Все</p>
                        </StyledBox>
                    </Dropdown.Item>
                    {chars.chars.chars.map(e =>
                        <Dropdown.Item
                            onClick={() => { setCurrentChar(e) }}
                            key={e.id}>
                            <StyledBox display='flex' align='center' jstf='center' >
                                <img alt='stone' style={{ maxWidth: '40px' }}
                                    src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img>
                                <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                            </StyledBox>
                        </Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
)
export default Banners