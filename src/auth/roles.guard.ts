import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userRole = request.user.role;
        const requiredRoles = this.reflector.get<string>(
            'roles',
            context.getHandler(),
        );

        if (!requiredRoles) return true;

        return requiredRoles.includes(userRole);
    }
}