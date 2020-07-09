<template>
  <Table > <Card slot="card"> <Table slot="table"><Card slot="card"></Card></Table></Card></Table>
</template>

<script>
import Table from "../../components/crm/table";
import Card from "../../components/crm/Card";
export default {
  layout: "auth",
  components: {
    Table,
    Card
  }
};
</script>