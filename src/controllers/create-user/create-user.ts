import validator from 'validator';

import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest } from '../helpers';

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository) { }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            const requiredFields = ["firstName", "lastName", "email", "password"];

            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`
                    }
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body!.email)

            if (!emailIsValid) {
                return badRequest("E-mail is invalid")
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!)

            return {
                statusCode: 201,
                body: user,
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong.'
            }
        }
    }
}