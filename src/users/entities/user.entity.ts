import { UserStatus } from '../../common/enums/user-status.enum'

export class User {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;

    private email: string;
    private fullName: string;
    private status: UserStatus;
    private lastLoginAt: Date | null;

    constructor(init: {
        id: string;
        email: string;
        fullName: string;
        status?: UserStatus;
        createdAt?: Date;
        updatedAt?: Date;
        lastLoginAt?: Date | null;
    }) {
        this.id = init.id;
        this.email = init.email;
        this.fullName = init.fullName;
        this.status = init.status ?? UserStatus.ACTIVE;
        this.createdAt = init.createdAt ?? new Date();
        this.updatedAt = init.updatedAt ?? new Date();
        this.lastLoginAt = init.lastLoginAt ?? null;
    }

}
