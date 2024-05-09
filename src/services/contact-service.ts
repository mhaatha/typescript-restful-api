import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from "../models/contact-model";
import { Validation } from "../validations/validation";
import { ContactValidation } from "../validations/contact-validation";
import { User, Contact } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { Pageable } from "../models/page";

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

  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id);

    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username
      }
    });

    return toContactResponse(contact);
  }

  static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    // Dynamic query
    const filters = [];
    // Check if name exists
    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name
            }
          },
          {
            last_name: {
              contains: searchRequest.name
            }
          }
        ]
      })
    }
    // Check if email exists
    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email
        }
      })
    }
    // Check if phone exists
    if (searchRequest.phone) {
      filters.push({
        phone: {
          contains: searchRequest.phone
        }
      })
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters
      },
      take: searchRequest.size,
      skip: skip
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters
      }
    });

    return {
      data: contacts.map(contact => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size
      }
    }
  }
}

