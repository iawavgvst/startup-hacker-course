<template>
    <div class="app">
      <!--<FontAwesomeIcon icon="star" />-->
        <div class="btn-container">
            <h1>Books List</h1>
            <button class="btn" @click="openBookForm">ADD</button>
        </div>
        <div class="book-container">
            <BookCard
                v-for="book in books"
                :key="book.id"
                :book="book"
                @update="updateBook"
                @delete="deleteBook"
            />
        </div>
        <Dialog
            v-if="showBookForm"
            @close="closeBookForm">
                <template #title>
                  <h2 style="color: darkred;">{{ addNewBook ? 'Add New Book' : 'BYEEE'}}</h2>
                </template>
                <BookForm
                    :is-visible="showBookForm"
                    @add-book="addNewBook"
                    @close="closeBookForm"
                />
        </Dialog>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import BookCard from './components/BookCard.vue';
import BookForm from './components/BookForm.vue';
import Dialog from './components/Dialog.vue';

const showBookForm = ref(false);
const openBookForm = () => {
    showBookForm.value = true;
};

const closeBookForm = () => {
    showBookForm.value = false;
};

const addNewBook = (newBook) => {
    books.value.push(newBook);
};

const updateBook = (updatedBook) => {
  const index = books.value.findIndex(book => book.id === updatedBook.id);
  if (index !== -1) {
    books.value[index] = updatedBook;
  }
};

const deleteBook = (bookId) => {
  const index = books.value.findIndex(book => book.id === bookId);
  if (index !== -1) {
    books.value.splice(index, 1);
  }
};

const books = ref([
    {
        id: 1,
        title: "It",
        author: "Stephen King",
        description: "The story follows seven children as they are terrorized by an evil entity called It, which exploits the fears of its victims to disguise itself while hunting its prey. It is a monstrous, shapeshifting predator that primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children. The story is told through a nonlinear narrative.",
        genre: "Horror",
        cover: "https://i.pinimg.com/originals/e1/20/f5/e120f54d54d968386791fef37e1309fa.jpg",
        is18Plus: true,
        ranking: 4.6
    },
    {
        id: 2,
        title: "The Mist",
        author: "Stephen King",
        description: "In the story, the small town of Bridgton, Maine is shrouded in a dense mist that conceals otherworldly creatures. The protagonist and narrator David Drayton, who has taken refuge with his young son in a supermarket, tries to survive against not only the creatures of the mist, but also fanatical aggression from other survivors.",
        genre: "Psychological horror",
        cover: "https://i.pinimg.com/originals/e0/00/79/e00079ff4066fc25344ce774164e9c43.jpg",
        is18Plus: true,
        ranking: 0
    },
    {
        id: 3,
        title: "Flowers for Algernon",
        author: "Daniel Keyes",
        description: "Algernon is a laboratory mouse who has undergone surgery to increase his intelligence. The story is told by a series of progress reports written by Charlie Gordon, the first human subject for the surgery, and it touches on ethical and moral themes such as the treatment of the mentally disabled. The novel was joint winner of that year's Nebula Award for Best Novel ",
        genre: "Science fiction",
        cover: "https://routenote-push.s3.eu-west-2.amazonaws.com/448117/dd28cd35-4e58-42cd-bfc3-9df53f4fab91",
        is18Plus: false,
        ranking: 4.6
    },
    {
        id: 4,
        title: "Doctor Zhivago",
        author: "Boris Pasternak",
        description: "The novel is named after its protagonist, Yuri Zhivago, a physician and poet, and takes place between the Russian Revolution of 1905 and World War II. The manuscript was smuggled to Milan and published in 1957. Pasternak was awarded the Nobel Prize for Literature, an event that embarrassed and enraged the Communist Party of the Soviet Union.",
        genre: "Romantic novel",
        cover: "https://baneslibraries.co.uk/wp-content/uploads/2024/04/Doctor-Zhivago-by-Boris-Pasternak.png",
        is18Plus: false,
        ranking: 4.1
    },
    {
        id: 5,
        title: "Martin Eden",
        author: "Jack London",
        description: "This novel is about a young proletarian autodidact struggling to become a writer. Eden represents writers' frustration with publishers. The central theme of Eden's developing artistic sensibilities places the novel in the tradition of the Künstlerroman, which narrates an artist's formation and development. He feels that people value him only for his fame.",
        genre: "Drama",
        cover: "https://spblib.ru/en/catalog?p_p_id=ru_spb_iac_esbo_portal_catalog_CatalogPortlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2Fcover&p_p_cacheability=cacheLevelPage&_ru_spb_iac_esbo_portal_catalog_CatalogPortlet_url=http%3A%2F%2Fftp.libs.spb.ru%2Fcovers%2Fimages%2Fcover_ukr802_2019-12-20_18-30-58.jpg&_ru_spb_iac_esbo_portal_catalog_CatalogPortlet_mvcRenderCommandName=%2Fpublication&_ru_spb_iac_esbo_portal_catalog_CatalogPortlet_publicationId=12316890&_ru_spb_iac_esbo_portal_catalog_CatalogPortlet_slug=ulysses",
        is18Plus: false,
        ranking: 0
    }
]);
</script>

<style scoped>
.app {
    padding: 0;
}

h1 {
    font-size: 60px;
    margin-top: 13px;
    margin-bottom: 13px;
    text-align: center;
    text-transform: uppercase;
    color: black;
}

h2 {
    font-size: 25px;
    margin-top: 13px;
    margin-bottom: 13px;
    text-align: left;
    text-transform: uppercase;
    color: darkblue;
    font-style: italic;
}

.btn-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.book-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.btn {
    padding: 10px 16px;
    margin: 13px 15px 13px 15px;
    font-size: 0.7rem;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #005bb5;
    color: #005bb5;
    font-weight: 500;
    min-width: 35px;
}

.btn:hover {
    background-color: #9ab5ec;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 91, 181, 0.3);
}

.btn:active {
    transform: translateY(0);
}
</style>
