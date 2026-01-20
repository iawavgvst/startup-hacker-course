<template>
    <div class="app">
        <nav class="navbar">
            <div class="nav-container">
                <h1 class="nav-title">Through The Worlds</h1>
                <div class="nav-links">
                    <router-link to="/" class="nav-link" active-class="active">
                        Home Page
                    </router-link>
                    <router-link to="/about" class="nav-link" active-class="active">
                        About Us
                    </router-link>
                </div>
            </div>
        </nav>
        <div class="page-container">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style scoped>
.app {
    margin: auto;
    padding: 0;
    height: 100%;
    width: 100%;
}

.navbar {
    background: linear-gradient(135deg, darkblue 0%, midnightblue 100%);
    padding: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
}

.nav-container {
    max-width: 1350px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

.nav-title {
    font-size: 28px;
    margin: 0;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.nav-links {
    display: flex;
    gap: 5px;
}

.nav-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
}

.page-container {
  padding: 0;
  margin: 0;
}
</style>
