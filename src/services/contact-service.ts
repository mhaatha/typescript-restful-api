import { ContactResponse, CreateContactRequest, UpdateContactRequest, toContactResponse } from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { User, Contact } from "@prisma/client";
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

  // Function untuk merefactor code yang sama
  static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username
      }
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);
    return toContactResponse(contact);
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
    await this.checkContactMustExists(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username
      },
      data: updateRequest
    });

    return toContactResponse(contact);
  }

}