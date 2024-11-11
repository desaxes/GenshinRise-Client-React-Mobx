import { Container } from "react-bootstrap"
import { StyledBox } from "../styledComponents/styled-components"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { RollBanner } from "../components/roll-banner"


const Rolls = observer(() => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }} className="mt-5 mb-5">
                <StyledBox display='flex' dir='column'>
                    <RollBanner bannerType={'standart'} />
                    <RollBanner bannerType={'event'} />
                    <RollBanner bannerType={'weapon'} />
                </StyledBox>
            </Container>
        </>
    )
}
)
export default Rolls