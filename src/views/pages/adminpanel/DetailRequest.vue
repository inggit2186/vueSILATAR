<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1"/>
            
            <div class="dashboard-content">		
			<div class="container">
                <div  ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <b-form>
                <div v-if="loading" class="text-center">
                    <hr>
                    <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                    <br>
                    <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                    <h3>::: Mencari Berkas Dulu :::</h3>
                    <hr>
                </div>
				<div v-else class="profile-content">
                    
                    <div v-if="datax" class="text-center">
                        <b-img :src="$assets+'/img/ikon/404nodata.png'" v-bind="mainProps" rounded width="350%"></b-img>
                        <hr>
                    </div>
				    <div v-else class="card media-section">
						    <div class="card-header">
							    <h4>DETAIL REQUEST</h4>
                                <hr/>
                                <div style="font-size:18px;float:right;">
                                        <BBadge v-if="request.status == 'DRAFT'" variant="light">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'UNCHECK'" variant="info">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'PENDING'" variant="warning">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DITERIMA'" variant="secondary">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DIPROSES'" variant="success">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'SUKSES'" variant="primary">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DITOLAK'" variant="danger">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'BATAL'" variant="dark">{{ request.status }}</BBadge>
                                </div>
                                <table class="detailhead">
                                    <tr>
                                        <td>No Request</td>
                                        <td> : </td>
                                        <td> <BBadge variant="info">{{ request.no_req }}</BBadge></td>
                                    </tr>
                                    <tr>
                                        <td>Seksi</td>
                                        <td> : </td>
                                        <td>{{ request.seksi }}</td>
                                    </tr>
                                    <tr>
                                        <td>Layanan</td>
                                        <td> : </td>
                                        <td>{{ request.judul }}</td>
                                    </tr>
                                    <tr>
                                        <td>Deskripsi</td>
                                        <td> : </td>
                                        <td>{{ request.deskripsi }}</td>
                                    </tr>
                                </table>
                                <hr/>
                                <div v-if="request.alur == '2'" class="step2 d-none d-md-block">
                                <ul>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-walking"></i>
                                        <div v-if="request.step >= 1" class="step first active">
                                            <p>1</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step first">
                                            <p>1</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Atasan Langsung</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-running"></i>
                                        <div v-if="request.step >= 2" class="step second active">
                                            <p>2</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step second">
                                            <p>2</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Kasubbag</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-booth"></i>
                                        <div v-if="request.step >= 3" class="step third active">
                                            <p>3</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step third">
                                            <p>3</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Kakankemenag</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-people-carry-box"></i>
                                        <div v-if="request.step >= 4" class="step fourth active">
                                            <p>4</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step fourth">
                                            <p>4</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DIPROSES<br/>&nbsp;</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-thumbs-up"></i>
                                        <div v-if="request.status == 'SUKSES' || request.status == 'DITOLAK' || request.status == 'BATAL'" class="step fifth active">
                                            <p>5</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step fifth">
                                            <p>5</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">SELESEI<br/>&nbsp;</p>
                                    </li>
                                </ul>
                                </div>
                                
                                <div v-else class="step2 d-none d-md-block">
                                    <ul>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-walking"></i>
                                        <div v-if="request.step >= 1" class="step first active">
                                            <p>1</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step first">
                                            <p>1</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Kasubbag</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-running"></i>
                                        <div v-if="request.step >= 2" class="step second active">
                                            <p>2</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step second">
                                            <p>2</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Kakankemenag</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-person-booth"></i>
                                        <div v-if="request.step >= 3" class="step third active">
                                            <p>3</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step third">
                                            <p>3</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DISETUJUI<br/>Kepala Seksi</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-people-carry-box"></i>
                                        <div v-if="request.step >= 4" class="step fourth active">
                                            <p>4</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step fourth">
                                            <p>4</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">DIPROSES<br/>&nbsp;</p>
                                    </li>
                                    <li>
                                        <i class="icons awesome fa-solid fa-thumbs-up"></i>
                                        <div v-if="request.status == 'SUKSES' || request.status == 'DITOLAK' || request.status == 'BATAL'" class="step fifth active">
                                            <p>5</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <div v-else class="step fifth">
                                            <p>5</p>
                                            <i class="awesome fa-solid fa-check"></i>
                                        </div>
                                        <p class="label centered">SELESEI<br/>&nbsp;</p>
                                    </li>
                                </ul>
                                </div>
                                <hr/>
                                <div v-if="request.status == 'DRAFT'" class="centered">
                                    <div v-if="!loadingRequest">
                                    <BButton block size="md" variant="warning" @click="newRequest()" :disabled="loadingRequest">
                                        <span><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Pengajuan</b></span>
                                    </BButton>
                                    </div>
                                    <div v-else class="centered">
                                        <i-svg-spinners-blocks-shuffle-3 />&nbsp; <h4>Harap Bersabar.....</h4>
                                    </div>
                                </div>
                                <div v-if="request.status == 'UNCHECK'" class="centered">
                                    <div v-if="!loadingRequest">
                                    <BButton block size="md" variant="warning" @click="updatePTSP('setuju')" :disabled="loadingRequest">
                                        <span><b><i-mingcute-check-2-fill /> &nbsp;&nbsp;SETUJU</b></span>
                                    </BButton>
                                    &nbsp;&nbsp;
                                    <BButton block size="md" variant="dark" @click="updatePTSP('tolak')" :disabled="loadingRequest">
                                        <span><b><i-fluent-emoji-high-contrast-cross-mark /> &nbsp;&nbsp;TOLAK</b></span>
                                    </BButton>
                                    &nbsp;&nbsp;
                                    <BButton block size="md" variant="danger" @click="updatePTSP('batal')" :disabled="loadingRequest">
                                        <span><b><i-ooui-cancel /> &nbsp;&nbsp;BATAL</b></span>
                                    </BButton>
                                    </div>
                                    <div v-else class="centered">
                                        <i-svg-spinners-blocks-shuffle-3 />&nbsp; <h4>Harap Bersabar.....</h4>
                                    </div>
                                </div>
                                <div v-else-if="request.status == 'PENDING' || request.status == 'DITERIMA' || request.status == 'DIPROSES'" class="centered">
                                    <div v-if="!loadingRequest">
                                    <BButton v-if="request.step == 3" block size="md" variant="warning" @click="updatePTSP('proses')" :disabled="loadingRequest">
                                        <span><b><i-ic-baseline-work-history /> &nbsp;&nbsp;PROSES</b></span>
                                    </BButton>
                                    <BButton v-else-if="request.step == 4" block size="md" variant="warning" @click="updatePTSP('sukses')" :disabled="loadingRequest">
                                        <span><b><i-solar-box-bold /> &nbsp;&nbsp;SELESEI</b></span>
                                    </BButton>
                                    <BButton v-else block size="md" variant="warning" @click="updatePTSP('setuju')" :disabled="loadingRequest">
                                        <span><b><i-mingcute-check-2-fill /> &nbsp;&nbsp;SETUJU</b></span>
                                    </BButton>
                                    &nbsp;&nbsp;
                                    <BButton block size="md" variant="dark" @click="updatePTSP('tolak')" :disabled="loadingRequest">
                                        <span><b><i-fluent-emoji-high-contrast-cross-mark /> &nbsp;&nbsp;TOLAK</b></span>
                                    </BButton>
                                    &nbsp;&nbsp;
                                    <BButton block size="md" variant="danger" @click="updatePTSP('batal')" :disabled="loadingRequest">
                                        <span><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Batalkan Request</b></span>
                                    </BButton>
                                     </div>
                                     <div v-else class="centered">
                                        <i-svg-spinners-blocks-shuffle-3 />&nbsp; <h4>Harap Bersabar ya gan!.....</h4>
                                    </div>
                                </div>
                                <div v-else-if="request.status == 'SUKSES' || request.status == 'BATAL' || request.status == 'DITOLAK'" class="centered">
                                    <div v-if="!loadingRequest">
                                    <BButton v-if="request.step == 4" block size="md" variant="dark" @click="updatePTSP('ubah')" :disabled="loadingRequest">
                                        <span><b><i-fluent-comment-edit-20-filled /> &nbsp;&nbsp;UBAH</b></span>
                                    </BButton>
                                     </div>
                                     <div v-else class="centered">
                                        <i-svg-spinners-blocks-shuffle-3 />&nbsp; <h4>Harap Bersabar ya gan!.....</h4>
                                    </div>
                                </div>
                                <br/>
							</div>
                            <div v-if="request.status == 'DIPROSES' || request.status == 'SUKSES'" class="card-body">
                                <div class="profile-content">
                                    <div class="messages-form">
                                        <div class="card">
                                            <div class="card-header text-center">
                                                <h3><u>Hasil Proses</u></h3>
                                                <span><p style="font-size:smaller;font-style: italic;">Isi Jika Proses Request mempunyai hasil/keluaran Surat</p></span>							
                                            </div>
                                            <br/>
                                            <div class="row">    
                                                <div v-if="request.status != 'SUKSES'" class="card-body">
                                                    <div class="form-group">
                                                        <label class="col-form-label">Nomor Surat</label>								    
                                                        <b-form-input v-model="hasil.no_surat" type="text" class="form-control pass-input" placeholder="Nomor Surat Keluaran"></b-form-input>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-form-label">Judul / Perihal</label>								    
                                                        <b-form-input v-model="hasil.perihal" type="text" class="form-control pass-input" placeholder="Perihal Surat"></b-form-input>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-form-label">Catatan / Deskripsi / Keterangan</label>								    
                                                        <b-form-textarea v-model="hasil.keterangan" type="text" class="form-control pass-input" :placeholder="keterangan"></b-form-textarea>
                                                    </div>
                                                </div>
                                                <div v-else-if="request.status == 'SUKSES'" class="card-body">
                                                    <div class="form-group">
                                                        <label class="col-form-label">Nomor Surat</label>								    
                                                        <b-form-input v-model="hasil.no_surat" type="text" class="form-control pass-input" placeholder="Nomor Surat Keluaran" readonly></b-form-input>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-form-label">Judul / Perihal</label>								    
                                                        <b-form-input v-model="hasil.perihal" type="text" class="form-control pass-input" placeholder="Perihal Surat" readonly></b-form-input>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-form-label">Catatan / Deskripsi / Keterangan</label>								    
                                                        <b-form-textarea v-model="hasil.keterangan" type="text" class="form-control pass-input" :placeholder="keterangan" readonly></b-form-textarea>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 featured-img1 centered">
                                                    <div class="media-image" v-b-tooltip="'Upload Surat Hasil Jika Ada'">
                                                        <h6 class="media-title">Hasil Surat / Surat Keluaran</h6>
                                                            <img v-if="hasil.surat == null || hasil.surat == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(hasil.surat)" />
                                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                            <p class="my-4">Cek File!</p>
                                                        </BModal>
                                                        <hr/>
                                                        <div v-if="request.status != 'SUKSES'">
                                                            <div class="settings-upload-btn">
                                                                <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['surat']" @change="onFileHasil('surat',$event)">
                                                                <label v-if="!loadingfile['surat']" for="file" class="file-upload">
                                                                    <span v-if="hasil.surat == null || hasil.surat == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                                    <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                                </label>
                                                                <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                            </div>
                                                            <br/>
                                                            <div>
                                                                <BButton v-if="hasil.surat != null && hasil.surat != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile('surat')">
                                                                    <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                                </BButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 featured-img1 centered">
                                                    <div class="media-image" v-b-tooltip="'Upload Surat Hasil Jika Ada'">
                                                        <h6 class="media-title">Lampiran</h6>
                                                            <img v-if="hasil.lampiran1 == null || hasil.lampiran1 == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(hasil.lampiran1)" />
                                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                            <p class="my-4">Cek File!</p>
                                                        </BModal>
                                                        <hr/>
                                                        <div v-if="request.status != 'SUKSES'">
                                                            <div  class="settings-upload-btn">
                                                                <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['lampiran1']" @change="onFileHasil('lampiran1',$event)">
                                                                <label v-if="!loadingfile['lampiran1']" for="file" class="file-upload">
                                                                    <span v-if="hasil.lampiran1 == null || hasil.lampiran1 == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                                    <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                                </label>
                                                                <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                            </div>
                                                            <br/>
                                                            <div>
                                                                <BButton v-if="hasil.lampiran1 != null && hasil.lampiran1 != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile('lampiran1')">
                                                                    <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                                </BButton>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 featured-img1 centered">
                                                    <div class="media-image" v-b-tooltip="'Upload Surat Hasil Jika Ada'">
                                                        <h6 class="media-title">Lampiran</h6>
                                                            <img v-if="hasil.lampiran2 == null || hasil.lampiran2 == 'NONE'" :src="$assets+'/img/ikon/filenotfound.png'" />
                                                            <img v-else :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(hasil.lampiran2)" />
                                                        <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                            <p class="my-4">Cek File!</p>
                                                        </BModal>
                                                        <hr/>
                                                        <div v-if="request.status != 'SUKSES'" >
                                                            <div class="settings-upload-btn">
                                                                <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile['lampiran2']" @change="onFileHasil('lampiran2',$event)">
                                                                <label v-if="!loadingfile['lampiran2']" for="file" class="file-upload">
                                                                    <span v-if="hasil.lampiran2 == null || hasil.lampiran2 == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                                    <span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                                </label>
                                                                <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                            </div>
                                                            <br/>
                                                            <div>
                                                                <BButton v-if="hasil.lampiran2 != null && hasil.lampiran2 != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile('lampiran2')">
                                                                    <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                                </BButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>			
                                </div>
                            </div>
                            <hr/>
                            <div class="card-body">
                                <div class="profile-content">
                                    <div class="messages-form">
                                        <div class="card">
                                            
                                            <div class="card-header text-center d-none d-md-block">
                                                <div style="font-size:18px;float:right;">
                                                <BButton v-if="!edit" block size="md" variant="danger" @click="ubahReq()" :disabled="loadingRequest">
                                                    <span><b><i-fa-solid-edit /> &nbsp;&nbsp;Ubah Data Pengajuan</b></span>
                                                </BButton>
                                                <BButton v-else block size="md" variant="warning" @click="updateRequest()" :disabled="loadingRequest">
                                                    <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Perubahan Data</b></span>
                                                    <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                                </BButton>
                                                </div>
                                                <h3><u>DETAIL DATA REQUEST</u></h3>							
                                            </div>
                                            <div class="card-header text-center d-block d-sm-block d-md-none">
                                                <div style="font-size:18px;float:right;">
                                                <BButton v-if="!edit" block size="md" variant="danger" @click="ubahReq()" :disabled="loadingRequest">
                                                    <span><b><i-fa-solid-edit /> &nbsp;&nbsp;Ubah Data Pengajuan</b></span>
                                                </BButton>
                                                <BButton v-else block size="md" variant="warning" @click="updateRequest()" :disabled="loadingRequest">
                                                    <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Perubahan Data</b></span>
                                                    <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                                </BButton>
                                                </div>
                                                <br/><br/>
                                                <h4><u>DETAIL DATA REQUEST</u></h4>							
                                            </div>
                                            <br/>
                                            <div class="card-body">
                                                <div v-for="input in input" :key="input.id" class="form-group">
                                                    <label class="col-form-label">{{ input.nama }} <span v-if="input.wajib == 1" style="color: red; font-size: smaller;">*</span></label>								    
                                                    <b-form-input v-if="input.type == 'input'" v-model="input.filename" type="text" class="form-control pass-input" :placeholder="input.keterangan" :readonly="!edit"/>
                                                    <VueDatePicker v-else-if="input.type == 'date'" v-model="input.filename" format="dd MMMM yyyy" :placeholder="input.keterangan" auto-apply :enable-time-picker="false" :readonly="!edit"/>								   
                                                    <VueDatePicker v-else-if="input.type == 'datetime'" v-model="input.filename" format="dd MMMM yyyy HH:mm" :placeholder="input.keterangan" :flow="['calender','time']" :readonly="!edit"/>								   
                                                    <b-form-select v-else-if="input.type == 'option'" v-model="input.filename">
                                                        <b-form-select-option v-for="item in JSON.parse(input.value)" :value="item">{{item}}</b-form-select-option>
                                                    </b-form-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>			
                                </div>
                            </div>
                            <hr/>
                            <div class="card-body">
							    <div class="row">
									<div class="row">
                                        <div class="card-header text-center">
                                            <h4><u>SYARAT-SYARAT BERKAS</u></h4>							
                                        </div>
                                        <div v-for="item in syarat" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered">
                                            <div class="media-image" v-b-tooltip="item.keterangan">
                                                <h6 class="media-title">{{ item.nama }}<span v-if="item.wajib == 1">*</span></h6>
                                                    <img v-if="item.fileUrl != 'NONE'" :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(item.fileUrl)" />
                                                    <img v-else :src="$assets+'/img/ikon/filenotfound.png'" />
                                                <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                    <p class="my-4">Cek File!</p>
                                                </BModal>
                                                <hr/>
                                                <div v-if="edit">
                                                    <div class="settings-upload-btn">
                                                        <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id, $event)">
                                                        <label v-if="!loadingfile[item.id]" for="file" class="file-upload">
                                                            <span v-if="item.filename == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                            <span v-else><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                        </label>
                                                        <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <BButton v-if="item.filename != null && item.filename != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteSyarat(item.id)">
                                                            <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
									</div>										
								</div>				
							</div>
                            <div>
                                <hr>
                                <h2 class="text-center" style="font-weight: 700;"><i-ant-design-comment-outlined /> KOMENTAR</h2>
                                <br/>
                                <div v-for="komen in komen" :key="komen.id">
                                <table v-if="komen.st =='petugas'" style="margin:10px 10px 10px 10px;" class="d-none d-md-block">
                                        <tr><td class="pp">
                                        <img class="imgkomen" src="data:image/png;base64,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" />
                                        <br />
                                        <span>{{ komen.sender }}</span></td>
                                        <td class="comment bubble">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></td></tr>
                                        <tr><td colspan=2>&nbsp;</td></tr>
                                </table>
                                <table v-else style="margin:10px 10px 10px 10px;" class="d-none d-md-block">
                                        <tr>
                                        <td class="comment bubble2">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></td>
                                        <td class="pp2">
                                        <img class="imgkomen" style="width: 70%;" src="data:image/png;base64,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" />
                                        <br />
                                        <span>{{ komen.sender }}</span></td></tr>
                                </table>
                                <div v-if="komen.st =='petugas'" class="comment bubble d-block d-sm-block d-md-none" style="margin:10px 10px 10px 10px;">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></div>
                                <div v-else class="comment bubble2 d-block d-sm-block d-md-none" style="margin:10px 10px 10px 10px;">{{ komen.komen }}<br /><br /> <p style="text-align:right;font-size:12px;"><i>{{ komen.waktu }}</i></p></div>
                                
                                </div>
                                <div>
                                    <b-form-input v-model="input.komen" type="text" class="form-control pass-input" @keypress.enter.prevent="onEnter" placeholder="Komentar Anda... Tekan Enter untuk Mengirim" :disabled="loadingkomen"/>
                                </div>
                            </div>
						</div>				
				</div>
                </b-form>
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
            title: "Upload File Syarat",
            text: "Home",
            text1: "Upload Syarat",
            name: "/",
            edit: false,
            datax: false,
            loading: false,
            loadinginput: false,
            loadingRequest: false,
            loadingkomen: false,
            loadingHasil: false,
            loadingfile: [],
            imageUrl: [],
            syarat: [],
            komen: [],
            input: [],
            hasil:[],
            formx: {
                isi: {}
            },
            inputx: {
                filename: []
            },
            perihal: null,
            nosurathasil: null,
            keterangan: null,
            hasilFile: 'NONE',
            hasilLampiran: 'NONE',
            hasilLampiran2: 'NONE'
        }
    },
    created() {
        this.getRequest(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        ubahReq() {
            this.edit = true
        },
        async getRequest() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getRequest/'+sid,{headers})

                if(response.data.success == true){
				    this.request = response.data.data
                    this.syarat = response.data.syarat
                    this.input = response.data.input
                    this.komen = response.data.komen
                    this.hasil = response.data.hasil
                }else{
                    this.datax = true,
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
				this.loading = false
			}
		},
        onFileChange(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                if(file.size > 1046000){
                    this.$toast.fire({
                        title: "File Tidak Boleh lebih dari 1MB !",
                        icon: "warning"
                    });
                }else if(file.type != 'application/pdf'){
                    this.$toast.fire({
                        title: "File harus tipe .PDF !",
                        icon: "warning"
                    });
                }else{
                    this.uploadSyarat(itemId)
                }
            }

            reader.readAsDataURL(file)
		},
        onFileHasil(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                this.uploadHasil(itemId)
            }
            reader.readAsDataURL(file)
		},
        async uploadSyarat(itemId) {
			try{
				this.loadingfile[itemId] = true

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadSyarat',{
					noreq: noreq,
                    id: itemId,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.syarat = response.data.syarat
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
        async uploadHasil(itemId) {
			if(!this.hasil.no_surat || this.hasil.no_surat === null){
				this.$toast.fire({
					title: 'Nomor Surat Mohon Diisi Terlebih Dahulu',
					icon: 'error',
				})
            }else if(!this.hasil.perihal || this.hasil.perihal === null){
                this.$toast.fire({
					title: 'Judul/Perihal Surat Mohon Diisi Terlebih Dahulu',
					icon: 'error',
				})
            }else{
                try{
                    this.loadingfile[itemId] = true

                    const noreq = this.$route.params.id
                    const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                };
                    
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadFileHasil',{
                        noreq: noreq,
                        id: itemId,
                        nosurathasil: this.hasil.no_surat,
                        perihal: this.hasil.perihal,
                        keteranganhasil: this.hasil.keterangan,
                        filex: this.fileUrl,
                        size: this.fileSize
                    }, {headers})

                    if(response.data.success == true){
                        this.$toast.fire({
                            title: response.data.message,
                            icon: 'success',
                        })
                        this.hasil = response.data.hasil
                    }
                    
                } catch (error) {
                    this.$toast.fire({
                        title: error,
                        icon: 'error',
                    })
                } finally {
                    this.loadingfile[itemId] = false
                }
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
					allowOutsideClick: true,
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
        async newRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.$route.params.id
				
                
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateRequest',{
                    statusx: 'new',
					noreq: noreq,
                    formx: this.input,
                    baseurl: window.location.origin,
				}, {headers})
                
                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/my-listing')  
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
				this.loadingRequest = false
			}
        },
        async updateRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.$route.params.id
				
                
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateRequest',{
                    statusx: 'sending',
                    notifx: 'no',
					noreq: noreq,
                    formx: this.input,
                    baseurl: window.location.origin,
				}, {headers})
                
                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.edit = false 
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
				this.loadingRequest = false
			}
        },
        async cancelRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateRequest',{
                    statusx: 'batal',
					noreq: noreq,
                    baseurl: window.location.origin,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/my-listing')  
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
				this.loadingRequest = false
			}
        },
        async onEnter() {
            this.loadingkomen = true;
            try{
                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
                 console.log(this.input.komen)
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKomen',{
					noreq: noreq,
                    komen: this.input.komen
				}, {headers})
                
                if(response.data.success == true){
                    this.komen = response.data.komen
                    this.input.komen = ''
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
				this.loadingkomen = false
			}
        },
        async updatePTSP(st) {
            try{
				this.loadingRequest = true

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                console.log(this.hasil)
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePTSP',{
                    statusx: st,
					noreq: noreq,
                    nosurathasil: this.hasil.no_surat,
                    perihal: this.hasil.perihal,
                    baseurl: window.location.origin,
                    keteranganhasil: this.hasil.keterangan 
				}, {headers})

                if(response.data.success == true){
                    this.request = response.data.data
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    //this.$router.push('/my-listing')  
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
				this.loadingRequest = false
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
                        const noreq = this.$route.params.id
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteFile',{
                            noreq: noreq,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            this.hasil = response.data.hasil
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        },
        async deleteSyarat(itemid){
            console.log(itemid)
            this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda Tidak bisa untuk Membatalkannya!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Hapus File ini!",
                preConfirm: async (deleteSyarat) => {
                    try {
                        const noreq = this.$route.params.id
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteSyarat',{
                            noreq: noreq,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            this.syarat = response.data.syarat
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        }
    }
}
</script>

