export abstract class BaseEntity {
  readonly id: string
  readonly createdAt: Date
  updatedAt: Date

  constructor(id: string) {
    this.id = id
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  markUpdated(): void {
    this.updatedAt = new Date()
  }
}