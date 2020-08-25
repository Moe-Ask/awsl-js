import {alosaur, dotenv, uuid, utils} from './pkg.ts'
import {MainArea} from "./web/mod.ts";

import {open_db} from './db/mod.ts'

const { App } = alosaur
const { env } = utils

declare global {
    var token: string

    interface ImportMeta {
        main: boolean
    }
}

if (import.meta.main) {
    dotenv.config({
        export: true,
        allowEmptyValues: true,
        safe: true
    })

    await open_db()

    const app = new App({
        areas: [MainArea]
    })

    globalThis.token = env("TOKEN", uuid.v4.generate())

    console.log(`Token: ${globalThis.token}`)

    app.listen(env("BIND", "localhost:1551"))
}

