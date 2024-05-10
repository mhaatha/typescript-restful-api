import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse } from "../models/address-model";
import { Validation } from "../validations/validation";
import { AddressValidation } from "../validations/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request);
    await ContactService.checkContactMustExists(user.username, createRequest.contact_id);

    const address = await prismaClient.address.create({
      data: createRequest
    });

    return toAddressResponse(address);
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExists(user.username, getRequest.contact_id);

    const address = await prismaClient.address.findFirst({
      where: {
        id: getRequest.id,
        contact_id: getRequest.contact_id
      }
    });

    if (!address) {
      throw new ResponseError(404, "Address not found");
    }

    return toAddressResponse(address);
  }
}