import { Field, InputType, Int } from '@nestjs/graphql';
import { IdAndValue, SalesInvoiceMonthlySaveArgsModel } from '../../model';

@InputType()
export class IdAndNumber implements IdAndValue<number> {
  @Field()
  id: number;
  @Field()
  value: number;
}

@InputType()
export class SalesInvoiceMonthlySaveArgs
  implements SalesInvoiceMonthlySaveArgsModel {
  @Field()
  totalHours: number;

  @Field()
  dailyRate: number;

  @Field(() => [IdAndNumber])
  organizationDivider: IdAndValue<number>[];

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  day: number;

  @Field()
  eurToCzkRate: number;

  @Field()
  narration: string;
}
