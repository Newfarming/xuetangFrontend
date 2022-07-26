<template>
  <div class="app-container">

   </div>
</template>

<script>
import { getUserlists } from '@/api/table'
import { userDelete } from '@/api/user'
// import { getPermissionTypeCookie } from '@/utils/auth'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: '1', display_name: '姓名', value: 'name' },
  { key: '2', display_name: '工号', value: 'workNo' },
  { key: '3', display_name: '手机号', value: 'phone' }
  // { key: '4', display_name: '部门', value: '' }
]
export default {
  name: 'UserList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 0,
      tableKey: 0,
      list: null,
      depart: null,
      listLoading: true,
      TypeOptions,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: '',
        type: '',
        sort: '+id'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserlists().then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },
    handleSearch() {
    },
    handleJumpDetails(row) {
      this.$router.push('/user/user-details/' + row.id)
    },
    handleJumpEdit(row) {
      console.log('row:' + JSON.stringify(row))
      this.$router.push('/user/user-edit/' + row.id)
    },
    handleJumpAdd() {
      this.$router.push('/user/user-add')
    },
    handleDelete(row) {
      userDelete({
        id: row.pk
      }).then(response => {
        this.fetchData()
        // this.listLoading = false
      })
    },
    handleFilter() {
      // this.listQuery.page = 1
      // this.get()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
