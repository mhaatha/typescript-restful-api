import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../models/address-model";
import { Validation } from "../validations/validation";
import { AddressValidation } from "../validations/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../applications/database";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request);
    await ContactService.checkContactMustExists(user.username, createRequest.contact_id);

    const address = await prismaClient.address.create({
      data: createRequest
    });

    return toAddressResponse(address);
  }
}