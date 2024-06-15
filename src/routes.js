import { Navigate } from "react-router-dom"
import { Admin } from "./pages/admin"
import { Collection } from "./pages/collection"
import { Main } from "./pages/main"
import { ADMIN_ROUTE, COLLECT_ROUTE, CHAR_ROUTE, MAIN_PAGE, WEAPON_ROUTE, RISE_ROUTE, ROLL_ROUTE, STAT_ROUTE, RES_ROUTE } from "./utils/constants"
import { Characters } from "./pages/characters"
import { Weapons } from "./pages/weapons"
import { Rise } from "./pages/rise"
import { Resources } from "./pages/resources"
import { Rolls } from "./pages/rolls"
import { Statistic } from "./pages/statistic"

export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin />
    },
    {
        path: MAIN_PAGE,
        component: <Main />
    },
    {
        path: CHAR_ROUTE,
        component: <Characters />
    },
    {
        path: WEAPON_ROUTE,
        component: <Weapons />
    },
    {
        path: COLLECT_ROUTE,
        component: <Collection />
    },
    {
        path: RISE_ROUTE,
        component: <Rise />
    },
    {
        path: RES_ROUTE,
        component: <Resources />
    },
    {
        path: ROLL_ROUTE,
        component: <Rolls />
    },
    {
        path: STAT_ROUTE,
        component: <Statistic />
    },
    {
        path: '*',
        component: <Navigate to={MAIN_PAGE} />
    }
]