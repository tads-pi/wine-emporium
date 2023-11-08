import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressViewmodel } from './viewmodel/address.viewmodel';
import { SaveAddressDTO } from './dto/save-address.dto';

@Injectable()
export class AddressService {
    constructor(
        private db: PrismaService
    ) { }

    async listAddress(clientID: string): Promise<AddressViewmodel[]> {
        const c = await this.db.client.findUnique({ where: { id: clientID } })
        const ids = await this.db.clientAddress.findMany({ where: { clientId: clientID } })
        const address = await this.db.address.findMany({ where: { deletedAt: null, id: { in: ids.map(a => a.addressId) } } })
        const viemwodel = address.map(a => new AddressViewmodel(a, a.id === c.markedAddressID))
        return viemwodel
    }

    async markAddress(clientID: string, addressID: string): Promise<null> {
        const a = await this.db.clientAddress.findFirst({ where: { clientId: clientID, addressId: addressID } })
        if (!a) {
            throw new NotFoundException("Endereço não encontado")
        }

        const address = await this.db.address.findUnique({ where: { id: addressID, deletedAt: null } })
        if (!address) {
            throw new NotFoundException("Endereço não encontado")
        }

        await this.db.client.update({
            where: { id: clientID },
            data: { markedAddressID: address.id }
        })

        return
    }

    async deleteAddress(clientID: string, addressID: string): Promise<null> {
        const a = await this.db.clientAddress.findFirst({ where: { clientId: clientID, addressId: addressID } })
        if (!a) {
            throw new NotFoundException("Endereço não encontado")
        }

        await this.db.address.update({
            where: { id: addressID },
            data: { deletedAt: new Date() }
        })

        return
    }

    async createAddress(clientID: string, address: SaveAddressDTO): Promise<AddressViewmodel> {
        const a = await this.db.address.create({
            data: {
                country: address.country,
                state: address.state,
                city: address.city,
                neighborhood: address.neighborhood,
                street: address.street,
                number: address.number,
                zip: address.zip,
                complement: address.complement
            }
        })

        await this.db.clientAddress.create({
            data: {
                clientId: clientID,
                addressId: a.id
            }
        })

        return new AddressViewmodel(a)
    }

    async getAddressByID(clientID: string, addressID: string): Promise<AddressViewmodel> {
        const c = await this.db.client.findUnique({ where: { id: clientID } })

        const ids = await this.db.clientAddress.findFirst({ where: { clientId: clientID, addressId: addressID } })
        if (!ids) {
            throw new NotFoundException("Endereço não encontado")
        }

        const address = await this.db.address.findUnique({ where: { id: ids.addressId } })
        if (!address) {
            throw new NotFoundException("Endereço não encontado")
        }

        return new AddressViewmodel(address, address.id === c.markedAddressID)
    }
}
