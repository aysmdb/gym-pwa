<template>
    <VaLayout>
        <template #top>
            <AppNavbar :is-mobile="isMobile" />
        </template>
        <template #content>
            <div :class="{ minimized: isSidebarMinimized }" class="app-layout__sidebar-wrapper">
                <div v-if="isFullScreenSidebar" class="flex justify-end">
                    <VaButton class="px-4 py-4" icon="md_close" preset="plain" @click="onCloseSidebarButtonClick" />
                </div>
            </div>
            <!-- <AppLayoutNavigation v-if="!isMobile" class="p-4" /> -->
            <main class="p-4 pt-0">
                <article>
                    <slot />
                </article>
            </main>
        </template>

    </VaLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useBreakpoint } from 'vuestic-ui'

import AppNavbar from '../components/navbar/AppNavbar.vue'

const GlobalStore = useGlobalStore()

const breakpoints = useBreakpoint()

const sidebarWidth = useState('sidebarWidth', () => '16rem')
const sidebarMinimizedWidth = useState('sidebarMinimizedWidth', undefined)

const isMobile = useState('isMobile', () => false)
const isTablet = useState('isTablet', () => false)
const isSidebarMinimized = GlobalStore.isSidebarMinimized

const onResize = () => {
    GlobalStore.set(breakpoints.mdDown);
    isMobile.value = breakpoints.smDown
    isTablet.value = breakpoints.mdDown
    sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem'
    sidebarWidth.value = isTablet.value ? '100%' : '16rem'
}

onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

onBeforeRouteUpdate(() => {
    if (breakpoints.mdDown) {
        // Collapse sidebar after route change for Mobile
        GlobalStore.set(true);
    }
})

const isFullScreenSidebar = computed(() => isTablet.value && !isSidebarMinimized)

const onCloseSidebarButtonClick = () => {
    GlobalStore.set(true);
}
</script>

<style lang="scss" scoped>
// Prevent icon jump on animation
.va-sidebar {
    width: unset !important;
    min-width: unset !important;
}
</style>