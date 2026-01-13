<template>
  <div class="book-card">
    <div class="card-content">
      <h2>{{ book.title }}</h2>
      <p><strong>Author: </strong>{{ book.author }}</p>
      <p><strong>Description: </strong>{{ book.description }}</p>
      <p><strong>Genre: </strong> {{ book.genre }}</p>
      <p><strong>Ranking: </strong><span class="ranking">{{ renderStars(book.ranking) }}</span></p>
      <p><strong>There's an age warning (18+): </strong> {{ book.is18Plus }}</p>
    </div>
    <img :src="book.cover" alt="Book Title"/>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  book: Object,
});

//  захотелось вместо звездочек сделать фазы солнца, чтобы было цветное
const renderStars = (ranking) => {
  const fullStars = Math.floor(ranking);
  const halfStar = ranking % 1 >= 0.5;
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += '🌕';
  }

  if (halfStar) {
    stars += '🌗';
  }

  const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '🌑';
  }

  return stars;
};
</script>

<style scoped>
.book-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  margin: 5px;
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
  margin: 10px 45px 10px 45px;
  border-radius: 8px;
  align-items: flex-end;
  object-fit: cover;
}
</style>