<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <!-- Categories Section -->
                <div class="categorieslist-section">
                    <div class="container ">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="ruteTujuan('setjen')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu014.png'" style="width:100%;" alt="car1">
                                    <span>DIPA SETJEN ( KODE SATKER 299758 )</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="ruteTujuan('bimas')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu015.png'" style="width:100%;" alt="car1">
                                    <span>DIPA DITJEN BIMAS ISLAM ( KODE SATKER 299759 )</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="ruteTujuan('pendis')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu016.png'" style="width:100%;" alt="car1">
                                    <span>DIPA DITJEN PENDIS ( KODE SATKER 299760 )</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="ruteTujuan('phu')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu026.png'" style="width:100%;" alt="car1">
                                    <span>DIPA DITJEN PHU ( KODE SATKER 299761 )</span>
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
            user: JSON.parse(localStorage.getItem('user')),
            title: "DIPA Keuangan",
            text: "Home",
            text1: "Keuangan",
            text2: "DIPA",
            name: "/",
        };
    },
    created() {
        this.navid = this.$route.params.id
        window.scrollTo(0,0)
    },
    computed: {
        ruteTujuan(id) {
			return id => `/${this.navid}/${id}`
    	},
    }
}
</script>

<style>
.listMenu img{
    width: 70%;
    height: 70%;
    margin-bottom: 5px;
}
.listMenu h6{
    font-size: 130%;
    font-weight: 600;
    margin-bottom: 5px;
}
</style>