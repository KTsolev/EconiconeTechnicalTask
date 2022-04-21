export class BitCoinRatesModel {
  constructor(
    public type: string,
    public trade_id: number,
    public maker_order_id: string,
    public taker_order_id: string,
    public side: string,
    public size: string,
    public sequence: string,
    public time: string,
  ) {}
}
