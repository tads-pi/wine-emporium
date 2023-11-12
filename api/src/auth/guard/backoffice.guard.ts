import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BackofficeGuard implements CanActivate {
    constructor(
        private db: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = await this.db.backofficeClient.findUnique({ where: { id: request.user.id } })

        return user != null
    }
}

@Injectable()
export class BackofficeAdminGuard implements CanActivate {
    constructor(
        private db: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = await this.db.backofficeClient.findUnique({ where: { id: request.user.id } })
        const { id: adminGroupId } = await this.db.backofficeGroup.findFirst({ where: { name: 'ADMINISTRADOR' }, select: { id: true } })
        console.log({user});
        return user.groupId === adminGroupId
    }
}