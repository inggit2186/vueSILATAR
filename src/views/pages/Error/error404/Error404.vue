<template>
    <div class="mainwrapper error-page">
	   	<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 mx-auto">
						<div class="error-wrap">
						
							<div class="error-logo">
								<router-link to="index"><img class="img-fluid" src="../../../../assets/img/logo.svg" alt="img"></router-link>
							</div>
							<hr/>
							<span><i-maki-danger style="font-size:6em;color:red;"/></span>
							<h2>Halaman Tidak Ditemukan</h2>
							<h4>Sepertinya Anda sedikit Tersesat</h4>
							<div class="error-img">
								<img class="img-fluid" src="../../../../assets/img/404-error.jpg" alt="img">
							</div>
							<router-link to="/" class="btn btn-primary rounded-pill">Kembali ke Halaman Awal</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>