<template>
  <VaSidebar :width="sidebarWidth" :color="color" minimized-width="0">
    <VaAccordion v-model="value" multiple>
      <VaCollapse v-for="(r, index) in navigationRoutes.routes" :key="index">
        <template #header="{ value: isCollapsed }">
          <VaSidebarItem 
            :to="r.children ? undefined : { name: route.name }" :active="routeHasActiveChild(r)"
            :active-color="activeColor" :text-color="textColor(r)"
            :aria-label="`${r.children ? 'Open category ' : 'Visit'} ${r.displayName}`" role="button"
            hover-opacity="0.10">
            <VaSidebarItemContent class="py-3 pr-2 pl-4">
              <VaIcon 
                v-if="r.meta.icon" aria-hidden="true" :name="r.meta.icon" size="20px"
                :color="iconColor(r)" />
              <VaSidebarItemTitle class="flex justify-between items-center leading-5 font-semibold">
                {{ r.displayName }}
                <VaIcon v-if="r.children" :name="arrowDirection(isCollapsed)" size="20px" />
              </VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </template>
        <template #body>
          <div v-for="(childRoute, index2) in r.children" :key="index2">
            <VaSidebarItem 
              :to="{ name: childRoute.name }" :active="isActiveChildRoute(childRoute)"
              :active-color="activeColor" :text-color="textColor(childRoute)"
              :aria-label="`Visit ${r.displayName}`" hover-opacity="0.10">
              <VaSidebarItemContent class="py-3 pr-2 pl-11">
                <VaSidebarItemTitle class="leading-5 font-semibold">
                  {{ childRoute.displayName }}
                </VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </div>
        </template>
      </VaCollapse>
    </VaAccordion>
  </VaSidebar>
</template>
<script lang="ts" setup>
import { useColors } from 'vuestic-ui'
import navigationRoutes, { type INavigationRoute } from './routes'

const props = withDefaults(defineProps<{
  visible?: boolean
  mobile?: boolean
}>(), {
  visible: true,
  mobile: false,
})

const { getColor, colorToRgba } = useColors()
const route = useRoute()

const isActiveChildRoute = (child: INavigationRoute) => route.name === child.name

const routeHasActiveChild = (section: INavigationRoute) => {
  if (!section.children) {
    return route.path.endsWith(`${section.name}`)
  }

  return section.children.some(({ name }) => route.path.endsWith(`${name}`))
}

const value = useState('value', (): boolean[] => [])

const setActiveExpand = () =>
  (value.value = navigationRoutes.routes.map((route: INavigationRoute) => routeHasActiveChild(route)))

const sidebarWidth = computed(() => (props.mobile ? '100vw' : '280px'))
const color = computed(() => getColor('background-secondary'))
const activeColor = computed(() => colorToRgba(getColor('focus'), 0.1))

const iconColor = (route: INavigationRoute) => (routeHasActiveChild(route) ? 'primary' : 'secondary')
const textColor = (route: INavigationRoute) => (routeHasActiveChild(route) ? 'primary' : 'textPrimary')
const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down')

watch(() => route.fullPath, setActiveExpand, { immediate: true })
</script>