import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesInvoiceLine } from './SalesInvoiceLine';
import { User } from './User';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../lib/user.model';
import { UnitOfMeasurementModel } from '../../lib/unit.of.measurement.model';
import { UnitOfMeasurement } from './UnitOfMeasurement';

@Index('IDX_826d69dcc65d9650be67af6d48', ['displayName'], { unique: true })
@Index('IDX_34f6ca1cd897cc926bdcca1ca3', ['sku'], { unique: true })
@Entity('product', { schema: 'public' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @ManyToOne(
    () => User,
    user => user.updAccountingSchemes,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('character varying', { name: 'sku' })
  @Field()
  sku: string;

  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.product,
  )
  salesInvoiceLines: SalesInvoiceLine[];

  @ManyToOne(
    () => UnitOfMeasurement,
    uom => uom.products,
    { nullable: true, eager: true },
  )
  @JoinColumn([{ name: 'uomId', referencedColumnName: 'id' }])
  @Field(() => UnitOfMeasurement, { nullable: true })
  defaultUoM: UnitOfMeasurementModel;
}
