<template>
    <VaLayout>
        <slot />
    </VaLayout>
</template>

<script setup lang="ts">
    import { onBeforeUnmount } from 'vue';

    // const globalStore = useGlobalStore();
    // const { isSidebarMinimized } = globalStore.isSidebarMinimized;

    // const onSidebarButtonClick = () => {
    //     globalStore.toggleSidebar();
    // };

    onBeforeUnmount(() => {
        // Cleanup logic if needed
    });

</script>