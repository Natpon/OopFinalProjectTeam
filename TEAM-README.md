**PLAN**

<img width="4898" height="4800" alt="image" src="https://github.com/user-attachments/assets/3e8e6f94-458b-4bd5-bd6c-d208ef18bcc5" />

<<<<<<< HEAD

src/
│
├── common/
│   ├── entities/
│   │   └── base.entity.ts
│   │
│   ├── enums/
│   │   ├── user-status.enum.ts
│   │   ├── organization-role.enum.ts
│   │   └── membership-status.enum.ts
│   │
│   ├── interfaces/
│       └── api-response.interface.ts
├── users/
│   ├── models/
│   │   └── user.model.ts
│   │
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   │
│   ├── users.controller.ts
│   └── users.service.ts
│
├── organizations/
│   ├── models/
│   │   └── organization.model.ts
│   │
│   ├── dto/
│   │   ├── create-organization.dto.ts
│   │   └── update-organization.dto.ts
│   │
│   ├── organizations.controller.ts
│   └── organizations.service.ts
│
├── memberships/
│   ├── models/
│   │   └── membership.model.ts
│   │
│   ├── dto/
│   │   ├── add-member.dto.ts
│   │   └── change-role.dto.ts
│   │
│   ├── memberships.controller.ts
│   └── memberships.service.ts
│
└── main.ts
=======
```
src
 ├── main.ts
 ├── app.module.ts
 │
 ├── common
 │   ├── entities
 │   │   └── base.entity.ts
 │   │
 │   ├── enums
 │   │   ├── user-status.enum.ts
 │   │   └── organization-role.enum.ts
 │   │
 │   ├── interfaces
 │   │   └── api-response.interface.ts
 │   │
 │   └── utils
 │
 ├── users
 │   ├── dto
 │   │   ├── create-user.dto.ts
 │   │   └── update-user.dto.ts
 │   │
 │   ├── entities
 │   │   └── user.entity.ts
 │   │
 │   ├── users.controller.ts
 │   ├── users.service.ts
 │   └── users.module.ts
 │
 ├── organizations
 │   ├── dto
 │   ├── entities
 │   │   └── organization.entity.ts
 │   ├── organizations.controller.ts
 │   ├── organizations.service.ts
 │   └── organizations.module.ts
 │
 └── memberships
     ├── dto
     ├── entities
     │   └── membership.entity.ts
     ├── memberships.controller.ts
     ├── memberships.service.ts
     └── memberships.module.ts
>>>>>>> 30e6444 (check)
