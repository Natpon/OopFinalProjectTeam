**PLAN**

<img width="4898" height="4800" alt="image" src="https://github.com/user-attachments/assets/3e8e6f94-458b-4bd5-bd6c-d208ef18bcc5" />


src
│
├── common
│   ├── entities
│   │   └── base.entity.ts
│   │
│   └── enums
│       ├── user-status.enum.ts
│       ├── organization-role.enum.ts
│       └── membership-status.enum.ts
│
├── users
│   ├── models
│   │   └── user.model.ts
│   │
│   ├── dto
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   │
│   ├── users.controller.ts
│   └── users.service.ts
│
├── organizations
│   ├── models
│   │   └── organization.model.ts
│   │
│   ├── dto
│   │   ├── create-organization.dto.ts
│   │   └── update-organization.dto.ts
│   │
│   ├── organizations.controller.ts
│   └── organizations.service.ts
│
├── memberships
│   ├── models
│   │   └── membership.model.ts
│   │
│   ├── dto
│   │   ├── add-member.dto.ts
│   │   └── change-role.dto.ts
│   │
│   ├── memberships.controller.ts
│   └── memberships.service.ts
│
└── main.ts
