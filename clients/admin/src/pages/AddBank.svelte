<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.accountingSchemes.add);
    setClient(client);
</script>

<Page
    title={$_('page.accountingSchemes.add.title')}
    segment={segments.accountingSchemes}
    name="page.accountingSchemes.add.title"
>
    <span slot="content">
        <AddOrEditAccountingScheme accountingScheme={undefined} />
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
