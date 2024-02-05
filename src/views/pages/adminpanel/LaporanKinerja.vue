<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
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
            if(user.dept_id == 4){
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