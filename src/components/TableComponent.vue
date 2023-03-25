<template>
  <div class="max-w-md">
    <div class="flex border overflow-hidden">
      <input
          v-model="currZip"
          @input="filterNonNumeric"
          :maxlength="maxLength"
          type="text"
          class="text-sm w-full px-4 py-1"
          placeholder="Search...">
      <button
          :disabled="currCharsterFormat"
          :class="{'opacity-25': currCharsterFormat}"
          @click="getZip(currZip)"
          class="btn-primary">
        generate
      </button>
    </div>
  </div>
  <ul class="flex py-4 whitespace-nowrap overflow-x-auto">
    <li :key="index"
        v-for="(choosen,index) in listZips"
        class="mr-2 my-1 btn-chip">{{ choosen.city }}
      <button @click="removeChosen(choosen.postal_code)"><span class="px-1">&times;</span></button>
    </li>
  </ul>
  <div class="-mx-4 px-4 py-2 overflow-x-auto py-2">
    <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead class="table-head">
          <tr>
            <th class="th-row px-5 py-3"> Postal Code </th>
            <th class="th-row px-5 py-3"> State </th>
          </tr>
        </thead>
        <tbody>
          <tr
              :key="index"
              v-for="(zip,index) in listZips"
              class="tb-row"
            >
            <td class="px-5 py-5 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">
                {{ zip.country_code }}, {{ zip.city }}
              </p>
              <p class="text-gray-600 whitespace-no-wrap"> {{ zip.postal_code }}</p>
            </td>
            <td class="px-5 py-5 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ zip.state }}</p>
              <p class="text-gray-600 whitespace-no-wrap"> {{ zip.state_code }}</p>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="listZips.length">
          <tr><td class="px-5 py-3">Length: <span>{{listZips.length}}</span></td></tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',

  data() {

    return {
      currZip: "",
      maxLength: 5,
    }

  },

  computed: {

    queriesList() {
      return this.$store.getters.QUERIES_LIST
    },
    listZips() {
      return this.$store.getters.ZIP_LIST
    },
    currCharsterFormat() {
      return this.currZip.length <=4
    }

  },

  methods: {

    filterNonNumeric() {
      this.currZip = this.currZip.replace(/[^0-9]/g, "");
    },
    async removeChosen(el) {
      await this.$store.dispatch('REMOVE_ZIP_CODE', el)
      this.$router.replace({query: {'zips': this.queriesList}})
    },
    async getZip(zip) {
      await this.$store.dispatch('GET_ZIPS_FROM_API', zip)
      this.$router.push({query: {'zips': this.queriesList}})
      this.currZip = ""
    }
  },
  async mounted() {
    if (this.$route.query.zips) {
      await this.$store.dispatch('GET_QUERIES_FROM_API', this.$route.query.zips)
    }
  },
  unmounted() {
    this.$store.commit('CLEAN_ZIP_STATE')
    this.$router.replace({'zip': null});
  }

}
</script>

