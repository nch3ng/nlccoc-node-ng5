export class Zone {
  _id: String;
  name; String;
}
export class IncomeType {
  _id: String;
  name; String;
}
export class Income {
  _id: String;
  amount: Number;
  date: Date;
  zone: Zone;
  type: IncomeType;
}
