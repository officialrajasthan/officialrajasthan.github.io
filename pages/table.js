const TablePage = {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    fetch("fdOrder.csv")
      .then(response => response.text())
      .then(csvText => {
        this.tableData = csvText
          .split("\n")
          .map(row => row.split(","));
      });
  },
  template: `
    <div class="text-center">
      <!-- Stylish Header -->
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide drop-shadow-md">
GOR are related Financial Orders.       </h1>
      <p class="text-gray-600 text-lg italic mt-1">A structured view of your dataset</p>

      <!-- Table Container -->
      <div class="overflow-x-auto mt-6">
        <table class="min-w-full border border-gray-300 shadow-lg bg-white rounded-lg">
          <thead class="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th class="border border-gray-400 px-6 py-3 text-lg">#</th>
              <th class="border border-gray-400 px-6 py-3 text-lg">Title</th>
              <th class="border border-gray-400 px-6 py-3 text-lg">Date</th>
              <th class="border border-gray-400 px-6 py-3 text-lg">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-100 transition-all">
              <td class="border border-gray-300 px-6 py-3 text-gray-800 text-center font-semibold">{{ row[0] }}</td>
              <td class="border border-gray-300 px-6 py-3 text-gray-700">{{ row[1] }}</td>
              <td class="border border-gray-300 px-6 py-3 text-gray-600 text-center">{{ row[2] }}</td>
              <td class="border border-gray-300 px-6 py-3 text-center">
                <a :href="row[3]" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank">
                  View PDF
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};
