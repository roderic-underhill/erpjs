<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { OrganizationsQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import { getError } from '../lib/util';
    import OrganizationList from '../components/organizations/OrganizationList.svelte';
    import { urls } from './pathAndSegment';
    import { ORGANIZATIONS } from '../lib/queries/organizations';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.organizations.list);
    setClient(client);
    const organizations = query<OrganizationsQuery, any>(ORGANIZATIONS);
</script>

<Page
    title={$_('page.organizations.title')}
    segment={segments.organizations}
    name="page.organizations"
>
    <span slot="content">
        {#if $organizations.loading}
            {$_('status.loading')}
        {:else if $organizations.error}
            {$_('status.error')} {getError($organizations.error)}
        {:else}
            <OrganizationList organizations={$organizations.data?.organizations} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.organizations.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.organizations.add.title')}</a
        >
    </span>
</Page>
