import axios from "axios";

const BASE_URL = "https://api.unsplash.com";
const API_KEY = "CgjQ6jMwBqIw2C99jgVD0r4PPfoQJZq7sMxHaAXriI0";

export default class GalleryApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const OPTIONS = new URLSearchParams({
      client_id: API_KEY,
      query: this.searchQuery,
      page: this.page,
      per_page: 12,
      orientation: "landscape",
    });

    const response = await axios.get(
      `${BASE_URL}/search/photos?${OPTIONS.toString()}`
    );
    this.incrementPage();
    return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
