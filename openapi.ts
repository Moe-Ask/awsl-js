/// <reference path = "./global.d.ts" />

import {alosaur_openapi} from './pkg.ts'
import {settings} from "./web/mod.ts";

alosaur_openapi.AlosaurOpenApiBuilder
    .create(settings)
    .addTitle("MoeAsk ShortLink-Deno apis")
    .addVersion("v0.0.1")
    .addDescription("萌问短链接服务(deno版)的api文档(openapi v3)")
    .addServer({
        url: "http://localhost:1551",
        description: "默认开发服务器"
    })
    .saveToFile("openapi.json")