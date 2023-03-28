<template>
  <div id="app">
    <div v-if="error">
      {{ error }}
    </div>
  
    <form id="form" @submit.prevent="handleSubmit" v-else>
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
  import { CategoriesService, RestaurantService, FavoriteService, PostService } from '../service';
import { Dispatch } from '../service/service';
  interface MyData extends Partial<Dispatch> {
  name: string;
  description: string;
  categories: Array<object>;
}
  export default {
    name: 'App',
    data() {
      return {
        Categories: [],
        modifiedData: {
          name: '',
          description: '',
          categories: [],
        }as MyData,
        error: null,
        headers: {'Content-Type': 'application/json'}
      }
    },
    async mounted() {
        const allCategories = await CategoriesService.getList();
        this.Categories = allCategories.body;
        // const allRestaurants = await RestaurantService.getList();
        // const posts = await PostService.getList();
        // console.log(posts)
        // const createPost = await RestaurantService.sendData()
        
    },
    methods: {
      
      async handleSubmit() {
        const favorites = await FavoriteService.getList();
        console.log("favorites", favorites)
        try {
          const res = await RestaurantService.sendData({payload: this.modifiedData});
          if(res.ok) {
            console.log(res)
          }else {
            console.log('error')
          }
        } catch (error: any) {
          console.error(error);
          this.error = error.message;
        }
      }
    }
  }
  </script>