<style>
.detailhead {
    font-weight: 700;
    font-size: large;
}

.comments {
  width: 430px;
  margin: 10px;
}

.pp {
	text-align: center;
	width:120px;
	float:left;
	margin-right: 20px;
}

.pp2 {
	text-align: center;
	width:120px;
	float:right;
	margin-left: 20px;
}

.imgkomen {
	border-radius: 50%;
	width:70%;
	height:100%;
}

.pp span {
	font-size: 12px;
	font-weight: bold;
}

.pp2 img {
	border-radius: 50%;
	width:100%;
	height:100%;
}

.pp2 span {
	font-size: 12px;
	font-weight: bold;
}

.comment {
  width: 100%;
  margin-bottom: 20px;
  color: white;
}

.bubble {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid teal;
  border-left: 15px solid transparent;
  
  left: -30px;
  top: 10px;
}

.bubble2 {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble2:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid transparent;
  border-left: 15px solid teal;
  
  right: -30px;
  top: 10px;
}

/*-------------STATUS BAR----------------*/

.step2 ul {
    display: flex;
}

.step2 ul li {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 40px;
}

.step2 ul li .icons {
    font-size: 25px;
    color: #1b761b;
    margin: 0 60px;
}

.step2 ul li .label {
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: bold;
    color: #1b761b;
}

.step2 ul li .step {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #d7d7c3;
    margin: 16px 0 10px;
    display: grid;
    place-items: center;
    color: ghostwhite;
    position: relative;
    cursor: pointer;
}

.step::after {
    content: "";
    position: absolute;
    width: 197px;
    height: 3px;
    background-color: #d7d7c3;
    right: 30px;
}

.first::after {
    width: 0;
    height: 0;
}

.step2 ul li .step .awesome {
    display: none;
}

.step2 ul li .step p {
    font-size: 15px;
}

.step2 ul li .active {
    background-color: #1b761b;
}

.step2 li .active::after {
    background-color: #1b761b;

}

.step2 ul li .active p {
    display: none;
}

.step2 ul li .active .awesome {
    display: flex;
}

@media screen and (max-width: 601px) {
  .detailhead {
    font-size: 15px;
  }
}
</style>