import { Role } from '../../../Models/role.model';

export class JwtResponse {
    token: string;
    details: object;
    role: Role;
}