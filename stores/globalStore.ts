export const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            isSidebarMinimized: false,
        }
    },
    actions: {
        toggleSidebar() {
            this.isSidebarMinimized = !this.isSidebarMinimized;
        },
        set(val: boolean) {
            this.isSidebarMinimized = val;
        }
    }
});