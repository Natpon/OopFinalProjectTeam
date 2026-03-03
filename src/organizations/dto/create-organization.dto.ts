
export class CreateOrganizationDto {
  name: string;
  domain: string;

  constructor(param: {name: string, domain: string}) {
    this.name = param.name;
    this.domain = param.domain
  }
}
