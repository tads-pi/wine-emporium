// import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// export const GetClient = createParamDecorator(
//     (field: string | undefined, ctx: ExecutionContext) => {
//         const request: Express.Request = ctx
//             .switchToHttp()
//             .getRequest()

//         if (field) {
//             return request.user
//         }

//         return request
//     }
// )