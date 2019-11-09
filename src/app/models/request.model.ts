export class getWeatherRequest {
  constructor(
    public cityName: string,
    public units?: string
  ) {}
}
