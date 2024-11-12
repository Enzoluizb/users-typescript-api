import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db.collection<User>('users').find({}).toArray();

        users[0]._id

        return [
            {
                id: "",
                firstName: "Felipe",
                lastName: "Rocha",
                email: "felipe@gmail.com",
                password: "123"
            }
        ]
    }
}