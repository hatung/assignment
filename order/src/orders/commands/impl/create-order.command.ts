export class CreateOrderCommand {
  constructor(
    public readonly total: number,
    public readonly user_id: string,
  ) {}
}
