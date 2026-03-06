## PLAN

```
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
├── organizations/
│   ├── models/
│   │   └── organization.model.ts
│   │
│   ├── dto/
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
├── memberships/
│   ├── models/
│   │   └── membership.model.ts
│   │
│   ├── dto/
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
```

*  **Project Information** — ข้อมูลโปรเจค
  → [`subjects/requirement.md`](subjects/requirement.md)
*  **Data Model Documentation** — รายละเอียดโปรเจค
  → [`DATA PROJECT`](docs/data-model.md)
*  **UML Diagram** — แผนภาพ UML ของ Data
  → [`UML Diagram`](docs/uml)
*  **API Specification** — เอากสาร API
  → [`API Specification`](docs/api.md)