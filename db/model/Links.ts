import {denodb, utils} from '../../pkg.ts';

const {Model, DataTypes} = denodb

export class Links extends Model {
    unique_id!: number
    url!: string
    short!: string
    createdAt!: string
    updatedAt!: string

    static table = 'links'
    static timestamps = true

    static fields = {
        short: {
            type: DataTypes.STRING,
            unique: true
        },
        unique_id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true
        },
        url: {
            ...DataTypes.string(utils.env("URL_MAX", 250) as number),
            unique: true,
            allowNull: false
        },
    }
}