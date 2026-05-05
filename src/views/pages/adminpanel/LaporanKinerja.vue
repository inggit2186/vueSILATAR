<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper admin-laporan-kinerja-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <!-- Categories Section -->
                <div class="categorieslist-section">
                    <div class="container text-center">
                        <hr/>
                        <h3>{{ title }}</h3>
                        <hr/>
                        <div class="row">
                            <div v-for="item in bulan" :key="item.id" class="col-lg-3 col-md-4 centered">
                                <router-link :to="tujuLayanan(item.id)">
                                <div class="categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/'+item.name+'.png'" style="width:80%;" alt="car1">
                                    <h6>{{ item.nama }}</h6>
                                    <span>Rekap Laporan Kinerja ASN pada bulan {{ item.name }}</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- /Categories Section -->	
        <foot />

        <scroll />
    </div>
</div>
</template>

<script>
export default {
	data() {
			return {
				title: "Rekap Laporan Kinerja",
                text: "Home",
                text1: "Laporan CKH",
                text2: "Bulan",
                name: "/",
				bulan: [
                    {id:'1',name:"Januari"},
                    {id:'2',name:"Februari"},
                    {id:'3',name:"Maret"},
                    {id:'4',name:"April"},
                    {id:'5',name:"Mei"},
                    {id:'6',name:"Juni"},
                    {id:'7',name:"Juli"},
                    {id:'8',name:"Agustus"},
                    {id:'9',name:"September"},
                    {id:'10',name:"Oktober"},
                    {id:'11',name:"November"},
                    {id:'12',name:"Desember"}
                ],
			}
	},
	created() {
		window.scrollTo(0,0)
	},
	methods: {
        tujuLayanan(id) {
            const user = JSON.parse(localStorage.getItem('user'))
            if(user.dept_id == 4 || user.dept_id == 102){
                return "/verifckh/"+id+"/getSeksi";
            }else if(user.dept_id == 8){
                return "/verifckh/"+id+"/getKUA";
            }else if(user.dept_id == 7){
                return "/verifckh/"+id+"/getMIN";
            }else if(user.dept_id == 5){
                return "/ckh/"+id+"/999"
            }else{
                
                this.$toast.fire({
						title: "Anda Tidak Memiliki Akses ke Bagian Ini!!",
						icon: 'error',
					})
            }
        },
	}
}
</script>

<style scoped>
.admin-laporan-kinerja-page {
  background:
    radial-gradient(circle at top left, rgba(201, 157, 79, 0.12), transparent 30%),
    radial-gradient(circle at top right, rgba(143, 29, 44, 0.18), transparent 32%),
    linear-gradient(180deg, #1f1213 0%, #2a191a 100%);
  color: #fff2d1;
}

.admin-laporan-kinerja-page :deep(.breadcrumb) {
  color: #fff2d1;
}

.admin-laporan-kinerja-page .categorieslist-section {
  padding: 0.75rem 0 2.5rem;
}

.admin-laporan-kinerja-page h3 {
  color: #fff4dc;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.admin-laporan-kinerja-page hr {
  border-color: rgba(201, 157, 79, 0.18);
  opacity: 1;
}

.admin-laporan-kinerja-page .categories-content {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.98), rgba(31, 18, 19, 0.98));
  border: 1px solid rgba(201, 157, 79, 0.16);
  border-radius: 22px;
  padding: 1rem;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.24);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.admin-laporan-kinerja-page .categories-content:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.28);
}

.admin-laporan-kinerja-page .categories-content h6 {
  color: #fff4dc;
  font-weight: 700;
}

.admin-laporan-kinerja-page .categories-content span {
  color: rgba(255, 244, 220, 0.76);
}

.admin-laporan-kinerja-page .categories-content img {
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.22));
}

@media (max-width: 767px) {
  .admin-laporan-kinerja-page .categories-content {
    border-radius: 18px;
  }
}
</style>
