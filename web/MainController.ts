import {alosaur, utils} from '../pkg.ts'

import {NewLink} from "./model/NewLink.ts";
import {Links} from "../db/model/Links.ts";

const {to_json, base62, env} = utils

const {
    BadRequestError,
    Body,
    Controller,
    Post,
    UnauthorizedError,
    HttpError,
    InternalServerError
} = alosaur


class ConflictError extends HttpError {
    name = "ConflictError";

    constructor(message?: string) {
        super(409);
        Object.setPrototypeOf(this, ConflictError.prototype);

        if (message) {
            this.message = message;
        }
    }
}

@Controller()
export class MainController {
    @Post("/link")
    async link(@Body() new_link: NewLink) {
        // 净身(bushi
        new_link.short = new_link.short?.trim()
        if (!(new_link.url = new_link.url?.trim()) || !(new_link.token = new_link.token?.trim()))
            return new BadRequestError("参数不全")

        if (new_link.token !== globalThis.token)
            return new UnauthorizedError("token校验失败")

        try {
            new URL(new_link.url)
        } catch (e) {
            return new BadRequestError(`url不合法: ${e}`)
        }

        if (new_link.url.length > env("URL_MAX", 250))
            return new BadRequestError(`url超长`)

        try {
            if (new_link.short !== undefined) {
                const symbol = env("CUSTOM_SYMBOL", '#')
                // 自定义短链前加特殊符号
                if (new_link.short.charAt(0) !== symbol)
                    new_link.short = symbol + new_link.short

                const link: Links = await Links.where("short", new_link.short).first()
                // 如果已经存在自定义标识符，且所使用的对应长链接不相同
                if (link !== undefined && link.url != new_link.url)
                    return new ConflictError(`自定义标识符: \`${new_link.short} \` 已存在且url不相同`)
            }

            // 如果已存在相同长链接，直接返回对应短链标识符
            const link: Links = await Links.where("url", new_link.url).first() ??
                // 否则创建短链接
                (await Links.create({
                    url: new_link.url,
                    short: new_link.short !== undefined ? new_link.short : base62.encode(await Links.max("unique_id") ?? 0)
                }))[0]
            return to_json({
                short: link.short
            })
        } catch (e) {
            return new InternalServerError(`将${new_link.url}插入数据库时失败: ${e}`)
        }
    }
}