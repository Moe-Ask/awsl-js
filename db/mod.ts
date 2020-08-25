import {denodb, utils} from '../pkg.ts';
import {Links} from "./model/Links.ts";

const { Database } = denodb
type Database = denodb.Database

export async function open_db() {
    const db: Database = new Database("sqlite3", {
        filepath: utils.env("DB_PATH", "masl.db")
    });

    db.link([Links])
    await db.sync({drop:true})
}