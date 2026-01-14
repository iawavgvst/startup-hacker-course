<template>
    <div class="book-form-overlay" v-if="isVisible" @click.self="closeForm">
        <div class="book-form-container">
            <div class="form-header">
                <h2>Add New Book</h2>
                <button class="close-btn" @click="closeForm">×</button>
            </div>
        <form @submit.prevent="submitForm" class="book-form">
            <div class="form-group">
                <label for="title">Book Title</label>
                <input type="text" id="title" v-model="formData.title" placeholder="Enter book title"/>
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author" v-model="formData.author" placeholder="Enter author name"/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="formData.description" placeholder="Enter book description">
                </textarea>
            </div>
            <div class="form-group">
                <label for="genre">Genre</label>
                <select id="genre" v-model="formData.genre">
                    <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="cover">Cover of Book</label>
                <input type="text" id="cover" v-model="formData.cover" placeholder="Enter image URL for book cover"/>
            </div>
            <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.is18Plus" class="checkbox"/>
                      <span class="checkbox-custom"></span>
                      <span class="checkbox-text">There's an age warning (18+)</span>
                  </label>
            </div>
            <div class="form-actions">
                  <button type="button" class="btn btn-cancel" @click="cancel">Cancel</button>
                  <button type="submit" class="btn btn-submit" @click="resetForm">Add Book</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import {ref, watch, defineEmits, defineProps} from 'vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['add-book', 'close']);

const formData = ref({
    title: '',
    author: '',
    description: '',
    genre: '',
    cover: '',
    is18Plus: false
});

const genres = [
    "Detective",
    "Sci-fi",
    "Historical fiction",
    "Dystopia",
    "Fantasy",
    "Romance novel",
    "Short stories ",
    "Horror",
    "Classic",
    "Fairy tale",
    "Memoir",
    "Biography и Autobiography",
    "Essay",
    "Travel writing",
    "Science writing",
    "How-to books",
    "True crime",
    "Drama",
    "Romantic novel",
    "Science fiction",
];

const submitForm = () => {
    const newBook = {
        id: Date.now(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        genre: formData.genre,
        cover: formData.cover.trim(),
        is18Plus: formData.is18Plus,
    };

    emit('add-book', newBook);

    resetForm();
};

const resetForm = () => {
    formData.value.title = '';
    formData.value.author = '';
    formData.value.description = '';
    formData.value.genre = '';
    formData.value.cover = '';
    formData.value.is18Plus = false;
};

const cancel = () => {
  resetForm()
  emit('close')
}

const closeForm = () => {
    emit('close');
};

watch(() => props.isVisible, (newVal) => {
    if (!newVal) {
        resetForm();
    }
});
</script>

<style scoped>
.book-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.book-form-container {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    animation: slideIn 0.3s ease;
}

.form-header {
    position: relative;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    border-radius: 12px 12px 0 0;
}

h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
}

.close-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.close-btn:hover {
    background-color: #e0e0e0;
    color: #333;
}

.book-form {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-group input[type="text"],
.form-group select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    font-family: "Tahoma", "Arial", "Arabic Transparent",sans-serif;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #005bb5;
    box-shadow: 0 0 0 2px rgba(0, 91, 181, 0.2);
}

.form-group textarea {
    resize: vertical;
    min-height: 75px;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    font-family: "Tahoma", "Arial", "Arabic Transparent",sans-serif;
}

.cover-preview p {
    margin-bottom: 5px;
    font-size: 0.875rem;
    color: #666;
}

.cover-preview img {
    max-width: 100px;
    max-height: 150px;
    border-radius: 4px;
    border: 1px solid #ddd;
    object-fit: cover;
}

.checkbox-group {
  margin-top: 25px;
}

.checkbox {
    position: relative;
    display: inline-block;
    margin: auto;
}

.checkbox-custom {
    border-radius: 8px;
    position: relative;
    align-items: center;
    vertical-align: center;
    display: inline-block;
    padding: 10px 1px;
}

.checkbox-text {
    font-size: 15px;
    color: #333;
    font-family: "Tahoma", "Arial", "Arabic Transparent",sans-serif;
    padding: 10px 10px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
}

.btn {
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 100px;
    background-color: #f8f9fa;
    border: 1px solid #005bb5;
    color: #005bb5;
}

.btn-cancel {
    background-color: #f8f9fa;
    color: #666;
    border: 1px solid grey;
}

.btn-cancel:hover {
    background-color: #e9ecef;
}

.btn-submit:hover {
    background-color: #9ab5ec;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 91, 181, 0.3);
}

.btn-submit:active {
    transform: translateY(0);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    .book-form-container {
        width: 95%;
        margin: 10px;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}
</style>