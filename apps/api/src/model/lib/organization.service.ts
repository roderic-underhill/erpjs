import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { OrganizationModel } from './organization.model';
import { OrganizationSaveArgsModel } from './organization.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { AddressService, AddressServiceKey } from './address.service';
import {
  BankAccountService,
  BankAccountServiceKey,
} from './bank.account.service';
import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from './accounting.scheme.service';
import { Organization } from '../generated/entities/Organization';
import { UserModel } from './user.model';
import {
  DocumentNumberingService,
  DocumentNumberingServiceKey,
} from './document.numbering.service';

export const OrganizationServiceKey = 'OrganizationService';

@Injectable()
export class OrganizationService extends BaseEntityService<
  OrganizationModel,
  OrganizationSaveArgsModel
> {
  typeName(): string {
    return OrganizationServiceKey;
  }
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
    @Inject(BankAccountServiceKey)
    public readonly bankAccountService: BankAccountService,
    @Inject(AccountingSchemeServiceKey)
    public readonly accountingSchemeService: AccountingSchemeService,
    @Inject(DocumentNumberingServiceKey)
    public readonly documentNumberingService: DocumentNumberingService,
  ) {
    super();
  }

  createEntity(): OrganizationModel {
    return new Organization();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: OrganizationSaveArgsModel,
    organization: OrganizationModel,
    currentUser: UserModel,
  ): Promise<OrganizationModel> {
    organization.contact = args.contact;
    organization.registration = args.registration;
    organization.displayName = args.displayName;
    organization.legalName = args.legalName;
    organization.legalAddress = await this.addressService.save(
      transactionalEntityManager,
      args.legalAddress,
      currentUser,
    );
    organization.idNumber = args.idNumber;

    if (!(args.bankAccount || args.newBankAccount || args.bankAccountId)) {
      throw new Error('Bank account not specified');
    }

    organization.bankAccount =
      args.bankAccount ||
      (args.bankAccountId &&
        (await this.bankAccountService.loadEntityById(
          transactionalEntityManager,
          args.bankAccountId,
        ))) ||
      (args.newBankAccount &&
        (await this.bankAccountService.save(
          transactionalEntityManager,
          args.newBankAccount,
          currentUser,
        )));
    organization.accountingScheme =
      args.accountingScheme ||
      (await this.accountingSchemeService.loadEntityById(
        transactionalEntityManager,
        args.accountingSchemeId,
      ));
    organization.vatNumber = args.vatNumber;

    const org = await this.persist(
      transactionalEntityManager,
      organization,
      currentUser,
    );

    await this.documentNumberingService.save(
      transactionalEntityManager,
      args.currentInvoiceDocumentNumber,
      currentUser,
      org,
    );

    return org;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<OrganizationModel> {
    return transactionalEntityManager.getRepository(Organization);
  }

  getOrg = (
    transactionalEntityManager: EntityManager,
    displayName: string,
    relations?: string[],
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
      relations,
    });
}
