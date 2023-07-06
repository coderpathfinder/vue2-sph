<template>
  <div>
    <h2>{{$route.params.keyword}}</h2>
    <h2>{{$route.query.kw}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keyword: ''
    }
  }
}
</script>

<style scoped lang="less">

</style>