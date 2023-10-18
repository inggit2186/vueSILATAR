<template>
    <div class="main-wrapper">

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1"/>
            
            <div class="categorieslist-section">
                <div class="container ">
                    <div ref="scroll1st" class="pagination">
                        <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                    </div>
                    <div class="text-center">
                        <h1><i-line-md-github-loop/> Termasuk Kategori Manakah Anda?</h1>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-lg-5 col-md-5 centered">
                            <router-link to="/bukutamu/pegawai">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/503.png'" style="width:100%;" alt="car1">
                                <h6>Aparatur Sipil Negara (ASN)<br>Jajaran Kankemenag Kab.Tanah Datar</h6>
                                <span>Jika Anda merupakan Pegawai/ASN di Jajaran Kantor Kementerian Agama Kab.Tanah Datar (Kantor/KUA/Madrasah/Swasta/etc)</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-5 col-md-5 centered">
                            <router-link to="/bukutamu/public">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/504.png'" style="width:100%;" alt="car1">
                                <h6>Honorer / Masyarakat Umum / ASN Luar Instansi Kankemenag Kab.Tanah Datar</h6>
                                <span>Jika Anda merupakan ASN/Masyarakat diluar Jajaran Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: "Kategori",
            text: "Home",
            text1: "Buku Tamu",
            name: "/",
        };
    },
    created() {
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    }
}
</script>