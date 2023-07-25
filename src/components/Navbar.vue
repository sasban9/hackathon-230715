<template>
 <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/">TAILOR APP</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item to="/orders">Orders</b-nav-item>
        <b-nav-item to="/logout">Logout</b-nav-item>
       
       
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
   </template>
  <style scoped>
 .router-link-exact-active,.nav-link:hover {
  
    
      cursor: pointer;
      background-color: #DDE6ED;
      color:#27374D;
     
    }
    
</style>
  