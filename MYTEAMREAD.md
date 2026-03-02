**PLAN**
<img width="8191" height="4873" alt="Untitled diagram-2026-03-01-051948" src="https://github.com/user-attachments/assets/25a747d2-f5ed-48db-9d39-628620f20576" />

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
