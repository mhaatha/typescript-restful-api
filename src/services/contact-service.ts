import { ContactResponse, CreateContactRequest, toContactResponse } from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";

export class ContactService {
  static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request);

    const contact = await prismaClient.contact.create({
      data: {
        ...createRequest,
        username: user.username
      }
    });

    return toContactResponse(contact);
  }
}