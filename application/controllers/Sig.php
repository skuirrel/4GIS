<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    class Sig extends CI_Controller
    {

        public function __construct()
        {
            parent::__construct();
                       
        }

         public function getLocation($id)
        {
            $this->load->model('sig_model');
            // $isInList = $this->sig_model->isInList($id);
            $data['nama'] = $this->sig_model->getList($id);
            // if(sizeof($namanya)!=0) {
            //     $data['nama'] = $namanya;
            // }
            // $this->load->view('home', $data);
            echo json_encode($data['nama']);
        }

        // }
            

    } // end of Book

?>