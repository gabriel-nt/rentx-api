import { Specification } from '../infra/typeorm/entities/Specification';

export default interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  id?: string;
  specifications?: Specification[];
}
