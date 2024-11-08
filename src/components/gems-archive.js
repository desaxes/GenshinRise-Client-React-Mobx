import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { getAllGenshinGems, getGenshinGems } from "../http/gemsAPI"
import { GemsRow } from "./gems-row"
import { Button } from "react-bootstrap"
import { StyledBox } from "../styledComponents/styled-components"
import { AppContext } from ".."
import genshinGem from '../img/gems/genshin/gems.webp'
import honkaiGem from '../img/gems/honkai/gems.webp'
import zzzGem from '../img/gems/zzz/gems.webp'
import { getAllEventRolls, getAllWeaponRolls } from "../http/rollAPI"
import { getAllZzzGems } from "../http/zzz/gemsAPI"
import { getAllHonkaiGems } from "../http/honkai/gemsAPI"
import { getZzzAllEventRolls, getZzzAllWeaponRolls } from "../http/zzz/rollAPI"
import { getHonkaiAllEventRolls, getHonkaiAllWeaponRolls } from "../http/honkai/rollAPI"

export const GemsArchive = observer((props) => {
    const [savings, setSavings] = useState([])
    const [wRollsCount, setWRollsCount] = useState()
    const [eRollsCount, setERollsCount] = useState()
    const income = savings?.reduce((a, e) => { return a + e.income }, 0)
    const expense = savings?.reduce((a, e) => { return a + e.expense }, 0)
    const { app } = useContext(AppContext)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getAllGenshinGems().then(res => setSavings(res.data))
            getAllEventRolls().then(res => setERollsCount(res.data.total))
            getAllWeaponRolls().then(res => setWRollsCount(res.data.total))
        }
        else if (app.game === 'Zzz') {
            getAllZzzGems().then(res => setSavings(res.data))
            getZzzAllEventRolls().then(res => setERollsCount(res.data.total))
            getZzzAllWeaponRolls().then(res => setWRollsCount(res.data.total))
        }
        else if (app.game === 'Honkai') {
            getAllHonkaiGems().then(res => setSavings(res.data))
            getHonkaiAllEventRolls().then(res => setERollsCount(res.data.total))
            getHonkaiAllWeaponRolls().then(res => setWRollsCount(res.data.total))
        }
    }, [app.game])
    const rows = savings?.map((e, i) => <GemsRow lastRow={savings[i - 1]} row={e} />).reverse()
    return (
        <div style={{ marginTop: '0px', position: 'relative', width: '100%', fontSize: '20px' }}>
            <StyledBox display='flex' margin='15px 0' color="yellow" align='center' jstf='space-between'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>Всего накоплено :
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                        {(wRollsCount + eRollsCount) * 160 +
                            (savings.length && (savings[savings.length - 1]?.rolls) * 160 +
                                Math.floor(savings[savings.length - 1]?.cash / (app.game === 'Genshin' ? 5 : 20)) * 160 +
                                (savings[savings.length - 1]?.gems))}
                    </div>
                    <div>
                        Всего потрачено :
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                        {(wRollsCount + eRollsCount) * 160}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        Доход за месяц :
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                        {income}
                    </div>
                    <div>
                        Расход за месяц :
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                        {expense}
                    </div>
                </div>
            </StyledBox>
            <StyledBox display='flex' margin='20px 0 0 0' color="yellow" width='100%' border='yellow solid 1px'>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Дата</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Гемы</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='12%'>Крутки</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>Кэшбэк</StyledBox>
                <StyledBox margin='5px 0' style={{ borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='23%'>Общее</StyledBox>
                <StyledBox margin='5px 0' style={{ fontWeight: 'bold' }} display='flex' jstf='center' width='20%'>Доход/Расход</StyledBox>
            </StyledBox>
            {rows}
        </div>
    )
})