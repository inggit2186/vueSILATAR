<template>
    <div class="main-wrapper">

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 centered">
                            <router-link to='/bukutamu'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/501.png'" style="width:100%;" alt="car1">
                                <h6>Guest Registration</h6>
                                <span>Buku Tamu untuk Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-5 col-md-5 centered">
                            <router-link to='/rateUs'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/502.png'" style="width:100%;" alt="car1">
                                <h6>Rate Us</h6>
                                <span>Mohon Partisipasinya untuk memberikan Penilaian, Kritik, ataupun Saran kepada Kami</span>
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
            title: "Menu Pilihan",
            text: "Home",
            text1: "Buku Tamu",
            name: "/",
        };
    },
}
</script>