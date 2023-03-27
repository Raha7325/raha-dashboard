<template>
  <div id="app">
    <div v-if="error">
      {{ error }}
    </div>
  
    <form id="form" submit="handleSubmit" v-else>
      <h3>Restaurants</h3>
      <br>
  
      <label for="name">Name</label>
      <input id="name" v-model="modifiedData.name" type="text" name="name">
  
      <label for="description">Description</label>
      <input id="description" v-model="modifiedData.description" type="text" name="description">
      <div>
        <br />
        <b>Select categories</b>
        <br>
        <div v-for="category in Categories" :key="category.id">
          
          <label>{{ category.attributes.name }}</label>
          <input
            type="checkbox"
            :value="category.id"
            v-model="modifiedData.categories"
            name="categories"
            :id="category.id"
          />
        </div>
      </div>
      <br>
  
      <input type="submit" value="Submit">
    </form>
  
  </div>
  </template>
  
  <script lang="ts">
  import { CategoriesService, RestaurantService } from '../service';
  export default {
    name: 'App',
    data() {
      return {
        Categories: [],
        modifiedData: {
          name: '',
          description: '',
          categories: [],
        },
        error: null,
        headers: {'Content-Type': 'application/json'}
      }
    },
    async mounted() {
        const allCategories = await CategoriesService.getList();
        this.Categories = allCategories.body;
        console.log(allCategories)
        const allRestaurants = await RestaurantService.getList();
        console.log(allRestaurants)
    },
    methods: {
      async handleSubmit() {
    
        const sendData = await RestaurantService.sendData()
        console.log(sendData)
    }
  }
  }
  </script>