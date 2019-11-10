export class City {
  constructor(
    public cityName: string,
    public id?: string,
    public countryCode?: string
  ) {
    this.cityName = cityName;
    this.id = id;
    this.countryCode = countryCode;
  }
}
