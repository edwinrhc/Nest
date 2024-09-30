import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const RawHeaders = createParamDecorator(
    (data:string,ctx : ExecutionContext) => {
        console.log({ctx})
        const req = ctx.switchToHttp().getRequest();
        return req.rawHeaders;

    }
)
