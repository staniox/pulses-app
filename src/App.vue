<template>

  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
    <router-view/>
  </div>
</template>

<style>
*{
  box-sizing: border-box;

}
:focus {
  outline: 0 !important;
  opacity: 0.8;
}
#app {
  background-color: #d9d9d9;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.table-borderless td, .table-borderless th, .table-borderless tr {
  border: none !important;
  outline: 0 !important;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table {
  border-collapse: separate;
  border-spacing: 0 20px;
}

table tr {
  background-color: #d9d9d9;
  text-align: center;
}

td {
  background-color: #d9d9d9;
  margin: 0 auto;
  padding: 4px 2px !important;
}

.td-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /*background: white;*/
  padding: 15px 20px;
}


</style>
