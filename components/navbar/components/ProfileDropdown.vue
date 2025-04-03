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
        </VaDropdown>
    </div>
</template>

<script setup lang="ts">
const isShown = useState('isShown', () => false);
</script>