import { alosaur } from '../pkg.ts'

import { MainController } from "./MainController.ts";

@alosaur.Area({
    controllers: [MainController]
})
export class MainArea {}