import { ContactResponse, CreateContactRequest, toContactResponse } from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";

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

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username
      }
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return toContactResponse(contact);
  }
}