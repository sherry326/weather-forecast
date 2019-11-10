export class GetWeatherRequest {
  constructor(
    public cityName: string,
    public units?: string
  ) {}
}
