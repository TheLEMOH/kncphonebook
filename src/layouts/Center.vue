<template>
    <div class="center">
        <div class="page">
            <router-view v-slot="{ Component }">
                <Suspense>
                    <template #default>
                        <component :is="Component" />
                    </template>
                    <template #fallback>
                        ...Загрузка
                    </template>
                </Suspense>
            </router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.center {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 1000px;

}

.page {
    padding-top: 1rem;
}
</style>