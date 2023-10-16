<template>
    <div class="main-wrapper">

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to='/bukutamu'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/icons/category-3.svg'" alt="car1">
                                <h6>BUKU TAMU</h6>
                                <span>Buku Tamu untuk Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/icons/category-6.svg'" alt="car1">
                                <h6>KASIH PENILAIAN</h6>
                                <span>Mohon Partisipasinya untuk memberikan Penilaian, Kritik, ataupun Saran kepada Kami</span>
                                </a>								   
                            </div>
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