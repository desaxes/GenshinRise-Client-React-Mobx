import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { getGenshinGems } from "../http/gemsAPI"
import { GemsRow } from "./gems-row"
import { Button } from "react-bootstrap"
import { StyledBox } from "../styledComponents/styled-components"
import { SavingsModal } from "./modals/savingsModal"
import { AppContext } from ".."

export const Gems = observer((props) => {
    const [savings, setSavings] = useState([])
    const { app } = useContext(AppContext)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        getGenshinGems().then(res => setSavings(res.data))
    }, [update])
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = () => {
        setModalOptions(true)
    }
    const rows = savings?.map((e, i) => <GemsRow lastRow={savings[i - 1]} row={e} />).reverse()
    return (
        <div style={{ marginTop: '0px', position: 'relative' }}>
            <Button onClick={() => createModal()} variant="outline-warning" style={{ position: 'fixed', top: '55%', left: '5%' }}>Добавить Запись</Button>
            <StyledBox display='flex' margin='20px 0 0 0' color="yellow" width='100%' border='yellow solid 1px'>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Дата</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Гемы</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='12%'>Крутки</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Кэшбэк</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='23%'>Общее</StyledBox>
                <StyledBox margin='5px 0' style={{ fontWeight: 'bold' }} display='flex' jstf='center' width='20%'>Доход/Расход</StyledBox>
            </StyledBox>
            {rows}
            {modalOptions && <SavingsModal
                show={true}
                onHide={() => setModalOptions(false)}
                setUpdate={setUpdate}
                update={update}
                lastRow={savings ? savings[savings.length - 1] : {}}
            />}
        </div>
    )
})