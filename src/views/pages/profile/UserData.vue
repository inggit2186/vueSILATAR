<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
            <div v-if="loading" class="text-center">
                <hr>
                <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                <br>
                <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                <h3>::: Nyangkul Data dulu :::</h3>
                <hr>
            </div>
            <div v-else class="container">
				<div class="profile-content">
				    <div class="card media-section">
                        <div class="card-header">
                            <div class="foto centered">
                                <img :src="imageFoto" style="max-width: 180px;margin-bottom: 4px;" />
                                <h5><b>{{ user.name }}</b></h5>
                                <div v-if="user.bio != null" style="font-size: 13px;font-style: italic;padding:0 20% 2% 20%">"{{ user.bio }}"</div>
                                <h5><BBadge pill variant="primary">{{ user.noid }}</BBadge><br/></h5>
                                <h5><BBadge pill variant="secondary">{{ user.pekerjaan }}<br/><BBadge pill variant="light" style="margin-top: 4px">{{ user.satker }}</BBadge></BBadge></h5>
                            </div>	
                        </div>
                        <div v-if="detail == 0" ref="scroll1st" class="categorieslist-section" >
                            <div class="container ">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 centered" @click.prevent="changedetail(1)">
                                        <div class="listMenu categories-content">
                                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                            <img :src="$assets+'/img/ikon/513.png'" style="width:100%;" alt="car1">
                                            <span><b>Data Pribadi / Personal</b></span>
                                            </a>								   
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 centered" @click.prevent="changedetail(2)">
                                        <div class="listMenu categories-content">
                                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                            <img :src="$assets+'/img/ikon/514.png'" style="width:100%;" alt="car1">
                                            <span><b>Data Riwayat Pendidikan</b></span>
                                            </a>								   
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 centered" @click.prevent="changedetail(3)">
                                        <div class="listMenu categories-content">
                                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                            <img :src="$assets+'/img/ikon/515.png'" style="width:100%;" alt="car1">
                                            <span><b>Data Riwayat Pekerjaan/Jabatan</b></span>
                                            </a>								   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 1" ref="scroll1st">
                            <div class="col-lg-9 centered">
                                <div class="card dash-cards">
                                    <div class="card-header">
                                        <b-button variant="warning" @click.prevent="changedetail(12)" :disabled="loadingpf" style="float: right"> 
                                            <span><i class="fas fa-book-open-reader" aria-hidden="true"></i><b>&nbsp; Cek Dokumen</b></span>
                                        </b-button>
                                        <a class="btn btn-danger btn-sm" href="#" @click="changedetail(0)" style="float: right;margin-right: 20px;"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                                        <h4 style="float: left;">Profile Details</h4>														
                                    </div>
                                    <b-form @submit.prevent="updateProfil">
                                    <div class="card-body">
                                        <div class="profile-photo">
                                            <div class="profile-img">
                                                <div class="settings-upload-img">
                                                    <img :src="imageUrl" alt="profile">
                                                </div>&nbsp;&nbsp;							    
                                                <div class="settings-upload-btn">
                                                    <input id="filex" type="file" accept="image/*" name="image" class="hide-input image-upload" @change="onFileSelected">
                                                    <label for="file" class="file-upload" :disable="loadingpp">
                                                        <span v-if="!loadingpp" style="color: aliceblue;"><i class="fa fa-upload" aria-hidden="true"></i> <b>Photo Profil</b></span>
                                                        <span v-else style="color: aliceblue;" ><i-svg-spinners-bars-scale-middle />&nbsp; JNE Berangkaattt... </span>
                                                    </label>												
                                                </div>&nbsp;&nbsp;
                                                <span>Max file size: 2 MB</span>
                                            </div>                                        									
                                            <a href="javascript:void(0)" class="profile-img-del"><i class="feather-trash-2"></i></a>										
                                        </div>
                                        <div class="profile-form">
                                                <div class="form-group">
                                                    <label class="col-form-label">Nama Lengkap</label>
                                                    <div class="pass-group group-img">
                                                        <span class="lock-icon"><i class="feather-user"></i></span>
                                                        <b-form-input id="name" v-model="user.name" type="text" class="form-control" placeholder="Nama Lengkap" readonly />													
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Induk Kependudukan (NIK)*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-credit-card" style="font-size:medium;"></i></span>
                                                                <b-form-input id="nik" v-model="user.nip" type="number" class="form-control" placeholder="NIK" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Kartu Keluarga (KK)*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-server"></i>
                                                                <b-form-input id="kk" v-model="user.kk" type="number" class="form-control" placeholder="Nomor KK" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Pokok Wajib Pajak (NPWP)*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-layer-group" style="font-size:medium;"></i></span>
                                                                <b-form-input id="nik" v-model="user.npwp" type="text" class="form-control" placeholder="NPWP" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Rekening Gaji*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-book-open"></i>
                                                                <b-form-input id="kk" v-model="user.rekening" type="text" class="form-control" placeholder="Nomor Rekening" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Handphone / Whatsapp*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-phone" style="font-size:medium;"></i></span>
                                                                <b-form-input id="telp" v-model="user.telp" type="number" class="form-control" placeholder="Nomor Kontak" />													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Email Address*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-envelope"></i>
                                                                <b-form-input id="email" v-model="user.email" type="text" class="form-control" placeholder="Alamat Email" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Pekerjaan/Jabatan</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-briefcase lock-icon"></i>
                                                                <b-form-input id="pekerjaan" v-model="user.pekerjaan" type="text" class="form-control" placeholder="Pekerjaan / Jabatan" readonly/>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Satuan Kerja</label>
                                                            <div class="group-img">
                                                                <i class="fa fa-bank"></i>
                                                                <b-form-input id="satker" v-model="user.satker" type="text" class="form-control" placeholder="Tempat Bekerja" readonly />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jenis Kelamin</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-male"></i>
                                                                <b-form-select id="jk" v-model="user.jk" class="form-control" style="padding-left:40px;">
                                                                    <option value=null disabled>--Pilih Salah Satu--</option>
                                                                    <option value="Pria">Laki-Laki</option>
                                                                    <option value="Wanita">Perempuan</option>
                                                                </b-form-select>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Status Pernikahan</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-marker"></i>
                                                                <b-form-select id="jk" v-model="user.nikah" class="form-control" style="padding-left:40px;">
                                                                    <option value=null disabled>--Pilih Salah Satu--</option>
                                                                    <option value="0">Belum Menikah</option>
                                                                    <option value="1">Sudah Menikah</option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div v-if="user.nikah == 1" class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jenis Pekerjaan Suami/Istri*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-map"></i>
                                                                <b-form-select id="jk" v-model="user.jenis_pjob" class="form-control" style="padding-left:40px;">
                                                                    <option value=null disabled>--Pilih Salah Satu--</option>
                                                                    <option value="ASN">PNS / PPPK</option>
                                                                    <option value="NON">Non-ASN</option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Pekerjaan Suami/Istri*</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fas fa-briefcase" style="font-size:medium;"></i></span>
                                                                <b-form-input id="telp" v-model="user.pjob" type="text" class="form-control" placeholder="Pekerjaan Suami/Istri" />													
                                                            </div>
                                                        </div>
                                                    </div>										
                                                </div>
                                                <div v-if="user.nikah == 1" class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jumlah Anak*</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-users"></i>
                                                                <b-form-input id="email" v-model="user.jml_anak" type="number" class="form-control" placeholder="Jumlah Anak" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="user.jenis_pjob == 'ASN'" class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Permintaan Tunjangan Suami/Istri & Anak*</label>
                                                            <b-form-select id="jk" v-model="user.req_tunjangan" class="form-control" style="padding-left:40px;">
                                                                <option value="0">--Pilih Salah Satu--</option>
                                                                <option value="1">Personal (Diri Sendiri)</option>
                                                                <option value="2">Pasangan (Suami/Istri)</option>
                                                            </b-form-select>
                                                        </div>
                                                    </div>										
                                                </div>
                                                <hr/>
                                                <div class="form-group">
                                                    <label class="col-form-label">:: Ceritakan Sedikit Tentang Diri Anda ::</label>
                                                    <div class="pass-group group-img">
                                                        <textarea id="user.bio" v-model="user.bio" rows="4" name="user.bio" class="form-control">{{user.bio}}</textarea>												
                                                    </div>
                                                </div>
                                                <div class="row socialmedia-info">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Facebook</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fab fa-facebook-f"></i></span>
                                                                <b-form-input id="facebook" v-model="user.facebook" type="text" class="form-control" placeholder="https://www.facebook.com/" />												
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Twitter</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fab fa-twitter"></i></span>
                                                                <b-form-input id="twitter" v-model="user.twitter" type="text" class="form-control" placeholder="https://twitter.com/" />												
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row socialmedia-info">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group formlast-input">
                                                            <label class="col-form-label">LinkedIn</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fab fa-linkedin" aria-hidden="true"></i></span>
                                                                <b-form-input id="linkedin" v-model="user.linkedin" type="text" class="form-control" placeholder="https://www.linkedin.com/" />												
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group formlast-input">
                                                            <label class="col-form-label">Instagram</label>
                                                            <div class="pass-group group-img">
                                                                <span class="lock-icon"><i class="fab fa-instagram"></i></span>
                                                                <b-form-input id="instagram" v-model="user.instagram" type="text" class="form-control" placeholder="https://www.instagram.com/" />												
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>	
                                        </div>
                                        <br>
                                        <div class="text-center">
                                        <b-button variant="primary" type="submit" :disabled="loadingpf"> 
                                            <span v-if="!loadingpf"><i class="fa fa-address-card" aria-hidden="true"></i>&nbsp; Update Profil</span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Ke Dukcapil Dulu Gan...</span>
                                        </b-button>
                                        </div>
                                    </div>
                                </b-form>								
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 2" ref="scroll1st">
                            <div  ref="scroll1st" class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(0)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <div class="dash-listingcontent dashboard-info">
                                <div class="dash-cards card">
                                    <div class="card-body">
                                        <div class="listing-search">
                                            <div class="filter-content form-group">
                                                <div class="group-img">
                                                    <a class="btn btn-danger" href="#" @click="aksiDetail('new')" style="float: right;margin-left:20px;"><i-subway-add/> <b>TAMBAH</b></a>
                                                    <input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable" >
                                                    <i class="feather-search"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover centered">
                                                <thead>
                                                    <tr>
                                                        <th v-for="column in columns2" :key="column.name" style="max-width: 20px;" @click="sortTable(column.data)">
                                                            {{ column.name }}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="pendidikan.length == 0">
                                                    <tr>
                                                        <td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <template v-for="item in paginatedItem" :key="item.id">
                                                    <tr v-if="item.status != 99">
                                                        <td>
                                                            <b>{{ item.jenjang }}</b><br/>
                                                            <span style="font-size: smaller;">{{ item.jurusan }}</span>
                                                        </td>
                                                        <td>
                                                            <BBadge pill variant="primary" style="font-size: small;"> {{ item.nomor_ijazah }} </BBadge><br/>
                                                            <span style="font-size: smaller;">{{ item.ptgl_ijazah }}</span>
                                                        </td>
                                                        <td>
                                                            {{ item.ptgl_lulus }}<br/>
                                                        </td>
                                                        <td>
                                                            {{ item.instansi }}<br/>
                                                        </td>
                                                        <td>
                                                            <BButton pill size="sm" variant="danger" @click.prevent="deleteDoc(item.id,'pendidikan')"><b><i-fontisto-trash /> HAPUS</b></BButton>&nbsp;&nbsp;
                                                            <BButton pill size="sm" variant="outline-primary" @click.prevent="aksiDetail(item.id)"><b><i-mdi-call-to-action /> DETAIL</b></BButton>
                                                        </td>
                                                    </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--Pagination--> 
                                        <div class="blog-pagination">
                                            <nav>
                                                <ul class="pagination">
                                                    <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                                    </li>
                                                    <li class="justify-content-center pagination-center"> 
                                                        <div class="pagelink">
                                                            <ul>
                                                                <li v-for="page in displayedPages" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                                </li>
                                                                <li class="page-item" :class="{'disabled': currentPage === totalPages}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                                </li>
                                                            </ul>
                                                        </div>													
                                                    </li>													
                                                    <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <!--/Pagination-->

                                    </div>
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 3" ref="scroll1st">
                            <div  ref="scroll1st" class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(0)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <div class="dash-listingcontent dashboard-info">
                                <div class="dash-cards card">
                                    <div class="card-body">
                                        <div class="listing-search">
                                            <div class="filter-content form-group">
                                                <div class="group-img">
                                                    <a class="btn btn-danger" href="#" @click="jDetail('new')" style="float: right;margin-left:20px;"><i-subway-add/> <b>TAMBAH</b></a>
                                                    <input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable3" >
                                                    <i class="feather-search"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover centered">
                                                <thead>
                                                    <tr>
                                                        <th v-for="column in columns3" :key="column.name" style="max-width: 20px;" @click="sortTable3(column.data)">
                                                            {{ column.name }}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="pekerjaan.length == 0">
                                                    <tr>
                                                        <td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <template v-for="item in paginatedItem3" :key="item.id">
                                                    <tr v-if="item.status != 99">
                                                        <td>
                                                            <BBadge pill variant="primary" style="font-size: small;"><b>{{ item.no_sk }}</b></BBadge><br/>
                                                            <span style="font-size: smaller;">{{ item.ptgl_sk }}</span>
                                                        </td>
                                                        <td>
                                                            {{ item.satker }}<br/>
                                                            <span style="font-size: smaller;">{{ this.user.instansi }}</span>
                                                        </td>
                                                        <td>
                                                            <BBadge pill variant="warning" style="font-size: small;">{{ item.gol }}</BBadge>
                                                            {{ item.tjabatan }}
                                                        </td>
                                                        <td>
                                                            {{ item.ptmt }}<br/>
                                                        </td>
                                                        <td>
                                                            <BButton pill size="sm" variant="danger" @click.prevent="deleteDoc(item.id,'pekerjaan')"><b><i-fontisto-trash /> HAPUS</b></BButton>&nbsp;&nbsp;
                                                            <BButton pill size="sm" variant="outline-primary" @click.prevent="jDetail(item.id)"><b><i-mdi-call-to-action /> DETAIL</b></BButton>
                                                        </td>
                                                    </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--Pagination--> 
                                        <div class="blog-pagination">
                                            <nav>
                                                <ul class="pagination">
                                                    <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                                    </li>
                                                    <li class="justify-content-center pagination-center"> 
                                                        <div class="pagelink">
                                                            <ul>
                                                                <li v-for="page in displayedPages3" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                                </li>
                                                                <li class="page-item" :class="{'disabled': currentPage === totalPages3}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                                </li>
                                                            </ul>
                                                        </div>													
                                                    </li>													
                                                    <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages3}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <!--/Pagination-->

                                    </div>
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 4" ref="scroll1st">
                            <div  ref="scroll1st" class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(0)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <div class="dash-listingcontent dashboard-info">
                                <div class="dash-cards card">
                                    <div class="card-body">
                                        <div class="listing-search">
                                            <div class="filter-content form-group">
                                                <div class="group-img">
                                                    <a class="btn btn-danger" href="#" @click="gDetail('new')" style="float: right;margin-left:20px;"><i-subway-add/> <b>TAMBAH</b></a>
                                                    <input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable4" >
                                                    <i class="feather-search"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover centered">
                                                <thead>
                                                    <tr>
                                                        <th v-for="column in columns4" :key="column.name" style="max-width: 20px;" @click="sortTable3(column.data)">
                                                            {{ column.name }}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="pekerjaan.length == 0">
                                                    <tr>
                                                        <td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <template v-for="item in paginatedItem4" :key="item.id">
                                                    <tr v-if="item.status != 99">
                                                        <td>
                                                            {{ item.jenis }}<br/>
                                                        </td>
                                                        <td>
                                                            <BBadge pill variant="primary" style="font-size: small;"><b>{{ item.nomor }}</b></BBadge><br/>
                                                            <span style="font-size: smaller;">{{ item.tanggal }}</span>
                                                        </td>
                                                        <td>
                                                            {{ item.jabatan }}<br/>
                                                            <span style="font-size: smaller;">{{ item.satker }}</span>
                                                        </td>
                                                        <td>
                                                            {{ item.golongan }}<br/>
                                                        </td>
                                                        <td>
                                                            <BButton pill size="sm" variant="danger" @click.prevent="deleteDoc(item.id,'golongan')"><b><i-fontisto-trash /> HAPUS</b></BButton>&nbsp;&nbsp;
                                                            <BButton pill size="sm" variant="outline-primary" @click.prevent="jDetail(item.id)"><b><i-mdi-call-to-action /> DETAIL</b></BButton>
                                                        </td>
                                                    </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--Pagination--> 
                                        <div class="blog-pagination">
                                            <nav>
                                                <ul class="pagination">
                                                    <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                                    </li>
                                                    <li class="justify-content-center pagination-center"> 
                                                        <div class="pagelink">
                                                            <ul>
                                                                <li v-for="page in displayedPages3" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                                </li>
                                                                <li class="page-item" :class="{'disabled': currentPage === totalPages3}">
                                                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                                </li>
                                                            </ul>
                                                        </div>													
                                                    </li>													
                                                    <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages3}">
                                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <!--/Pagination-->

                                    </div>
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 12" ref="scroll1st">
                            <div class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <div class="row centered">
                                <div v-for="item in files" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered">
                                    <div class="media-image" v-b-tooltip="'Upload Hasil Scan Dokumennya'">
                                        <h6 class="media-title">{{ item.nama }}</h6>
                                            <img v-if="item.filename == null || item.filename == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(item.filename)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div class="settings-upload-btn">
                                            <input id="file" type="file" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id,$event)">
                                            <label v-if="!loadingfile[item.id]" for="file" class="file-upload">
                                                <span v-if="item.filename == null || item.filename == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="item.filename != null && item.filename != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile(item.id)">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<!------------------------------------------------------------------------------------------------>
                        <div v-else-if="detail == 22" ref="scroll1st">
                            <div class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(2)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <h3 class="centered"> :: Detail Pendidikan ::</h3>
                            <br/>
                            <div class="row centered">
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Scan Ijazah</h6>
                                            <img v-if="datap.files == null || datap.files == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.files)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['ijazah']" @change="onFilePendidikan(datap.id,'ijazah',$event)">
                                            <label v-if="!loadingfile['ijazah']" for="file" class="file-upload">
                                                <span v-if="datap.files == null || datap.files == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.files != null && datap.files != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id,'ijazah')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Scan Transkrip Nilai</h6>
                                            <img v-if="datap.files_transkrip == null || datap.files_transkrip == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.files_transkrip)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div  class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['transkrip']" @change="onFilePendidikan(datap.id,'transkrip',$event)">
                                            <label v-if="!loadingfile['transkrip']" for="file" class="file-upload">
                                                <span v-if="datap.files_transkrip == null || datap.files_transkrip == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.files_transkrip != null && datap.files_transkrip != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id,'transkrip')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="card dash-cards">
                                    <b-form @submit.prevent="updatePendidikan">
                                    <div class="card-body">
                                        <div class="profile-form"> 
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jenjang Pendidikan</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-award" style="font-size:medium;"></i>
                                                                <b-form-select id="telp" v-model="datap.jenjang" class="form-control" style="padding-left:40px;">
                                                                    <option value='0' disabled>--Pilih Salah Satu--</option>
                                                                    <option value="SD" >Sekolah Dasar (SD)</option>
                                                                    <option value="SMP" >Sekolah Menengah Pertama (SLTP/SMP)</option>
                                                                    <option value="SMA" >Sekolah Menengah Atas (SLTA/SMA)</option>
                                                                    <option value="SMK" >Sekolah Menengah Kejuruan (SMK)</option>
                                                                    <option value="D-1" >Diploma-1 (D-1)</option>
                                                                    <option value="D-2" >Diploma-2 (D-2)</option>
                                                                    <option value="D-3" >Diploma-3 (D-3)</option>
                                                                    <option value="D-4" >Diploma-4 (D-4)</option>
                                                                    <option value="S-1" >Strata-1 (S-1)</option>
                                                                    <option value="S-2" >Strata-2 (S-2)</option>
                                                                    <option value="S-3" >Strata-3 (S-3)</option>
                                                                </b-form-select>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jurusan</label>
                                                            <div class="group-img">
                                                                <i class="feather-anchor"></i>
                                                                <b-form-input id="jurusan" v-model="datap.jurusan" type="text" class="form-control" placeholder="Jurusan Pendidikan" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Sekolah/Universitas</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-school"></i>
                                                                <b-form-input id="instansi" v-model="datap.instansi" type="text" class="form-control" placeholder="Asal Sekolah/Universitas"/>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Lulus</label>
                                                            <div class="group-img">
                                                                <i class="fa fa-bank"></i>
                                                                <VueDatePicker v-model="datap.tanggal_lulus" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Lulus" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Ijazah</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-bookmark"></i>
                                                                <b-form-input id="nomorijazah" v-model="datap.nomor_ijazah" type="text" class="form-control" placeholder="Nomor Ijazah"/>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Ijazah</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-calender"></i>
                                                                <VueDatePicker v-model="datap.tanggal_ijazah" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Ijazah" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>	
                                        </div>
                                        <br>
                                        <div class="text-center">
                                        <b-button variant="primary" type="submit" :disabled="loadingpd"> 
                                            <span v-if="!loadingpd"><i class="fa fa-address-card" aria-hidden="true"></i><b>&nbsp; UPDATE</b></span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Ke Kemendikbud Dulu Gan...</span>
                                        </b-button>
                                        </div>
                                    </div>
                                </b-form>								
                                </div>
                            </div>
                        </div>

                        <div v-else-if="detail == 32" ref="scroll1st">
                            <div class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(3)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <h3 class="centered"> :: Detail Pekerjaan/Jabatan ::</h3>
                            <br/>
                            <div class="row centered">
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Surat Keputusan (SK)</h6>
                                            <img v-if="datap.file_sk == null || datap.file_sk == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.file_sk)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['sk']" @change="onFilePekerjaan(datap.id,'sk',$event)">
                                            <label v-if="!loadingfile['sk']" for="file" class="file-upload">
                                                <span v-if="datap.file_sk == null || datap.file_sk == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.file_sk != null && datap.file_sk != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id,'sk')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Surat Pernyataan Melaksanakan Tugas (SPMT)</h6>
                                            <img v-if="datap.file_spmt == null || datap.file_spmt == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.file_spmt)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div  class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['spmt']" @change="onFilePekerjaan(datap.id,'spmt',$event)">
                                            <label v-if="!loadingfile['spmt']" for="file" class="file-upload">
                                                <span v-if="datap.file_spmt == null || datap.file_spmt == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.file_spmt != null && datap.file_spmt != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id, 'spmt')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Surat Pernyataan Menduduki Jabatan (SPMJ)</h6>
                                            <img v-if="datap.file_spmj == null || datap.file_spmj == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.file_spmj)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div  class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['spmj']" @change="onFilePekerjaan(datap.id,'spmj',$event)">
                                            <label v-if="!loadingfile['spmj']" for="file" class="file-upload">
                                                <span v-if="datap.file_spmj == null || datap.file_spmj == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.file_spmj != null && datap.file_spmj != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id, 'spmj')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Surat Pernyataan Pelantikan (SPP)</h6>
                                            <img v-if="datap.file_spp == null || datap.file_spp == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.file_spp)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div  class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['spp']" @change="onFilePekerjaan(datap.id,'spp',$event)">
                                            <label v-if="!loadingfile['spp']" for="file" class="file-upload">
                                                <span v-if="datap.file_spp == null || datap.file_spp == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.file_spp != null && datap.file_spp != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id, 'spp')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="user.asn == 'pppk'" class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Surat Kontrak Kerja</h6>
                                            <img v-if="datap.file_kontrak == null || datap.file_kontrak == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.file_kontrak)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div  class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['kontrak']" @change="onFilePekerjaan(datap.id,'kontrak',$event)">
                                            <label v-if="!loadingfile['kontrak']" for="file" class="file-upload">
                                                <span v-if="datap.file_kontrak == null || datap.file_kontrak == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.file_kontrak != null && datap.file_kontrak != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFileDoc(datap.id, 'kontrak')">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="card dash-cards">
                                    <b-form @submit.prevent="updatePekerjaan">
                                    <div class="card-body">
                                        <div class="profile-form"> 
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor SK</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-book"></i>
                                                                <b-form-input id="nosk" v-model="datap.no_sk" type="text" class="form-control" placeholder="Nomor Surat Keputusan(SK)" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal SK</label>
                                                            <div class="group-img">
                                                                <i class="feather-calender"></i>
                                                                <VueDatePicker v-model="datap.tgl_sk" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Surat Keputusan(SK)" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Penandatangan SK {{ datap.ttd_sk }}</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-pen"></i>
                                                                <b-form-select id="ttdsk" v-model="datap.ttd_sk" class="form-control" style="padding-left:40px">
                                                                    <option value='' disabled>--Pilih Salah Satu--</option>
                                                                    <option value="Menteri Agama">Menteri Agama RI</option>
                                                                    <option value="Kakanwil">Kepala Kantor Wilayah Kemenag Provinsi</option>
                                                                    <option value="Kakankemenag">Kepala Kantor Kemenag Kabupaten</option>
                                                                    <option value="Kepala">Kepala Sekolah/Madrasah/KUA</option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Golongan / Ruang</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-pen"></i>
                                                                <b-form-select id="golongan" v-model="datap.golongan" class="form-control" style="padding-left:40px">
                                                                    <option value="" disabled>---Pilih Salah Satu---</option>
                                                                    <option value="none" disabled>-----Golongan I (Juru)-----</option>
                                                                    <option value="1a">I/a | Juru Muda</option>
                                                                    <option value="1b">I/b | Juru Muda Tingkat 1</option>
                                                                    <option value="1c">I/c | Juru</option>
                                                                    <option value="1d">I/d | Juru Tingkat 1</option>
                                                                    <option value="none" disabled>&nbsp;</option>
                                                                    <option value="none" disabled>-----Golongan II (Pengatur)-----</option>
                                                                    <option value="2a">II/a | Pengatur Muda</option>
                                                                    <option value="2b">II/b | Pengatur Muda Tingkat 1</option>
                                                                    <option value="2c">II/c | Pengatur</option>
                                                                    <option value="2d">II/d | Pengatur Tingkat 1</option>
                                                                    <option value="none" disabled>&nbsp;</option>
                                                                    <option value="none" disabled>-----Golongan III (Penata)-----</option>
                                                                    <option value="3a">III/a | Penata Muda</option>
                                                                    <option value="3b">III/b | Penata Muda Tingkat 1</option>
                                                                    <option value="3c">III/c | Penata</option>
                                                                    <option value="3d">III/d | Penata Tingkat 1</option>
                                                                    <option value="none" disabled>&nbsp;</option>
                                                                    <option value="none" disabled>-----Golongan IV (Pembina)-----</option>
                                                                    <option value="4a">IV/a | Pembina</option>
                                                                    <option value="4b">IV/b | Pembina Tingkat 1</option>
                                                                    <option value="4c">IV/c | Pembina Utama Muda</option>
                                                                    <option value="4d">IV/d | Pembina Utama Madya</option>
                                                                    <option value="4e">IV/e | Pembina Utama</option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Keterangan SK</label>
                                                            <div class="group-img">
                                                                <b-form-textarea id="nosk" v-model="datap.keterangan" type="text" class="form-control" placeholder="Deskripsikan sedikit tentang SK ini"></b-form-textarea>
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor SPMT</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-map"></i>
                                                                <b-form-input id="spmt" v-model="datap.no_spmt" type="text" class="form-control" placeholder="Nomor SPMT" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal SPMT</label>
                                                            <div class="group-img">
                                                                <i class="feather-calender"></i>
                                                                <VueDatePicker v-model="datap.tgl_spmt" format="dd MMMM yyyy" auto-apply placeholder="Tanggal SPMT" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor SPMJ</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-paperclip"></i>
                                                                <b-form-input id="spmj" v-model="datap.no_spmj" type="text" class="form-control" placeholder="Nomor SPMJ" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal SPMJ</label>
                                                            <div class="group-img">
                                                                <i class="feather-calender"></i>
                                                                <VueDatePicker v-model="datap.tgl_spmj" format="dd MMMM yyyy" auto-apply placeholder="Tanggal SPMJ" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor SPP</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-tag"></i>
                                                                <b-form-input id="spp" v-model="datap.no_spp" type="text" class="form-control" placeholder="Nomor SPP" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal SPP</label>
                                                            <div class="group-img">
                                                                <i class="feather-calender"></i>
                                                                <VueDatePicker v-model="datap.tgl_spp" format="dd MMMM yyyy" auto-apply placeholder="Tanggal SPP" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div v-if="user.asn === 'pppk'" class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Kontrak Kerja</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-file-signature"></i>
                                                                <b-form-input id="kontrak" v-model="datap.no_kontrak" type="text" class="form-control" placeholder="Nomor Kontrak Kerja" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Kontrak Kerja</label>
                                                            <div class="group-img">
                                                                <i class="feather-calender"></i>
                                                                <VueDatePicker v-model="datap.tgl_kontrak" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Kontrak Kerja" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Mulai Tugas (TMT)</label>
                                                            <div class="group-img">
                                                                <i class="feather-business-time"></i>
                                                                <VueDatePicker v-model="datap.tmt" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Mulai Melaksanakan Tugas" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Mulai Bertugas di Unit Kerja</label>
                                                            <div class="group-img">
                                                                <i class="feather-business-time"></i>
                                                                <VueDatePicker v-model="datap.tmt_satker" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Mulai Melaksanakan Tugas di Unit Kerja" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jabatan</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-user-tag"></i>
                                                                <b-form-select v-model="datap.jabatan" class="form-control" @input="gantiJabatan" style="padding-left:40px">
                                                                    <b-form-select-option v-for="list in listj" :value="list.jabatan">{{list.jabatan}}</b-form-select-option>
                                                                    <b-form-select-option value="other">--Jabatan Lainnya--</b-form-select-option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="input-jabatan" class="col-lg-6 col-md-6" style="display:none;">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Kategori Jabatan</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-user-tag"></i>
                                                                <b-form-select v-model="datap.kategori_jabatan" class="form-control" @input="inputJabatan" style="padding-left:40px">
                                                                    <b-form-select-option value='' disabled selected>--Pilih Salahsatu--</b-form-select-option>
                                                                    <b-form-select-option value="adm">Staff / Pegawai / Administrasi</b-form-select-option>
                                                                    <b-form-select-option value="guru">Tenaga Guru</b-form-select-option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="nama-jabatan" class="col-lg-6 col-md-6" style="display:none;">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nama Jabatan</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-file-signature"></i>
                                                                <b-form-input id="nama_jabatan" v-model="datap.nama_jabatan" type="text" class="form-control" placeholder="Nama Jabatan" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Unit Kerja</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-school"></i>
                                                                <b-form-select v-model="datap.dept_id" class="form-control" @input="gantiSatker" style="padding-left:40px">
                                                                    <b-form-select-option value="">--Pilih Salah Satu--</b-form-select-option>
                                                                    <b-form-select-option v-for="list in listd" :value="list.id">{{list.nama}}</b-form-select-option>
                                                                </b-form-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="datap.dept_id == 999" id="input-satker" class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nama Unit Kerja</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-file-signature"></i>
                                                                <b-form-input id="satker" v-model="datap.satker" type="text" class="form-control" placeholder="Nama Unit Kerja" />
                                                            </div>
                                                        </div>
                                                    </div>							
                                                </div>
                                        </div>
                                        <br>
                                        <div class="text-center">
                                        <b-button variant="primary" type="submit" :disabled="loadingpd"> 
                                            <span v-if="!loadingpd"><i class="fa fa-address-card" aria-hidden="true"></i><b>&nbsp; UPDATE</b></span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Ke Kankemenag Dulu Gan...</span>
                                        </b-button>
                                        </div>
                                    </div>
                                </b-form>								
                                </div>
                            </div>
                        </div>

                        <div v-else-if="detail == 42" ref="scroll1st">
                            <div class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(2)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div><hr/>
                            <h3 class="centered"> :: Detail Golongan ::</h3>
                            <br/>
                            <div class="row centered">
                                <div class="col-lg-3 col-md-3 featured-img1 centered">
                                    <div class="media-image">
                                        <h6 class="media-title">Scan File</h6>
                                            <img v-if="datap.files == null || datap.files == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(datap.files)" />
                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                            <p class="my-4">Cek File!</p>
                                        </BModal>
                                        <hr/>
                                        <div class="settings-upload-btn">
                                            <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['ijazah']" @change="onFilePendidikan(datap.id,'ijazah',$event)">
                                            <label v-if="!loadingfile['ijazah']" for="file" class="file-upload">
                                                <span v-if="datap.files == null || datap.files == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                            </label>
                                            <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                        </div>
                                        <br/>
                                        <div>
                                            <BButton v-if="datap.files != null && datap.files != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteIjazah(datap.id)">
                                                <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                            </BButton>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="card dash-cards">
                                    <b-form @submit.prevent="updateGolongan">
                                    <div class="card-body">
                                        <div class="profile-form"> 
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Jenis SK</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-award" style="font-size:medium;"></i>
                                                                <b-form-select id="telp" v-model="datap.jenis" class="form-control" style="padding-left:40px;">
                                                                    <option value='0' disabled>--Pilih Salah Satu--</option>
                                                                    <option value='SK Kenaikan Pangkat'>SK Kenaikan Pangkat</option>
                                                                </b-form-select>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor SK</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-bookmark"></i>
                                                                <b-form-input id="nomor" v-model="datap.nomor" type="text" class="form-control" placeholder="Nomor SK"/>													
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal SK</label>
                                                            <div class="group-img">
                                                                <i class="fa fa-bank"></i>
                                                                <VueDatePicker v-model="datap.tanggal" format="dd MMMM yyyy" auto-apply placeholder="Tanggal SK" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Pangkat/Golongan</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-school"></i>
                                                                <b-form-input id="golongan" v-model="datap.golongan" type="text" class="form-control" placeholder="Pangkat / Golongan"/>													
                                                            </div>
                                                        </div>
                                                    </div>									
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Nomor Ijazah</label>
                                                            <div class="pass-group group-img">
                                                                <i class="fas fa-bookmark"></i>
                                                                <b-form-input id="nomorijazah" v-model="datap.nomor_ijazah" type="text" class="form-control" placeholder="Nomor Ijazah"/>													
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="form-group">
                                                            <label class="col-form-label">Tanggal Ijazah</label>
                                                            <div class="group-img">
                                                                <i class="fas fa-calender"></i>
                                                                <VueDatePicker v-model="datap.tanggal_ijazah" format="dd MMMM yyyy" auto-apply placeholder="Tanggal Ijazah" />
                                                            </div>
                                                        </div>
                                                    </div>											
                                                </div>	
                                        </div>
                                        <br>
                                        <div class="text-center">
                                        <b-button variant="primary" type="submit" :disabled="loadingpd"> 
                                            <span v-if="!loadingpd"><i class="fa fa-address-card" aria-hidden="true"></i><b>&nbsp; UPDATE</b></span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Ke Kemendikbud Dulu Gan...</span>
                                        </b-button>
                                        </div>
                                    </div>
                                </b-form>								
                                </div>
                            </div>
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
            title: "Data Pegawai",
            text: "Home",
            text1: "Data Pegawai",
            name: "/",
            loadingpp: false,
            loadingpf: false,
            loadingpd: false,
            loadingfile: [],
            detail: 0,
            userx: JSON.parse(localStorage.getItem('user')),
            user: [],
            files: [],
            userdefault: [],
            imageFoto: null,
            imageUrl: null,
            columns2: [
				{ name: 'Jenjang', data: 'jenjang' },
				{ name: 'Nomor Ijazah', data: 'nomor_ijazah' },
				{ name: 'Tanggal Lulus', data: 'tanggal_lulus' },
				{ name: 'Instansi', data: 'Instansi' },
				{ name: 'Action', data: 'action' },
			],
            columns3: [
				{ name: 'Nomor SK', data: 'no_sk' },
				{ name: 'Unit Kerja', data: 'satker' },
				{ name: 'Jabatan', data: 'jabatan' },
				{ name: 'TMT Kerja', data: 'tmt' },
				{ name: 'Action', data: 'action' },
			],
            columns4: [
				{ name: 'Jenis SK', data: 'jenis_sk' },
				{ name: 'Nomor', data: 'nomor' },
				{ name: 'Unit Kerja', data: 'satker' },
				{ name: 'Golongan', data: 'golongan' },
				{ name: 'Action', data: 'action' },
			],
            keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			listj: [],
			listd: [],
			itemsPerPage: 12,
        	currentPage: 1,
            pendidikan: [],
			pendidikan0: [],
			datap: [],
            pekerjaan: [],
			pekerjaan0: [],
			dataj: [],
            golongan: [],
			golongan0: [],
			datag: [],
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.pendidikan.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
			},
    	paginatedItem() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.pendidikan.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.pendidikan.length / this.itemsPerPage);
        },
