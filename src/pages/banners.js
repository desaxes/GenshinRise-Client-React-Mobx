import { Button, Col, Container, Row } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { CreateBanner } from "../components/modals/createBanner"
import { Banner } from "../components/banner"
import { getBanners } from "../http/bannerAPI"
import { StyledBox } from "../styledComponents/styled-components"
import { BannerModal } from "../components/modals/bannerModal"

const Banners = observer(() => {
    const [modalOptions, setModalOptions] = useState(false)
    const [bannerModal, setBannerModal] = useState(false)
    const [banners, setBanners] = useState()
    const [id, setId] = useState()
    const createModal = () => {
        setModalOptions(true)
    }
    const createBannerModal = (id) => {
        setId(id)
        setBannerModal(true)
    }
    useEffect(() => {
        getBanners().then(res => setBanners(res.data))
    }, [])
    const bannersArray = banners?.banners.map(e => <Banner id={e.id} patchNumber={e.patchNumber} img1={e.img1} img2={e.img2} onShow={createBannerModal} />).reverse()
    return (
        <>
            <Container className="mt-5 mb-5">
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {bannersArray}
                </Row>
                <Button onClick={() => createModal()}
                    style={{ position: 'fixed', bottom: "5%", right: '5%' }} variant="outline-warning">Добавить</Button>
                {modalOptions && <CreateBanner
                    show={true}
                    onHide={() => setModalOptions(false)}
                // bannerType={bannerType}
                />}
                {bannerModal && <BannerModal
                    show={true}
                    onHide={() => setBannerModal(false)}
                    id={id}
                />}
            </Container>
        </>
    )
}
)
export default Banners