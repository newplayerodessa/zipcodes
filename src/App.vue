<template>
  <header>
    <nav class="nav">
      <router-link active-class="logo-active" class="nav__logo" to="/">Logo</router-link>
      <div class="flex font-sm space-x-2">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/zips">Zip Codes</router-link>
      </div>
    </nav>
  </header>
  <div class="max-w-2xl mx-auto px-4 pt-5">
    <router-view/>
  </div>
</template>





