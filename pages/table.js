const TablePage = {
  data() {
    return {
      tableData: [],
      filteredData: [],
      currentPage: 1,
      rowsPerPage: 10,
      searchQuery: "",
      sortColumn: null,
      sortDirection: "asc",
    };
  },
  computed: {
    paginatedData() {
      let start = (this.currentPage - 1) * this.rowsPerPage;
      let end = start + this.rowsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },
  },
  methods: {
    async loadCSV() {
      const response = await fetch("data.csv");
      const csvText = await response.text();
      this.tableData = csvText
        .trim()
        .split("\n")
        .map(row => row.split(","));
      this.filteredData = this.tableData;
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    searchTable() {
      const query = this.searchQuery.toLowerCase();
      this.filteredData = this.tableData.filter(row =>
        row.some(cell => cell.toLowerCase().includes(query))
      );
      this.currentPage = 1;
    },
    sortTable(columnIndex) {
      if (this.sortColumn === columnIndex) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = columnIndex;
        this.sortDirection = "asc";
      }

      this.filteredData.sort((a, b) => {
        let valA = a[columnIndex].toLowerCase();
        let valB = b[columnIndex].toLowerCase();

        if (!isNaN(valA) && !isNaN(valB)) {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        }

        if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
  mounted() {
    this.loadCSV();
  },
  template: `
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800">Enhanced Table</h1>

     <!-- Search Box -->
<div class="mt-4 mb-4 flex justify-center">
  <input v-model="searchQuery" @input="searchTable"
    class="px-6 py-3 border border-gray-400 rounded-lg w-3/4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="🔍 Search for records..." />
</div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable(0)">#</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable(1)">Title</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable(2)">Date</th>
              <th class="px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in paginatedData" :key="index" class="hover:bg-gray-100">
              <td class="border px-4 py-2 text-center font-semibold">{{ row[0] }}</td>
              <td class="border px-4 py-2">{{ row[1] }}</td>
              <td class="border px-4 py-2 text-center">{{ row[2] }}</td>
              <td class="border px-4 py-2 text-center">
                <a :href="row[3]" class="text-blue-600 hover:text-blue-800 underline" target="_blank">View PDF</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-2 mt-4">
        <button @click="changePage(currentPage - 1)" class="px-4 py-2 bg-gray-200 rounded-md">Prev</button>
        <span class="text-lg font-bold">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" class="px-4 py-2 bg-gray-200 rounded-md">Next</button>
      </div>
    </div>
  `,
};
