<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getBankBy } from '../lib/bank';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.banks.edit + +id);
    setClient(client);

    const bank = getBankBy(id);
</script>

<Page title={$_('page.banks.edit.title')} segment={segments.banks} name="page.banks.edit">
    <span slot="content">
        {#if $bank.loading}
            {$_('status.loading')}
        {:else if $bank.error}
            {$_('status.error')} {getError($bank.error)}
        {:else if $bank?.data?.bank}
            <AddOrEditBank bank={$bank?.data?.bank} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