//--------------------------------------------------------------------//
        sortedData3() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.pekerjaan.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
			},
    	paginatedItem3() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.pekerjaan.slice(start, end);
		},
		displayedPages3() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages3() {
            return Math.ceil(this.pekerjaan.length / this.itemsPerPage);
        },
//--------------------------------------------------------------------//
        sortedData4() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.golongan.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
    	paginatedItem4() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.golongan.slice(start, end);
		},
		displayedPages4() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages4() {
            return Math.ceil(this.golongan.length / this.itemsPerPage);
        },
	},
    created() {
        this.opener(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        async opener(){
            this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/cekPersonalFile',{headers})
				
				if(response.data.success == true){
					this.user = response.data.user
                    this.files = response.data.files
                    this.pendidikan0 = response.data.pendidikan
                    this.pendidikan = response.data.pendidikan
                    this.pekerjaan0 = response.data.pekerjaan
                    this.pekerjaan = response.data.pekerjaan
                    this.userdefault = response.data.user
                    this.imageFoto= this.user.foto
                    this.imageUrl= this.user.avatar
                    this.listj= response.data.listj
                    this.listd= response.data.listd
				}else{
					this.$toast.fire({
						title: response.data.data,
						icon: 'error',
					})
				}
		
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
        changedetail(id){
            this.detail = id;
            this.$nextTick(() => {
                this.$refs.scroll1st.scrollIntoView();
            });
        },

        onFileSelected(event) {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (event) => {
			this.imageUrl = event.target.result
			this.imageName = file.name
			this.uploadPP();
		}

		reader.readAsDataURL(file)
		},

        onFileChange(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                
                if(itemId == 1){
                    if(file.size > 2560000){
                    this.$toast.fire({
                        title: "File Tidak Boleh lebih dari 2MB !",
                        icon: "warning"
                    });
                    }else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg'){
                        this.$toast.fire({
                            title: "File harus tipe Image/Gambar(.png .jpeg .jpg) !",
                            icon: "warning"
                        });
                    }else{
                        this.uploadDoc(itemId)
                    }
                }else{
                    if(file.size > 2560000){
                        this.$toast.fire({
                            title: "File Tidak Boleh lebih dari 2MB !",
                            icon: "warning"
                        });
                    }else if(file.type != 'application/pdf'){
                        this.$toast.fire({
                            title: "File harus tipe .PDF !",
                            icon: "warning"
                        });
                    }else{
                        this.uploadDoc(itemId)
                    }
                }   
            }

            reader.readAsDataURL(file)
		},
		async uploadPP() {
			try{
				this.loadingpp = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/updatePP',{
                    id: this.user.id,
					filex: this.imageUrl
				}, {headers})
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpp = false
			}
		},

		async updateProfil() {
			try{
				this.loadingpf = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/saveProfil',{
					id: this.user.id,
                    nama: this.user.name,
                    nik: this.user.nip,
                    kk: this.user.kk,
                    npwp: this.user.npwp,
                    rekening: this.user.rekening,
					telp: this.user.telp,
					email: this.user.email,
					pekerjaan: this.user.pekerjaan,
					jk: this.user.jk,
					nikah: this.user.nikah,
					jenis_pjob: this.user.jenis_pjob,
					pjob: this.user.pjob,
					jml_anak: this.user.jml_anak,
					req_tunjangan: this.user.req_tunjangan,
					bio: this.user.bio,
					facebook: this.user.facebook,
					twitter: this.user.twitter,
					linkedin: this.user.linkedin,
					instagram: this.user.instagram,
				}, {headers})
				
				if(response.data.success == true){
                    this.user = response.data.user
                    this.userdefault = response.data.user

					this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.changedetail(12)
				}else{
                    let list=[];
                    $.each(response.data.valid, function(key, value) {
                        list.push(value+'<br/>');
                    });

                    this.$toast.fire({
                        title: list,
                        icon: 'error',
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpf = false
			}
		},

        async uploadDoc(itemId) {
            try{
                this.loadingfile[itemId] = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/uploadDoc',{
                    userid: this.user.id,
                    id: itemId,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.files = response.data.files
                }
                
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[itemId] = false
			}
        },
        openFile(item) {
            
            let frame = null;
            let isPDF = item.toLowerCase().endsWith('.pdf');
            let isWord = item.toLowerCase().endsWith('.doc') || item.toLowerCase().endsWith('.docx');
            
            if(isWord){
                frame = '<iframe src="https://docs.google.com/gview?url='+ item +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else{
                frame = '<iframe src="'+ item +'" width="100%" height="550"></iframe>'
            }

            if (window.innerWidth < 768) {
                this.$swal.fire({
                    width: "100%",
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }else{
                this.$swal.fire({
                    width: "50%",
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }
        },
        async deleteFile(itemid){
            this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda Tidak bisa untuk Membatalkannya!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Hapus File ini!",
                preConfirm: async (deleteFile) => {
                    try {
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/deleteFile',{
                            userid: this.user.id,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            this.files = response.data.files
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => this.$swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        },
        aksiDetail(itemid){
            if(itemid == 'new'){
                this.datap = {
                    id: 'new',
                    jenjang: 0
                }
            }else{
                this.datap = this.pendidikan.find(obj => {
                    return obj.id === itemid
                })
            }
            
            this.changedetail(22)
        },
        jDetail(itemid){
            if(itemid == 'new'){
                this.datap = {
                    id: 'new',
                    satker: this.user.dept_id,
                    jabatan: this.user.pekerjaan,
                }
            }else{
                this.datap = this.pekerjaan.find(obj => {
                    return obj.id === itemid
                })
            }
            
            this.changedetail(32)
        },
        gDetail(itemid){
            if(itemid == 'new'){
                this.datap = {
                    id: 'new',
                    satker: this.user.dept_id,
                    jabatan: this.user.pekerjaan,
                }
            }else{
                this.datap = this.golongan.find(obj => {
                    return obj.id === itemid
                })
            }
            
            this.changedetail(42)
        },
        onFilePendidikan(itemId, tipe, event) {
            
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                
                if(file.size > 2560000){
                    this.$toast.fire({
                        title: "File Tidak Boleh lebih dari 2MB !",
                        icon: "warning"
                    });
                }else if(file.type != 'application/pdf'){
                    this.$toast.fire({
                        title: "File harus tipe .PDF !",
                        icon: "warning"
                    });
                }else{
                    this.uploadFile(itemId,tipe)
                }
            }

            reader.readAsDataURL(file)
		},
        onFilePekerjaan(itemId, tipe, event) {
            
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                
                if(file.size > 2560000){
                    this.$toast.fire({
                        title: "File Tidak Boleh lebih dari 2MB !",
                        icon: "warning"
                    });
                }else if(file.type != 'application/pdf'){
                    this.$toast.fire({
                        title: "File harus tipe .PDF !",
                        icon: "warning"
                    });
                }else{
                    this.uploadFilePJ(itemId,tipe)
                }
            }

            reader.readAsDataURL(file)
		},
        async uploadFile(itemId,tipe) {
            try{
                this.loadingfile[tipe] = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/uploadFile',{
                    userid: this.user.id,
                    id: itemId,
                    tipe: tipe,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.pendidikan0 = response.data.pendidikan
                    this.pendidikan = response.data.pendidikan

                    if(itemId == 'new'){
                        itemId = response.data.update
                    }

                    this.datap = this.pendidikan.find(obj => {
                        return obj.id === itemId
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[tipe] = false
			}
        },
        async uploadFilePJ(itemId,tipe) {
            try{
                this.loadingfile[tipe] = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/uploadFilePJ',{
                    userid: this.user.id,
                    id: itemId,
                    tipe: tipe,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.pekerjaan0 = response.data.pekerjaan
                    this.pekerjaan = response.data.pekerjaan

                    if(itemId == 'new'){
                        itemId = response.data.update
                    }

                    this.datap = this.pekerjaan.find(obj => {
                        return obj.id === itemId
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[tipe] = false
			}
        },
        async updatePendidikan() {
        try {
            this.loadingpd = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/savePendidikan',{
					userid: this.user.id,
                    id: this.datap.id,
                    jenjang: this.datap.jenjang,
                    jurusan: this.datap.jurusan,
                    instansi: this.datap.instansi,
                    tanggal_lulus: this.datap.tanggal_lulus,
                    nomor_ijazah: this.datap.nomor_ijazah,
                    tanggal_ijazah: this.datap.tanggal_ijazah,
				}, {headers})
				
				if(response.data.success == true){
                    this.pendidikan0 = response.data.pendidikan
                    this.pendidikan = response.data.pendidikan

					this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.changedetail(2)
				}else{
                    let list=[];
                    $.each(response.data.valid, function(key, value) {
                        list.push(value+'<br/>');
                    });

                    this.$toast.fire({
                        title: list,
                        icon: 'error',
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpd = false
			}
		},
        gantiJabatan(){
            if(event.target.value == "other"){
                this.datap.kategori_jabatan = ''
                $('#input-jabatan').show()
            }else{
                $('#input-jabatan').hide()
                $('#nama-jabatan').hide()
            }
        },
        gantiSatker(){
            if(event.target.value == 999){
                this.datap.satker = ''
                $('#input-satker').show()
            }else{
                $('#input-satker').hide()
            }
        },
        inputJabatan(){
            if(event.target.value != null && event.target.value != "x"){
                $('#nama-jabatan').show()
            }else{
                $('#nama-jabatan').hide()
            }
        },
        async updatePekerjaan() {
        try {
            this.loadingpd = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/savePekerjaan',{
					userid: this.user.id,
                    id: this.datap.id,
                    no_sk: this.datap.no_sk,
                    tgl_sk: this.datap.tgl_sk,
                    ttd_sk: this.datap.ttd_sk,
                    golongan: this.datap.golongan,
                    no_spmt: this.datap.no_spmt,
                    no_spmj: this.datap.no_spmj,
                    no_spp: this.datap.no_spp,
                    no_kontrak: this.datap.no_kontrak,
                    tgl_spmt: this.datap.tgl_spmt,
                    tgl_spmj: this.datap.tgl_spmj,
                    tgl_spp: this.datap.tgl_spp,
                    tgl_kontrak: this.datap.tgl_kontrak,
                    jabatan: this.datap.jabatan,
                    kategori_jabatan: this.datap.kategori_jabatan,
                    nama_jabatan: this.datap.nama_jabatan,
                    dept_id: this.datap.dept_id,
                    satker: this.datap.satker,
                    tmt: this.datap.tmt,
                    tmt_satker: this.datap.tmt_satker,
                    keterangan: this.datap.keterangan,
				}, {headers})
				
				if(response.data.success == true){
                    this.pekerjaan0 = response.data.pekerjaan
                    this.pekerjaan = response.data.pekerjaan
                    this.listj= response.data.listj

					this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.changedetail(3)
				}else{
                    let list=[];
                    $.each(response.data.valid, function(key, value) {
                        list.push(value+'<br/>');
                    });
                    
                    this.$toast.fire({
                        title: list,
                        icon: 'error',
                    })
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpd = false
			}
		},
        sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.pendidikan.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.pendidikan = this.pendidikan0;
			} else {
				this.pendidikan = this.pendidikan0.filter((item) => {
					return item.jenjang.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.nomor_ijazah.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal_ijazah.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal_lulus.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.jurusan.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.instansi.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        sortTable3(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.pekerjaan.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
        filterTable3() {
			if (this.keyword === '' || this.keyword == null) {
				this.pekerjaan = this.pekerjaan0;
			} else {
				this.pekerjaan = this.pekerjaan0.filter((item) => {
					return item.no_sk.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tgl_sk.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.unitkerja.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tjabatan.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tmt.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
        deleteDoc(item,tipe) {
			this.$swal.fire({
					title: 'Apakah anda yakin?',
					text: "Data akan dihapus secara permanen!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
                    showLoaderOnConfirm: true,
					confirmButtonText: 'Yes, Lanjut Hapus!'
					}).then((result) => {
					if (result.isConfirmed) {
						this.prosesDelete(item,tipe)
					}
			})
		},
        deleteFileDoc(item,tipe) {
			this.$swal.fire({
					title: 'Apakah anda yakin?',
					text: "Data akan dihapus secara permanen!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
                    showLoaderOnConfirm: true,
					confirmButtonText: 'Yes, Lanjut Hapus!'
					}).then((result) => {
					if (result.isConfirmed) {
						this.deleteFilePJ(item,tipe)
					}
			})
		},
		async prosesDelete(item,tipe) {
			this.loadingdel = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/deleteDoc',{
					userid: this.user.id,
                    id: item,
                    tipe: tipe
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
                    if(tipe == 'pendidikan'){
                        this.pendidikan0 = response.data.pendidikan
                        this.pendidikan = response.data.pendidikan
                    }else if(tipe == 'pekerjaan'){
                        this.pekerjaan0 = response.data.pekerjaan
                        this.pekerjaan = response.data.pekerjaan
                    }
				}else{
					this.$toast.fire({
						title: response.data.message,
						icon: 'error',
					})
				}
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingdel = false
			}
		},
        async deleteFilePJ(itemId,tipe) {
            try{
                this.loadingfile[tipe] = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/non/deleteFilePJ',{
                    userid: this.user.id,
                    id: itemId,
                    tipe: tipe,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })

                    if(tipe == 'sk' || tipe == 'spmt' || tipe == 'spmj' || tipe == 'spp' || tipe == 'kontrak'){
                        this.pekerjaan0 = response.data.pekerjaan
                        this.pekerjaan = response.data.pekerjaan

                        this.datap = this.pekerjaan.find(obj => {
                            return obj.id === itemId
                        })
                    }else if(tipe == 'ijazah' || tipe == 'transkrip'){
                        this.pendidikan0 = response.data.pendidikan
                        this.pendidikan = response.data.pendidikan

                        this.datap = this.pendidikan.find(obj => {
                            return obj.id === itemId
                        })
                    }
                }
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[tipe] = false
			}
        },
    }
}
</script>

<style>
.col-form-label{
    font-weight: bold;
}
</style>