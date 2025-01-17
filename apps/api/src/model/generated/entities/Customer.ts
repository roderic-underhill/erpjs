import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { SalesInvoice } from './SalesInvoice';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressModel } from '../../lib/address.model';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';

@Index('IDX_df529c45726940beb548906481', ['displayName'], { unique: true })
@Index('IDX_71b54ec7502c83c7f503f57c64', ['legalName'], { unique: true })
@Index('IDX_a843215c5e375894bcd5bdf24a', ['vatNumber'], { unique: true })
@Entity('customer', { schema: 'public' })
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
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
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('character varying', { name: 'legalName' })
  @Field()
  legalName: string;

  @Column('character varying', { name: 'vatNumber', nullable: true })
  @Field({ nullable: true })
  vatNumber: string | null;

  @Column('character varying', { name: 'invoicingEmail' })
  @Field()
  invoicingEmail: string;

  @Column('character varying', { name: 'idNumber' })
  @Field()
  idNumber: string;

  @ManyToOne(
    () => Address,
    address => address.customers,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'legalAddressId', referencedColumnName: 'id' }])
  @Field(() => Address)
  legalAddress: AddressModel;

  @OneToMany(
    () => SalesInvoice,
    salesInvoice => salesInvoice.customer,
  )
  @Field(() => [SalesInvoice])
  salesInvoices: SalesInvoiceModel[];

  @Column('character varying', { name: 'note', nullable: true })
  @Field({ nullable: true })
  note: string | null;

  @ManyToOne(
    () => Address,
    address => address.customers1,
    { nullable: true, eager: true },
  )
  @JoinColumn([{ name: 'addressId', referencedColumnName: 'id' }])
  @Field(() => Address, { nullable: true })
  address: AddressModel;
}
