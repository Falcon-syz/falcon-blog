<template>
  <b-container style="padding-top:1rem">
    <b-row>
      <b-col>
        <div class="block">
          <el-timeline>
            <el-timeline-item :timestamp="item.pubDate" placement="top" v-for="item in notes" :key="item.id">
              <el-card>
                <p>{{item.content}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import note from "@/api/notes";
export default {
  data() {
    return {
      notes: []
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      note.getNotes().then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.notes = resp.notes;
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.homeMain {
  background-color: #ffffff;
  margin: 2rem auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>
