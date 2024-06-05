import {UserDbType} from "../../../db/db-types/user-db-types"
import {DeleteResult, InsertOneResult, ObjectId} from "mongodb"
import {db} from "../../../db/mongo-db"

export const userMongoRepository = {
    async findUserById(id: string): Promise<UserDbType | null> {
        return await db.getCollections().userCollection.findOne({_id: new ObjectId(id)})
    },
    async findUserByField(field: string, value: string): Promise<UserDbType | null> {
        return await db.getCollections().userCollection.findOne({[field]: value})
    },
    findUserByLoginOrEmail(loginOrEmail: string): Promise<UserDbType | null> {
        return db.getCollections().userCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },
    findUserByLoginAndEmail(login: string, email: string): Promise<UserDbType | null> {
        return db.getCollections().userCollection.findOne({$or: [{login: login}, {email: email}]})
    },
    async create(newUser: UserDbType): Promise<string> {
        const insertedInfo: InsertOneResult<UserDbType> = await db.getCollections().userCollection.insertOne(newUser)
        return insertedInfo.insertedId.toString()
    },
    async delete(id: string): Promise<boolean> {
        const deletedInfo: DeleteResult = await db.getCollections().userCollection.deleteOne({_id: new ObjectId(id)})
        return deletedInfo.deletedCount === 1
    }
}