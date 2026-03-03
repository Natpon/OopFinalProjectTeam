import { BaseEntity } from '@/common/entities/base.entity';
import { UserStatus } from '@/common/enums/user-status.enum'

export class User extends BaseEntity {
    private email: string;
    private fullName: string;
    private status: UserStatus;
    private lastLoginAt: Date | null;

    constructor(params: {
        id: string;
        email: string;
        fullName: string;
        status?: UserStatus;
    }) {
        super();

        this.email = params.email;
        this.fullName = params.fullName;
        this.status = params.status ?? UserStatus.ACTIVE;
        this.lastLoginAt = null;
    }

}
