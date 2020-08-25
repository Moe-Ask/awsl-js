import { alosaur } from '../pkg.ts'

import { MainController } from "./MainController.ts";

@alosaur.Area({
    controllers: [MainController]
})
class MainArea {}

export const settings = {
    areas: [MainArea]
}