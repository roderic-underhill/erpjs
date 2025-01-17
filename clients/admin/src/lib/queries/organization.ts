import gql from 'graphql-tag';

export const SAVE_ORGANIZATION = gql`
    mutation SaveOrganization(
        $id: Int
        $displayName: String!
        $contact: String!
        $legalName: String!
        $registration: String!
        $idNumber: String!
        $vatNumber: String
        $accountingSchemeId: Int!
        $currentInvoiceDocumentNumber: Float!
        $newBankAccount: BankAccountSaveArgs!
        $legalAddress: AddressSaveArgs!
    ) {
        saveOrganization(
            args: {
                id: $id
                displayName: $displayName
                contact: $contact
                legalName: $legalName
                registration: $registration
                idNumber: $idNumber
                vatNumber: $vatNumber
                accountingSchemeId: $accountingSchemeId
                currentInvoiceDocumentNumber: $currentInvoiceDocumentNumber
                newBankAccount: $newBankAccount
                legalAddress: $legalAddress
            }
        ) {
            id
        }
    }
`;
