<template>
  <div id="app">
    <div v-if="error">
      {{ error }}
    </div>
  
    <form id="form" v-on:submit="handleSubmit" v-else>
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
        <div v-for="category in allCategories.data" :key="category.id">
          {{ category.attributes.name  }}
          <!-- <label>{{ category }}</label> -->
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
  import services from 
  export default {
    name: 'App',
    data() {
      return {
        allCategories: [],
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
      try {
        const allCategories = await services({
            method: 'GET',
            headers: this.headers,
          }).then(this.checkStatus)
            .then(this.parseJSON);
            this.allCategories = allCategories
      } catch (error) {
        this.error = error
      };
    },
    methods: {
      parseJSON: function (resp) {
        return (resp.json ? resp.json() : resp);
      },
      checkStatus: function (resp) {
        if (resp.status >= 200 && resp.status < 300) {
          return resp;
        }
        return this.parseJSON(resp).then((resp) => {
          throw resp;
        });
      },
      handleSubmit: async function(e) {
        e.preventDefault();
  
        try {
          const response = await fetch('http://localhost:1337/api/restaurants', {
              method: 'POST',
              headers: this.headers,
              body: JSON.stringify(this.modifiedData)
            }).then(this.checkStatus)
              .then(this.parseJSON);
              console.log(response);
        } catch (error) {
          this.error = error
        }
      }
    }
  }
  </script>