<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { SalesInvoicesQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import SalesInvoiceList from '../components/sales-invoices/SalesInvoiceList.svelte';
    import { getError } from '../lib/util';
    import { urls } from './pathAndSegment';
    import { EVERYTHING } from '../lib/queries/salesInvoices';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.salesInvoices.list);
    setClient(client);
    const salesInvoices = query<SalesInvoicesQuery, any>(EVERYTHING);
</script>

<Page
    title={$_('page.salesInvoices.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices"
>
    <span slot="content">
        {#if $salesInvoices.loading}
            {$_('status.loading')}
        {:else if $salesInvoices.error}
            {$_('status.error')} {getError($salesInvoices.error)}
        {:else}
            <SalesInvoiceList salesInvoices={$salesInvoices.data?.salesInvoices} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.salesInvoices.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.salesInvoices.add.title')}</a
        >
        <a
            href="#/{urls.salesInvoices.monthly.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.salesInvoices.monthly.add.title')}</a
        >
    </span>
</Page>
