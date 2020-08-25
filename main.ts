/// <reference path = "./global.d.ts" />

import {alosaur, dotenv, uuid, utils} from './pkg.ts'
import {settings} from "./web/mod.ts";
import {open_db} from './db/mod.ts'

const { App } = alosaur
const { env } = utils

if (import.meta.main) {
    dotenv.config({
        export: true,
        allowEmptyValues: true,
        safe: true
    })

    await open_db()

    const app = new App(settings)

    globalThis.token = env("TOKEN", uuid.v4.generate())

    console.log(`Token: ${globalThis.token}`)

    app.listen(env("BIND", "localhost:1551"))
}

