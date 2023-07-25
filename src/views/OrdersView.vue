<template>
 <b-container fluid>
    <b-row>
    
        <b-col>
          <b-row align-v="center">
            <b-col><h5>Orders List - ( TOTAL : {{ rows??0 }})</h5></b-col>
          
          </b-row>
        
        </b-col>
        <b-row>
          
            <BCol cols="12" md="6" lg="3" class="my-2"  :key="index" v-for="(order, index) in orders">
              
            <OrderItem
            :id="order.id"
            :productName="order.sku.name"
             />
            </BCol>

        </b-row>

     <b-row align-h="end" >
          <b-col xl="1" lg="2" md="2" class="p-4">
            <b-form-select
              v-if="rows > 5"
              v-model="perPage"
              :options="options"
              size="md"
              v-on:change="setPerPage"
              varient="dark"
            ></b-form-select>

          </b-col>

         
          <b-col xl="5" lg="6" md="8" class="p-2">
            <b-pagination
              v-if="rows / perPage > 1"
              v-on:click="getOrders(parseInt(user_id))"
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
            ></b-pagination>
          </b-col>
        </b-row>


   </b-row></b-container>


</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login.js";
import { useTailorOrdersStore } from "@/stores/tailororders.js";
import OrderItem from './OrderItem.vue'
const { user_id } = storeToRefs(useLoginStore());
const {
  orders,
  fields,
  isBusy,
  errors,
  options,
  perPage,
  currentPage,
  rows
} = storeToRefs(useTailorOrdersStore());

const {
  getOrders,
  setPerPage,
  acceptOrder
} = useTailorOrdersStore();


getOrders(parseInt(user_id.value));
</script>


