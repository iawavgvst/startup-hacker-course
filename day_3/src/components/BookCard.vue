<template>
    <div class="book-card">
        <div class="card-content">
        <h2>{{ book.title }}</h2>
            <p><strong>Author: </strong>{{ book.author }}</p>
            <p><strong>Description: </strong>{{ book.description }}</p>
            <p><strong>Genre: </strong> {{ book.genre }}</p>
                <div class="interactive-stars-container">
                    <strong>Rating: </strong>
                <div class="stars-wrapper">
                    <div v-for="star in 5"
                        :key="star"
                        class="star"
                        :class="{
                        'active': star <= currentRating,
                        'inactive': star > currentRating,
                        'clickable': !ratingLocked
                      }"
                        @click="setRating(star)">{{ star <= currentRating ? '⭐' : '☆' }}
                    </div>
                </div>
                    <span class="rating-value">{{ currentRating.toFixed(1) }}</span>
                    <span v-if="ratingLocked" class="rating-locked">✓</span>
                </div>
                    <p><strong>There's an age warning (18+): </strong> {{ book.is18Plus }}</p>
                </div>
                <div class="cover-container">
        <div class="cover-image-wrapper">
            <img :src="book.cover" alt="Book Title" class="book-cover"/>
        <div class="cover-star" :class="{ 'has-rating': hasRating > 0 }">
            {{ hasRating > 0 ? '⭐' : '☆' }}
            <span class="cover-rating-value">
              {{ hasRating > 0 ? currentRating.toFixed(1) : '—' }}
            </span>
        </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import {ref, defineProps, computed, onMounted} from 'vue';

const props = defineProps({
    book: Object,
});

//  захотелось вместо звездочек сделать фазы солнца, чтобы было цветное
// const renderStars = (ranking) => {
//   const fullStars = Math.floor(ranking);
//   const halfStar = ranking % 1 >= 0.5;
//   let stars = '';
//
//   for (let i = 0; i < fullStars; i++) {
//     stars += '🌕';
//   }
//
//   if (halfStar) {
//     stars += '🌗';
//   }
//
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
//   for (let i = 0; i < emptyStars; i++) {
//     stars += '🌑';
//   }
//
//   return stars;
// };

const currentRating = ref(props.book.ranking || 0);
const ratingLocked = ref(false);

const hasRating = computed(() => {
    return currentRating.value > 0;
});

const setRating = (rating) => {
    if (!ratingLocked.value) {
        currentRating.value = rating;
        ratingLocked.value = true;
    }
};

onMounted(() => {
    if (props.book.ranking > 0) {
        ratingLocked.value = true;
    }
});
</script>

<style scoped>
.book-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    margin: 5px 10px;
    width: 255px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
}

.card-content {
    flex: 1;
    margin: 0;
}

img {
     width: 155px;
     height: 230px;
     border-radius: 8px;
     align-items: flex-end;
     object-fit: cover;
 }

.interactive-stars-container {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
}

.stars-wrapper {
    display: flex;
    gap: 10px;
}

.star {
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.star.clickable:hover {
    transform: scale(1.2);
    background-color: rgba(255, 204, 0, 0.1);
}

.star.active {
    color: #FFCC00;
    text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
}

.star.inactive {
    color: #CCCCCC;
}

.rating-value {
    font-weight: bold;
    color: #333;
    font-size: 15px;
    min-width: 15px;
}

.rating-locked {
    color: darkgreen;
    font-weight: bold;
    font-size: 15px;
}

.cover-container {
    margin: 10px 45px;
}

.cover-image-wrapper {
    position: relative;
    display: inline-block;
    width: 155px;
    height: 230px;
}

.book-cover {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    display: block;
}

.cover-star {
    position: absolute;
    top: -18px;
    left: -23px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    z-index: 10;
}

.cover-star:not(.has-rating) {
    background-color: transparent;
    color: #666666;
}

.cover-star.has-rating {
    background-color: transparent;
    border: none;
}

.cover-rating-value {
    position: absolute;
    bottom: -5px;
    right: -5px;
    background: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #FFCC00;
    color: #333;
    z-index: 11;
}

.cover-star:not(.has-rating) .cover-rating-value {
    border-color: #CCCCCC;
    color: #666666;
}
</style>