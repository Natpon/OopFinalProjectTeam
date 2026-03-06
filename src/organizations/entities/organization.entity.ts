import { BaseEntity } from '../../common/entities/base.entity';

export class Organization extends BaseEntity {
  name: string;
  domain: string;
  description?: string;
  logoUrl?: string;
  website?: string;

  constructor(
    name: string,
    domain: string,
    description?: string,
    logoUrl?: string,
    website?: string,
  ) {
    super();
    this.name = name;
    this.domain = domain.toLowerCase();
    this.description = description;
    this.logoUrl = logoUrl;
    this.website = website;
  }

  updateName(name: string): void {
    this.name = name;
    this.markUpdated();
  }

  updateDomain(domain: string): void {
    this.domain = domain.toLowerCase();
    this.markUpdated();
  }

  updateDescription(description?: string): void {
    this.description = description;
    this.markUpdated();
  }

  updateLogo(url?: string): void {
    this.logoUrl = url;
    this.markUpdated();
  }

  updateWebsite(url?: string): void {
    this.website = url;
    this.markUpdated();
  }
}