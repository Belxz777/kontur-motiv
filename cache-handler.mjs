// cache-handler.js
module.exports = class CustomCache {
  constructor() {
    this.cache = new Map()
  }
  async get(key) { return this.cache.get(key) }
  async set(key, value) { this.cache.set(key, value) }
}