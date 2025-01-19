<template>
  <div class="container mx-auto p-4 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-extrabold mb-6 text-green-800">
      Funny Facts from News Articles
    </h1>
    <div class="mb-4">
      <label for="numArticles" class="block text-green-700 font-bold mb-2"
        >Number of Articles:</label
      >
      <input
        id="numArticles"
        v-model="numArticles"
        type="number"
        min="1"
        class="border border-green-500 rounded p-2 w-full"
      />
    </div>
    <div class="mb-4">
      <label for="numFacts" class="block text-green-700 font-bold mb-2"
        >Number of Facts per Article:</label
      >
      <input
        id="numFacts"
        v-model="numFacts"
        type="number"
        min="1"
        class="border border-green-500 rounded p-2 w-full"
      />
    </div>
    <button
      @click="fetchArticles"
      class="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
    >
      Fetch Articles
    </button>
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center text-green-700"
    >
      <div class="spinner"></div>
      Loading...
    </div>
    <div v-else>
      <div
        v-for="article in articles"
        :key="article.title"
        class="article-container border border-green-500"
      >
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="bg-green-100 mb-4">
          <strong>Funny Fact:</strong> {{ article.funnyFacts }}
        </p>
        <p class="article-content">
          <strong>Source:</strong> {{ article.source }}
        </p>
        <p class="article-content">
          <strong>Publication Date:</strong> {{ article.publicationDate }}
        </p>
        <a
          :href="article.originalLink"
          target="_blank"
          class="text-green-500 underline"
          >Read more</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      loading: true,
      numArticles: 1,
      numFacts: 1,
    };
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/articles", {
          params: {
            numArticles: this.numArticles || 1,
            numFacts: this.numFacts || 1,
          },
        });
        this.articles = response.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchArticles();
  },
};
</script>

<style>
.article-container {
  @apply bg-white shadow-md rounded-lg p-6 mb-4 border border-green-500;
}

.article-title {
  @apply text-xl font-bold mb-2 text-green-700;
}

.article-content {
  @apply text-gray-700 mb-4;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4caf50;
  width: 36px;
  border-radius: 50%;
  height: 36px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
