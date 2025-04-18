<template>
    <div class="profile-dropdown-wrapper">
        <VaDropdown v-model="isShown" :offset="[9, 0]" class="profile-dropdown" stick-to-edges>
            <template #anchor>
                <VaButton preset="secondary" color="textPrimary">
                    <span class="profile-dropdown__anchor min-w-max">
                        <slot />
                        <VaAvatar :size="32" color="warning">
                            :)
                        </VaAvatar>
                    </span>
                </VaButton>
            </template>
            <VaDropdownContent 
            class="profile-dropdown__content md:w-60 px-0 py-4 w-full"
                :style="{ '--hover-color': hoverColor }">
                <VaList v-for="group in options" :key="group.name">
                    <header 
                    v-if="group.name"
                        class="uppercase text-[var(--va-secondary)] opacity-80 font-bold text-xs px-4">
                        {{ group.name }}
                    </header>
                    <VaListItem
                    v-for="item in group.list"
                    :key="item.name"
                    class="menu-item px-4 text-base cursor-pointer h-8"
                    v-bind="resolveLink(item)">
                    <VaIcon :name="item.icon" class="pr-1" color="secondary" />
                        {{  item.name }}
                    
                    </VaListItem>
                    <VaSeparator v-if="group.separator" class="mx-3 my-2" />
                </VaList>
            </VaDropdownContent>
        </VaDropdown>
    </div>
</template>

<script setup lang="ts">
import { useColors } from 'vuestic-ui';

const { colors, setHSLAColor } = useColors();
const hoverColor = computed(() => setHSLAColor(colors.focus, { a: 0.1 }))
const isShownState = useState('isShown', () => false);
const isShown = isShownState.value;

type ProfileListItem = {
    name: string;
    to?: string;
    href?: string;
    icon: string;
}

type ProfileOptions = {
    name: string;
    separator: boolean;
    list: ProfileListItem[];
}

withDefaults(
    defineProps<{
        options?: ProfileOptions[];
    }>(),
    {
        options: () => [
            {
                name: 'account',
                separator: true,
                list: [
                    {
                        name: 'profile',
                        to: '',
                        icon: 'mso-account_circle',
                    },
                    {
                        name: 'settings',
                        to: '',
                        icon: 'mso-settings',
                    },
                ],
            },
            {
                name: '',
                separator: false,
                list: [

                    {
                        name: 'logout',
                        to: '',
                        icon: 'mso-logout',
                    },
                ],
            },
        ]
    }
);

const resolveLink = (item: ProfileListItem) => {
    return item.to ? { to: { name: item.to } } : item.href ? { href: item.href, target: '_blank' } : {};
};
</script>