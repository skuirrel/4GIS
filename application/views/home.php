<!DOCTYPE html>
<html>
  <head>
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url('assets/img/favicon.png');?>" />

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="<?php echo base_url('assets/css/materialize.min.css')?>"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="<?php echo base_url('assets/css/flaticon.css')?>"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="<?php echo base_url('assets/css/style.css')?>"  media="screen,projection"/>

    

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Cepat Sembuh!</title>
  </head>

  <body>
    <div class="row">
      <div class="col s4 sidebar side-nav fixed">
        <div class="header">
          <div class="center-align">
            <img class="responsive-img" src="<?php echo base_url('assets/img/logocs.png')?>"/>
          </div>
          <button onclick="getLocation()" class="btn" id="btn-myloc"><i class="flaticon-home166" style="margin-left: -20px;"></i> Lokasi Sekarang</button>
          <button onclick="getNearest()" class="btn" id="btn-nearest" disabled><i class="flaticon-pin60" style="margin-left: -20px;"></i> Tempat Terdekat</button>
        </div>
        <form class="col s10 offset-s1">
          <input id="all-search" class="form-search" type="text" placeholder="Cari seluruh layanan kesehatan...">
          <i class="flaticon-magnifier52" style="margin-top: -51px; position: absolute; margin-left: -5px; color: #26a69a;"></i>
        </form>

       <!--  <ul class="tabs">
          <li class="tab col s3 ap"><a class="active" href="#div-all">SEMUA</a></li>
          <li class="tab col s3 ap"><a href="#div-apotek">APOTEK</a></li>
          <li class="tab col s3 rs"><a href="#div-rs">RUMAH SAKIT</a></li>
          <li class="tab col s3 kl"><a href="#div-klinik">KLINIK</a></li>
        </ul> -->
        <div class="input-field col s12" style="margin-bottom:100px">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label>Materialize Select</label>
  </div>

        <div id="div-all" class="col s12">
          <br>
          <div id="all-result">
          </div>
        </div>
        <div id="div-apotek" class="col s12">
          <br>
          <div id="apotek-result">
            <div class="card col s12">
              <h5>Apotek Kimia Farma</h5>
              <img class="responsive-img" src="http://depokdentalcity.com/wp-content/uploads/2013/01/Lapangan-Parkir-Mobil-dan-Motor-yang-Luas.jpg"/>
              <button class="btn" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> 
              <div class="row valign-wrapper">
                <div class="col s2 valign">
                  <div class="chip teal accent-4">
                    <i class="flaticon-pin60" style="margin-left: -20px; color: #fff;"></i>
                  </div>
                </div>
                <div class="col s10 valign">
                  Jl. Margonda Raya No. 328, Beji, Kota Depok, Jawa Barat, 16424
                </div>
              </div>
              <div class="row valign-wrapper">
                <div class="col s2 valign">
                  <div class="chip teal accent-4">
                    <i class="flaticon-active5" style="margin-left: -20px; color: #fff;"></i>
                  </div>
                </div>
                <div class="col s10 valign">
                  (021) 78884611
                </div>
              </div>
              <div class="row valign-wrapper">
                <div class="col s2 valign">
                  <div class="chip teal accent-4">
                    <i class="flaticon-alarm68" style="margin-left: -20px; color: #fff;"></i>
                  </div>
                </div>
                <div class="col s10 valign">
                  Buka 24 jam
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="div-rs" class="col s12">
          <br>
          <div id="rs-result">
          </div>
        </div>
        <div id="div-klinik" class="col s12">
          <br>
          <div id="klinik-result">
          </div>
        </div>
      </div>
      <div class="col s8" style="padding:0px;">
        <div id="map">
            
        </div>
      </div>
    </div>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/materialize.min.js')?>"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/js.js')?>"></script>
    <!-- Import Google Maps -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoXnZsPBu9G1NGa6gtykctR4oluV0E4E8&signed_in=true&libraries=places&callback=initialize" async defer></script>
    

    <script type="text/javascript">
        $(document).ready(function(){
          $('ul.tabs').tabs();
          $('input#input_text, textarea#textarea1').characterCounter();
        });

    </script>
  </body>
</html>