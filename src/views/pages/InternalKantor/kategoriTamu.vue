<template>
    <div class="main-wrapper">

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1"/>
            
            <div class="categorieslist-section">
                <div class="container ">
                    <div  class="pagination">
                        <a class="page-link" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                    </div>
                    <div class="text-center">
                        <h1><i-line-md-github-loop/> Termasuk Manakah Anda?</h1>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to="/bukutamu/pegawai">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/icons/category-8.svg'" alt="car1">
                                <h6>Aparatur Sipil Negara (ASN)<br>Jajaran Kankemenag Kab.Tanah Datar</h6>
                                <span>Jika Anda merupakan Pegawai/ASN di Jajaran Kantor Kementerian Agama Kab.Tanah Datar (Kantor/KUA/Madrasah/Swasta/etc)</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to="/bukutamu/public">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/icons/category-9.svg'" alt="car1">
                                <h6>Masyarakat Umum/Luar Instansi Kankemenag Kab.Tanah Datar</h6>
                                <span>Jika Anda merupakan Masyarakat diluar Jajaran Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
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
            title: "Kantor Kementerian Agama Kab.Tanah Datar",
            text: "Home",
            text1: "Buku Tamu",
            name: "/",
        };
    },
}
</script>