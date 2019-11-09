export class GetWeatherRequest {
  constructor(
    public cityName: string,
    public couctryCode: string,
    public units?: string
  ) {}
}
