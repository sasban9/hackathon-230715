import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "@/stores/login.js";

export const useTailorOrdersStore = defineStore("tailorordersStore", {
  
  state: () => ({
    orders: [],
    tailor_id:parseInt(useLoginStore().user_id),
   
    isBusy: false,
    errors: {},
    perPage: 10,
    currentPage: 1,
    rows: null,
    options: [
      { value: 5, text: "5" },
      { value: 10, text: "10" },
      { value: 50, text: "50" },
      { value: 100, text: "100" }
    ]
  }),

  actions: {
    
    async getOrders(id) {
   
      this.isBusy = true;
      try {
        let url = "tailor_wise_order/"+id;
        if (this.perPage) {
          url += `?perPage=${this.perPage}`;
        }
        if (this.currentPage > 1) {
          url += `${this.perPage ? "&" : "?"}page=${this.currentPage}`;
        }
        const response = await axios.get(url);
        this.orders = response.data.data.orders.data;
        this.currentPage = response.data.data.orders.current_page;
        this.rows = response.data.data.orders.total;

        this.isBusy = false;
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
        }
        this.isBusy = false;
      }
    },
   
    setPerPage(value) {
      this.perPage = value;
      this.currentPage = 1;
    },  
   
   
    async acceptOrder(order_id,tailor_id,status){
      this.isBusy = true;
      try {
        const formData = new FormData();
        let url = "order_assign";
        if (order_id) {
          formData.append("order_id", order_id);
        }
        if (tailor_id) {
          formData.append("tailor_id", tailor_id);
        }

      
          formData.append("status", status);
      
        
        const response = await axios.post(url,formData);
        this.getOrders(this.tailor_id);
        this.isBusy = false;
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
        }
        this.isBusy = false;
      }
      
    }
  }
});
