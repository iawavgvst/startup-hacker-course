<template>
    <div id="app">
        <header class="s-header">
            <nav class="s-header-nav">
                <router-link to="/" class="s-header-nav_link">
                    Главная
                </router-link>
                <router-link to="/start" class="s-header-nav_link" v-if="$route.name === 'game'">
                    Вернуться к игре
                </router-link>
            </nav>
            <h1 class="s-header-title">MEMORY</h1>
        </header>
        <main class="s-main">
            <router-view />
        </main>
        <SFooter class="s-footer">
            <p class="s-footer-content">Игра MEMORY © 2026 | Найди все пары карточек</p>
        </SFooter>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { SFooter } from 'startup-ui'

const route = useRoute()
</script>

<style scoped>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
}

.s-header {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .s-header-nav {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;

        .s-header-nav_link {
            color: darkslateblue;
            text-decoration: none;
            font-weight: 400;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(102, 126, 234, 0.1);
            }

            &.router-link-active {
                background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
                color: white;
            }
        }
    }

    .s-header-title {
        color: #333;
        margin: 0;
        font-size: 2.5rem;
        text-align: center;
    }
}

.s-main {
    flex: 1;
    padding: 30px;
}

.s-footer {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    padding: 20px;
    font-size: 1rem;

    .s-footer-content {
        margin: 0;
    }
}

@media (max-width: 768px) {
    .s-header {
        padding: 15px;

        .s-header-title {
            font-size: 2rem;
        }

        .s-header-nav {
            justify-content: center;
            gap: 10px;

            .s-header-nav_link {
                padding: 6px 12px;
                font-size: 0.9rem;
            }
        }
    }

    .s-main {
        padding: 15px;
    }
}
</style>