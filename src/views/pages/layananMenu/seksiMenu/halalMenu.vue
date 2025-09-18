<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up" @click.prevent="showAlurInfo">
                                <img :src="$assets+'/img/ikon/73.png'" style="width:100%;" alt="car1">
                                <h6>Informasi Alur Sertifikasi Halal</h6>
                                <span>Informasi Alur Sertifikasi Halal</span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up" @click.prevent="showPersyaratanInfo">
                                <img :src="$assets+'/img/ikon/79.png'" style="width:100%;" alt="car1">
                                <h6>Persyaratan Sertifikasi Halal</h6>
                                <span>Informasi Persyaratan  Sertifikasi Halal</span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up" @click="tujuHalal()">
                                <img :src="$assets+'/img/ikon/80.png'" style="width:100%;" alt="car1">
                                <h6>Pendaftaran Sertifikasi Halal</h6>
                                <span>Kunjungi Website PTSP.Halal.Go.ID</span>
                                </a>
                            </div>
                        </div>
                        <div v-if="$route.params.id == 'umk'" class="col-lg-4 col-md-4 centered">
                            <router-link to='/umk/certhalal/domisili'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/74.png'" style="width:100%;" alt="car1">
                                <h6>Konsultasi dengan P3H</h6>
                                <span>Konsultasi dengan Petugas Pendamping Produk Halal (P3H)</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div v-else class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up" @click.prevent="showLPHInfo">
                                <img :src="$assets+'/img/ikon/75.png'" style="width:100%;" alt="car1">
                                <h6>Konsultasi dengan LPH</h6>
                                <span>Konsultasi dengan Lembaga Pemeriksa Halal (LPH)</span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up" @click.prevent="showHotlineInfo">
                                <img :src="$assets+'/img/ikon/76.png'" style="width:100%;" alt="car1">
                                <h6>Hotline Sertifikasi Halal</h6>
                                <span>Hubungi Badan Penyelenggara Jaminan Produk Halal (BPJPH)</span>
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
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            title: "Menu Pilihan",
            text: "Home",
            text1: "Sertifikasi Halal",
            name: "/",
        };
    },
    computed: {
        tujuHalal() {
            window.open('https://ptsp.halal.go.id/','_blank')
        }
	},
    methods: {
        getSwalWidth() {
            return window.innerWidth < 768 ? '100%' : '55%';
        },
        showAlurInfo() {
            if(this.$route.params.id == 'umk'){
                this.$swal.fire({
                    title: 'Informasi Alur Sertifikasi Halal',
                    width: this.getSwalWidth(),
                    html: `
                        <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="${this.$assets}/img/ikon/logohalal.png" alt="Logo Halal" style="width: 250px; height: auto;">
                            </div>
                            <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Alur Sertifikasi Halal Gratis (SEHATI):</h4>
                            <hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Pelaku Usaha</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Membuat akun melalui <b><a href='ptsp.halal.go.id' target=_blank>ptsp.halal.go.id</a></b></li>
                                    <li style="margin-bottom: 5px;">Mempersiapkan data permohonan sertifikasi halal dan memilih pendamping PPH</li>
                                    <li style="margin-bottom: 5px;">Melengkapi data permohonan bersama pendamping PPH</li>
                                    <li style="margin-bottom: 5px;">Mengajukan permohonan sertifikasi halal dengan pernyataan pelaku usaha melalui SIHALAL</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #e74c3c; margin-bottom: 10px;">Pendamping Proses Produk Halal (P3H)</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Pendamping PPH melakukan verifikasi dan validasi atas pernyataan pelaku usaha</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #27ae60; margin-bottom: 10px;">BPJPH</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">BPJPH melakukan verifikasi dan validasi secara sistem terhadap laporan hasil</li>
                                    <li style="margin-bottom: 5px;">Menerbitkan STTD (Surat Tanda Terima Dokumen)</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #f39c12; margin-bottom: 10px;">Komite Fatwa Produk Halal</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Menerima laporan hasil pendampingan proses produk halal yang telah terverifikasi secara sistem oleh BPJPH dan melakukan sidang fatwa untuk menetapkan kehalalan produk</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #27ae60; margin-bottom: 10px;">BPJPH</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Menerima ketetapan kehalalan produk</li>
                                    <li style="margin-bottom: 5px;">Menerbitkan sertifikasi halal</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Pelaku Usaha</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Mengunduh sertifikat halal melalui SIHALAL</li>
                                    <li style="margin-bottom: 5px;">Mengunduh label halal nasional untuk dicantumkan pada produk</li>
                                </ul>
                            </div>
                        </div>
                    `,
                    confirmButtonText: 'Tutup'
                });
            }else if(this.$route.params.id == 'non'){
                this.$swal.fire({
                    title: 'Informasi Alur Sertifikasi Halal',
                    width: this.getSwalWidth(),
                    html: `
                        <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="${this.$assets}/img/ikon/logohalal.png" alt="Logo Halal" style="width: 250px; height: auto;">
                            </div>
                            <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Alur Sertifikasi Halal Reguler:</h4>
                            <hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Pelaku Usaha</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Sebelum mendaftar pastikan pelaku usaha memiliki email aktif dan NIB Berbasis Risiko (jika belum, silahkan daftar atau migrasi NIB melalui <b><a href='https://oss.go.id' target="_blank">https://oss.go.id</a></b>)</li>
                                    <li style="margin-bottom: 5px;">Pelaku usaha membuat akun, kemudian mengajukan permohonan sertifikasi halal dengan mengisikan data dan mengunggah dokumen persyaratan melalui <b><a href='https://ptsp.halal.go.id/' target="_blank">https://ptsp.halal.go.id/</a></b> (SIHALAL)</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #27ae60; margin-bottom: 10px;">BPJPH</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">BPJPH memverifikasi kesesuaian data dan kelengkapan dokumen permohonan</li>
                                    <li style="margin-bottom: 5px;">BPJPH melakukan verifikasi pembayaran dan menerbitkan STTD (Surat Tanda Terima Dokumen) di SIHALAL</li>
                                    <li style="margin-bottom: 5px;">BPJPH menerbitkan Sertifikat Halal</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #e74c3c; margin-bottom: 10px;">LPH</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">LPH menghitung, menetapkan dan mengisikan biaya pemeriksaan di SIHALAL</li>
                                    <li style="margin-bottom: 5px;">LPH melakukan proses pemeriksaan (audit) dan mengunggah Laporan Pemeriksaan di SIHALAL</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #f39c12; margin-bottom: 10px;">Komisi Fatwa MUI/MPU Aceh/Komite Fatwa Produk Halal</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Komisi Fatwa MUI/MPU Aceh/Komite Fatwa Produk Halal melakukan Sidang Fatwa dan mengunggah Ketetapan Halal di SIHALAL</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Pelaku Usaha</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Pelaku Usaha melakukan pembayaran melalui virtual account sesuai dengan kode pembayaran yang tertera pada invoice di SIHALAL</li>
                                    <li style="margin-bottom: 5px;">Pelaku usaha mengunduh sertifikat halal di SIHALAL jika statusnya "<b>Terbit SH</b>"</li>
                                </ul>
                            </div>
                        </div>
                    `,
                    confirmButtonText: 'Tutup'
                });
            }
        },
        showLPHInfo() {
            this.$swal.fire({
                title: 'Konsultasi dengan LPH',
                width: this.getSwalWidth(),
                html: `
                    <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="${this.$assets}/img/ikon/logohalal.png" alt="Logo Halal" style="width: 250px; height: auto;">
                        </div>
                        <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Konsultasi dengan LPH</h4>
                        <hr/>
                        <div style="margin-bottom: 15px;">
                            <h5 style="color: #27ae60; margin-bottom: 10px;">Lembaga Pemeriksa Halal (LPH) Terdekat</h5>
                            <ul style="list-style-type: disc; padding-left: 20px;">
                                <li style="margin-bottom: 5px;"><strong>LPH Bersama Halal Madani</strong><br/><a href='https://bhmofficial.com/' target='_blank'>https://bhmofficial.com/</a></li>
                                <li style="margin-bottom: 5px;"><strong>LPH BSPJI Padang</strong><br/><a href='https://bspjipadang.kemenperin.go.id/profil-lembaga-pemeriksa-halal-lph/' target='_blank'>https://bspjipadang.kemenperin.go.id/profil-lembaga-pemeriksa-halal-lph/</a></li>
                                <li style="margin-bottom: 5px;"><strong>LPH Universitas Negeri Padang</strong><br/><a href='https://halal.unp.ac.id/lph/' target='_blank'>https://halal.unp.ac.id/lph/</a></li>
                            </ul>
                        </div><hr/>
                        <div style="margin-bottom: 15px;">
                            <h5 style="color: #3498db; margin-bottom: 10px;">Lembaga Pendamping Proses Produk Halal (LP3H) terdekat</h5>
                            <ul style="list-style-type: disc; padding-left: 20px;">
                                <li style="margin-bottom: 5px;"><strong>LP3H UIN Mahmud Yunus Batusangkar</strong><br/><a href='https://uinmybatusangkar.ac.id/lp3h' target='_blank'>https://uinmybatusangkar.ac.id/lp3h</a></li>
                            </ul>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Tutup'
            });
        },
        showHotlineInfo() {
            this.$swal.fire({
                title: 'Hotline Sertifikasi Halal',
                width: this.getSwalWidth(),
                html: `
                    <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="${this.$assets}/img/ikon/bpjph.png" alt="Logo BPJPH" style="width: 250px; height: auto;">
                        </div>
                        <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Badan Penyelenggara Jaminan Produk Halal (BPJPH)</h4>
                        <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 20px; font-weight: bold;">Republik Indonesia</h4>
                        <hr/>
                        <div style="margin-bottom: 15px; text-align: center;">
                            <h5 style="color: #27ae60; margin-bottom: 10px;">Kontak Layanan:</h5>
                            <ul style="list-style-type: none; padding-left: 0;">
                                <li style="margin-bottom: 10px;"><strong>Call Center : </strong> 176</li>
                                <li style="margin-bottom: 10px;"><strong>WhatsApp : </strong> <a href='https://wa.me/+628111421142' target=_blank>+62 811-1421-142</a></li>
                                <li style="margin-bottom: 10px;"><strong>Email : </strong> layanan@halal.go.id</li>
                            </ul>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Tutup'
            });
        },
        showPersyaratanInfo() {
            if(this.$route.params.id == 'umk'){
                this.$swal.fire({
                    title: 'Persyaratan Sertifikasi Halal',
                    width: this.getSwalWidth(),
                    html: `
                        <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="${this.$assets}/img/ikon/logohalal.png" alt="Logo Halal" style="width: 250px; height: auto;">
                            </div>
                            <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Persyaratan Sertifikasi Halal</h4>
                            <hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Persyaratan Sertifikasi Halal Gratis (SEHATI):</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Pelaku Usaha memiliki NIB dan termasuk skala usaha Mikro atau Kecil</li>
                                    <li style="margin-bottom: 5px;">Pelaku Usaha memiliki Akun di SIHALAL</li>
                                    <li style="margin-bottom: 5px;">Produk yang diajukan berupa barang dan tidak berisiko</li>
                                    <li style="margin-bottom: 5px;">Produk yang diajukan tidak menggunakan bahan berbahaya dan hanya menggunakan bahan yang sudah dipastikan kehalalannya
                                        <ul style="list-style-type: square; padding-left: 20px; margin-top: 5px;">
                                            <li style="margin-bottom: 3px;">Dibuktikan dengan Sertifikat Halal, atau</li>
                                            <li style="margin-bottom: 3px;">Termasuk dalam daftar bahan sesuai KMA Nomor 1360 tentang Bahan yang Dikecualikan dari Kewajiban Bersertifikat Halal</li>
                                        </ul>
                                    </li>
                                    <li style="margin-bottom: 5px;">Proses Produksi secara sederhana dan dipastikan bebas dari kontaminasi najis dan bahan tidak halal</li>
                                    <li style="margin-bottom: 5px;">Menggunakan peralatan produksi dengan teknologi sederhana atau dilakukan secara manual dan/atau semi otomatis (usaha rumahan bukan usaha pabrik)</li>
                                    <li style="margin-bottom: 5px;">Telah diverifikasi kehalalannya oleh Pendamping Proses Produk Halal</li>
                                    <li style="margin-bottom: 5px;">Proses pengawetan produk dilakukan secara sederhana dan tidak menggunakan kombinasi metode pengawetan</li>
                                    <li style="margin-bottom: 5px;">Bersedia melengkapi dokumen pengajuan Sertifikasi Halal dengan mekanisme pernyataan mandiri secara online melalui SIHALAL</li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #e74c3c; margin-bottom: 10px;">Biaya Sertifikasi Halal Gratis (SEHATI):</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Untuk Sertifikasi Halal (SEHATI) <b>tidak dipungut biaya apapun</b> alias <b>GRATIS</b> selama kuota SEHATI masih tersedia</li>
                            </div><br/><br/><hr/>
                        </div>
                    `,
                    confirmButtonText: 'Tutup'
                });
            }else if(this.$route.params.id == 'non'){
                this.$swal.fire({
                    title: 'Persyaratan Sertifikasi Halal',
                    width: this.getSwalWidth(),
                    html: `
                        <div style="text-align: left; max-height: 400px; overflow-y: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 19px; line-height: 1.6;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="${this.$assets}/img/ikon/logohalal.png" alt="Logo Halal" style="width: 250px; height: auto;">
                            </div>
                            <h4 style="color: #2c3e50; margin-bottom: 20px; text-align: center; font-size: 24px; font-weight: bold;">Persyaratan Sertifikasi Halal</h4>
                            <hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #3498db; margin-bottom: 10px;">Persyaratan Sertifikasi Halal Reguler:</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;"><strong>Surat Permohonan</strong><br/>Format dapat diunduh di <a href='https://bpjph.halal.go.id/detail/informasi-1' target='_blank'>https://bpjph.halal.go.id/detail/informasi-1</a>. <br/>Bagi Pelaku Usaha Luar Negeri (PULN), surat permohonan dibuat oleh importir/perwakilan resmi dan harus melampirkan surat kuasa penunjukan importir/perwakilan resmi dari PULN</li>
                                    <li style="margin-bottom: 5px;"><strong>Formulir Pendaftaran</strong><br/>Format dapat diunduh di <a href='https://bpjph.halal.go.id/detail/informasi-1' target='_blank'>https://bpjph.halal.go.id/detail/informasi-1</a>. Khusus Jasa Penyembelihan wajib memiliki 2 nama Juru Sembelih Halal (Juleha) yang memiliki sertifikat pelatihan berbasis SKKNI dan/atau sertifikat kompetensi sebagai Juleha</li>
                                    <li style="margin-bottom: 5px;"><strong>Aspek Legal</strong><br/>NIB berbasis risiko<br/>Pelaku Usaha Luar Negeri : Lisensi Bisnis dan NIB importir/perwakilan resmi</li>
                                    <li style="margin-bottom: 5px;"><strong>Dokumen Penyelia Halal</strong>
                                        <ul style="list-style-type: square; padding-left: 20px; margin-top: 5px;">
                                            <li style="margin-bottom: 3px;">SK penetapan penyelia halal dari pimpiinan perusahaan</li>
                                            <li style="margin-bottom: 3px;">Kartu Identitas
                                                <ul style="list-style-type: lower-roman; padding-left: 20px; margin-top: 3px;">
                                                    <li style="margin-bottom: 2px;">Salinan KTP bagi penyelia Halal yang berdomisili di Indonesia</li>
                                                    <li style="margin-bottom: 2px;">Salinan paspor, izin tinggal tetap atau kartu identitas lainnya bagi Penyelia Halal yang berasal dari luar negeri</li>
                                                </ul>
                                            </li>
                                            <li style="margin-bottom: 3px;">Daftar riwayat Hidup</li>
                                            <li style="margin-bottom: 3px;">Sertifikat pelatihan dan/atau sertifikat kompetensi Penyelia Halal
                                                <ul style="list-style-type: lower-roman; padding-left: 20px; margin-top: 3px;">
                                                    <li style="margin-bottom: 2px;">Sertifikat pelatihan dan/atau sertifikat kompetensi penyelia halal untuk Pelaku Usaha mikro dan kecil</li>
                                                    <li style="margin-bottom: 2px;">Sertifikat pelatihan Penyelia Halal dan Sertifikat kompetensi Penyelia Halal bagi Pelaku Usaha menengah, besar, dan Luar Negeri</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li style="margin-bottom: 5px;"><strong>Daftar Nama Produk dan Bahan/Menu/Barang</strong><br/>Format dapat diunduh di <a href='https://bpjph.halal.go.id/detail/informasi-1' target='_blank'>https://bpjph.halal.go.id/detail/informasi-1</a></li>
                                    <li style="margin-bottom: 5px;"><strong>Proses pengolahan produk</strong><br/>Diagram alur atau deskripsi proses produksi</li>
                                    <li style="margin-bottom: 5px;"><strong>Manual SJPH</strong><br/>Format dapat diunduh di <a href='https://bpjph.halal.go.id/detail/informasi-1' target='_blank'>https://bpjph.halal.go.id/detail/informasi-1</a></li>
                                </ul>
                            </div><hr/>
                            <div style="margin-bottom: 15px;">
                                <h5 style="color: #e74c3c; margin-bottom: 10px;">Biaya Sertifikasi Halal Reguler:</h5>
                                <ul style="list-style-type: disc; padding-left: 20px;">
                                    <li style="margin-bottom: 5px;">Untuk Sertifikasi Halal Reguler, Silahkan kunjungi Link Berikut : <br/><br/><a href='https://bpjph.halal.go.id/kalkulator-biaya-sh/' target=_blank><b>https://bpjph.halal.go.id/kalkulator-biaya-sh/</b></li>
                            </div><br/><br/><hr/>
                        </div>
                    `,
                    confirmButtonText: 'Tutup'
                });
            }
        }
    }
}
</script>
