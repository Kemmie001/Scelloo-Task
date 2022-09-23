<template>
  <div class="back-container w-full font-inter">
  <div class="w-full">
     <div class="text-primary">
    <h3 class="font-semibold text-md uppercase">Table Heading</h3>
   
   </div>
   <div class="flex justify-center items-center">
    <loader :loading="loading" :color="'#6D5BD0'" :radius="'20'" />
  </div>
  <div  v-if="userData && currentUsers">
     <div class="navigation">
      <ul class="">
        <li>
          <button :class="[showing === 'all' ? 'active' : '']"  @click="show('all')">All</button>
        </li>
        <li>
          <button :class="[showing === 'paid' ? 'active' : '']" @click="show('paid')">Paid</button>
        </li>
        <li>
          <button :class="[showing === 'unpaid' ? 'active' : '']" @click="show('unpaid')">Unpaid</button>
        </li>
        <li>
          <button :class="[showing === 'overdue' ? 'active' : '']" @click="show('overdue')">Overdue</button>
        </li>
      </ul>
      <span class="pb-2 md:pb-0">
        Total payable amount:  <p class="text-lg font-semibold text-light">${{amountPayable / 100}} </p>  <p class="font-thin">USD</p>
      </span>
    </div>
  <div class="table mt-4">
    <div class="table-head flex flex-wrap flex-col md:flex-row bg-white justify-space-between p-4">
   
      <button class="filter cursor-pointer gap-x-2 md:mr-4" @click="openFilter">
        <img src="./assets/images/filter.svg" class="w-10" alt="">
        Filter
      </button>
        <div v-if="filter" class="modal-overlay" @click.self="closeFilter">
          <div 
          :class="filter ? 'show' : ''"
          class="filter-modal"
        >
        <h6 class="uppercase font-thin text-sm pb-2">Sort By:</h6>
          <span class="flex items-center justify-between filter-item">
            <label for="default">Default</label>
            <input
              id="default"
              v-model="filters.default"
              type="radio"
              name="subject"
              @change="show('all')"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="firstname">First Name</label>
            <input
              id="firstname"
              v-model="filters.firstname"
              type="radio"
              name="subject"
              @change="sortByFirstName"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="lastname">Last Name</label>
            <input
              id="lastname"
              v-model="filters.lastname"
              type="radio"
              name="subject"
              @change="sortByLastName"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="date">Email </label>
            <input
              id="date"
              v-model="filters.email"
              type="radio"
              name="subject"
              @change="sortByEmail"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="login">Last login</label>
            <input
              id="login"
              v-model="filters.login"
              type="radio"
              name="subject"
            />
            
          </span>
          <div class="user-filter">
             <h6 class="uppercase font-thin text-sm">Users:</h6>
          <span class="flex items-center justify-between filter-item">
            <label for="all">All</label>
            <input
              id="all"
              v-model="filter.all"
              type="radio"
              name="subject"
              @change="show('all')"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="active">Active</label>
            <input
              id="active"
              v-model="filter.active"
              type="radio"
              name="subject"
            />
            
          </span>
          <span class="flex items-center justify-between filter-item">
            <label for="inactive">Inactive</label>
            <input
              id="inactive"
              v-model="filter.inactive"
              type="radio"
              name="subject"
            />
            
          </span>
          </div>
          
        </div>
        </div>
      <div class="search my-2 md:my-0">
        <input type="search" name="" v-model="search" placeholder="Search Users by Name, Email or Date" id="">
        <img class="icon" src="./assets/images/Search.svg" alt="">
      </div>
      <button @click="markAsPaid" class="md:ml-auto bg-light uppercase text-white py-2 px-2  text-sm rounded-md">
        Pay Dues
      </button>
   </div>
   <div class="main-tabe" >
    
    <table class="table-auto" >
  <thead>
    <tr class="uppercase text-xs tracking-widest h-12">
      <th class="w-1/12">
        <input type="checkbox" name="" id=""> 
      </th>
      <th class="w-2/12">Name</th>
      <th class="w-3/12"> User Status</th>
      <th class="w-3/12">Payment Status</th>
      <th class="w-1/12">Amount</th>
      <th class="w-2/12"></th>
      <th class="w-1/12"><i class="uil uil-ellipsis-v text-lg"></i></th>
    </tr>
  </thead>
  <template v-if="currentUsers.length == 0">
    <tr>
      <td></td>
      <td
        colspan="6"
        class="mx-auto text-sm font-medium"
      >
        <p class="text-center py-8">NO RECORDS FOUND</p>
      </td>
    </tr>
  </template>
  <tbody v-for="user in currentUsers" :key="user.id">
     <tr class="text-sm bg-white h-20"> 
       <td class="">
       <div class="flex items-center">
         <input type="checkbox" name="" id="" @change="marking(user.id)">  
          <span class="more ml-4" @click="toggleView(user.id)"><i class="uil " :class="
            view === user.id ? 'uil-angle-down' : 'uil-angle-up'
          "></i></span>
       </div>
       </td>
      <td >
        <h6 class="font-medium text-md text-dark">{{user.firstName}} {{user.lastName}}</h6>
        <p class="font-light pt-1">{{user.email}}</p>
      </td>
      <td>
        <button :class="[user.userStatus === 'active' ? 'active' : 'inactive']" class="statuses">
        <span class=""></span>
        {{user.userStatus}}</button>
        <p>Last login: {{user.lastLogin}}</p>
        </td>
      <td>
        <button :class="[user.paymentStatus === 'paid' ? 'paid' : user.paymentStatus === 'unpaid' ? 'unpaid' : 'over-due']" class="statuses" >
        <span class="w-2 h-2 bg-primary px-1"></span>
        {{user.paymentStatus}}</button>
        <p class="text-dark" v-if="user.paymentStatus === 'paid'">Paid on {{user.paidOn}}</p>
        <p class="text-dark" v-if="user.paymentStatus === 'unpaid'">Dues on 15/APR/2020</p>
        <p class="text-dark" v-if="user.paymentStatus === 'overdue'">Dued on 15/APR/2020</p>
        </td>
      <td>
        <p class="text-dark">${{user.amountInCents / 100}}</p>
      <p class="font-light">USD</p>
      </td>
      <td>View more</td>
      <td>
        <div class="relative">
          <p @click="showMore(user.id)"><i class="cursor-pointer uil uil-ellipsis-v text-lg"></i></p>
          <div 
          :class="more  === user.id ? 'show' : ''"
          class="more-modal"
        >
        <p @click="showMore(user.id)" class="cursor-pointer flex justify-end shadow-md bg-white cancel rounded-full">X</p>
          <span class="flex items-center justify-between filter-item px-4 py-2 text-dark">
            <p>Edit</p>
            
          </span>
          <span class="flex items-center justify-between filter-item  px-4 py-2 text-dark">
            <p>View Profile</p>
            
          </span>
          <span class="flex items-center justify-between filter-item  px-4 py-2 text-success">
            <p>Activate User</p>
            
          </span>
          <span class="flex items-center justify-between filter-item  px-4 py-2 text-error">
            <p>Delete</p>
          </span>
          
        </div>
        </div>
      </td>
      
     </tr> 
     <template v-if="view  === user.id">
        <tr class="text-xs border-t-2 border-secondary font-light bg-medium-dark h-18">
            <th class=""></th>
            <th class="">DATE</th>
            <th>USER ACTIVITY</th>
            <th class="flex items-center">
              <p class="pr-2">DETAILS</p>
              <i class="uil uil-info-circle font-bold text-lg"></i>
            </th>
      </tr>
      <template v-if="user.activities.length">
            <tr
              class="bg-transparent"
              v-for="(activity, i) in user.activities"
              :key="i"
            >
              <td></td>
              <td>{{ activity.date }}</td>
              <td>
                {{ activity.userActivity }}
              </td>
              <td colspan="2">
                {{ activity.details }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td></td>
              <td
                colspan="6"
                class="mx-auto text-sm font-medium"
              >
                <p class="text-center py-8">NO RECORDS FOUND</p>
              </td>
            </tr>
          </template>
     </template>
  </tbody>
  
</table>
<div class="bg-dark-light table-bottom w-full text-primary flex justify-end items-center py-4 px-4">
    <div class="flex gap-x-8">
      <p>Rows per page: 10 <i class="uil uil-angle-down"></i></p>
      <p>1-10 of {{currentUsers.length}}</p>
      <span class="flex gap-x-5 items-center">
        <i class="uil uil-angle-left text-xl "></i>
        <i class="uil uil-angle-right text-xl"></i>
      </span>
    </div>
  </div>
   </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>

import loader from './components/loadingSpinner.vue';

// import baseUrl from '../src/util/setAuth'
export default {
  
  name: 'App',
  components: {
    loader,
  },
  data(){
    return{
      users: [],
      showing: 'all',
      filter: false,
      more: null,
      search: '',
      selected: [],
      view: null,
      filters: {
        inactive: '',
        active: '',
        all: '',
        firstname: '',
        lastname: '',
        email: '',
        login: '',
        
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters['gettingUsers'];
    },
    userData() {
      return this.$store.getters['getUsers'];
    },
    currentUsers() {
      if(this.users.length > 0){
        return this.users?.filter((user) =>
        user.firstName.toLowerCase().includes(this.search.toLowerCase()) || user.email.toLowerCase().includes(this.search.toLowerCase())
        || user.lastName.toLowerCase().includes(this.search.toLowerCase())
      );
      } else {
       return this.userData.data?.filter((user) =>
        user.firstName.toLowerCase().includes(this.search.toLowerCase()) || user.email.toLowerCase().includes(this.search.toLowerCase())
        || user.lastName.toLowerCase().includes(this.search.toLowerCase())
      );
      }
    },
    amountPayable() {
       return this.$store.getters['getTotal'];
    }
  },
  mounted(){
    if (!this.userData.data) {
      this.$store.dispatch('getUsers');
    } 
  },
  methods:{
    show(x){
      this.showing = x
      if(this.userData && this.showing === 'paid'){
        const paid = this.userData.data.filter(user => user.paymentStatus === 'paid')
        this.users = paid
      } 
      if(this.userData && this.showing === 'all'){
        const allUsers = this.userData.data
        this.users = allUsers
        this.filter = false
      }
      if(this.userData && this.showing === 'unpaid'){
        const unpaid = this.userData.data.filter(user => user.paymentStatus === 'unpaid')
        this.users = unpaid
      }
      if(this.userData && this.showing === 'overdue'){
        const overdue = this.userData.data.filter(user => user.paymentStatus === 'overdue')
        this.users = overdue
      }
    },
    sortByFirstName(){ 
      if(this.userData){
       const sortByFirst = this.userData.data.slice(0).sort(function(a,b) {
            var x = a.firstName.toLowerCase();
            var y = b.firstName.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        this.users = sortByFirst
        this.filter = false
      }
    },
    sortByLastName(){ 
      if(this.userData){
       const sortByLast = this.userData.data.slice(0).sort(function(a,b) {
            var x = a.lastName.toLowerCase();
            var y = b.lastName.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        this.users = sortByLast
        this.filter = false
      }
    },
    sortByEmail(){ 
      if(this.userData){
       const sortByEmailAddress = this.userData.data.slice(0).sort(function(a,b) {
            var x = a.email.toLowerCase();
            var y = b.email.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        this.users = sortByEmailAddress
        this.filter = false
      }
    },
    openFilter() {
      this.filter = !this.filter
    },
     closeFilter() {
      this.filter = false
    },
    showMore(x){
     if(this.more === x){
       this.more = null
     } else {
      this.more = x
     }
    },
    marking(x){
      if(this.selected.includes(x)){
        this.selected.splice(0, 1)
      } else {
        this.selected.push(x)
      }
    },
    toggleView(x){
      if(this.view === x) {
        this.view = null
      } else {
        this.view = x
      }
    },
    markAsPaid(){
      for(let  i = 0; i < this.selected.length; i++){
        const user = this.userData.data.filter(user => user.id === this.selected[i])
        if(user[0].paymentStatus !== 'paid' ){
        this.$store.dispatch('markPaid', this.selected[i]);
        user[0].paymentStatus = 'paid'
      } 
      }

      
    },      
  }
}

</script>

<style lang="scss" >

  .main-tabe {
    max-width: 100%;
    overflow-x: auto;
  }
  .back-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    background: #F4F2FF;
    padding: 20px 8%;
    font-weight: 400;
    color: #6E6893;
    /* @include sm {
      width: 200vw;
    } */
  }
  
  .navigation{
    margin: 1.2rem 0;

    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #C6C2DE;
    width: 100%;
    flex-wrap: wrap;
    ul{
      display: flex;
      li{
        button {
          padding: 0 8px;
        }
      }
      .active{
        padding-bottom:3px ;
        color: #25213B;
        border-bottom: 1.5px solid #25213B;
      }
    }
    span{
      display: flex;
      gap: 4px;
      align-items: center;
      b{
        color: #6D5BD0;
      }
    }
  }
  .lofty-head {
    flex: 1;
  }
  .table{
    display: block !important;
    /* overflow-x: auto; */
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    .table-head{
      width: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .filter{
      border: 1px solid #C6C2DE;
      border-radius: 6px;
      padding: 4px 6px;
      display: flex;
      align-items: center;
      row-gap: 4px;
      padding: 4px 8px;
      /* width: 100px; */
      img{
        width: 20px;
      }
    }
    .search{
      display: flex;
      background: #F4F2FF;
      flex-direction: row-reverse;
      padding: 8px 4px;
      flex: 1;
      /* margin-right: 10px; */
      border-radius: 6px;
      max-width: 320px;
      input{
        color: #6E6893;
        font-weight: 400;
        font-size: 12px;
        background: #F4F2FF;
        outline: none;
        padding-left: 10px;
        flex: 1;
        max-width: 100%;
      }
      .icon{
        width: 16px;
        max-width: unset;
      }
    }
    .search:hover{
      border: 1px solid #6D5BD0;
    }
    th, td{
      text-align: left ;
      padding: 8px;
      border-top: 1px solid #D9D5EC;
      /* border-bottom: 1px solid #D9D5EC; */
    }
    tr:hover{
      background: #F2F0F9;
    }
    .statuses{
      font-size: 14px;
      padding: 3px 10px;
      display: flex;
      align-items: center;
      gap: 4px;
      border-radius: 10px;
      margin-bottom: 4px;
      span{
        height: 8px;
        width: 8px;
        border-radius: 100%;
        display: block;
      }
    }
    .active{
      background: #E6E6F2;   
      color: #4A4AFF;
      
      span{
        background-color: #4A4AFF;
      }
      
    }
    .inactive{
      background: #F2F0F9;
      color: #6E6893;
      span{
        background-color: #6E6893;
      }
    }
    .paid{
      background: #CDFFCD;;
      color: #007F00;
      span{
        background-color: #007F00;
      }
    }
    .over-due{
      background: #FFE0E0;
      color: #D30000;
      span{
        background-color: #D30000;
      }
    }
    .unpaid{
      background: #FFECCC;
      color:  #965E00;
      span{
        background-color:  #965E00;
      }
    }
    .more{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      width: 17px;
      height: 17px;
      border: 1.5px solid #8B83BA;
      border-radius: 100%;
    }
  }
  .filter-item {
  label {
    @apply cursor-pointer;
    font-size: 15px;
    color: #25213B;
    font-weight: 400;
    padding: 4px;
  }
  padding: 0 2px;
}
.filter-item:hover{
  background: #F2F0F9;
  border-radius: 4px;
}
.modal-overlay {
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0);
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
}
  .filter-modal {
  width: 200px;
  height: 365px;
  background: #ffffff;
  display: none;
  position: fixed;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 10px 20px;
  overflow-y: auto;
  top: 180px;
  bottom: 0;
  left: 100px;
  z-index: 999999999;
  .user-filter{
    margin-top: 8px ;
    border-top: 1px solid #F2F0F9;
    padding: 8px 0;
  }
  &.show {
    display: block;
  }
}
 .more-modal {
  width: 240px;
  height: 165px;
  background: #ffffff;
  display: none;
  position: absolute;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 10px 8px;
  overflow-y: auto;
  top: 50px;
  bottom: 0;
  right: -10px;
  z-index: 999999999;
  &.show {
    display: block;
  }
  .cancel{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    /* left: 100%; */
     z-index: 9999999999;
  }
}
@media screen and (max-width: 768px) {
     .search{
      max-width: 100% !important;
     }
  }
</style>
