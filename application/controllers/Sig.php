<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    class Sig extends CI_Controller
    {

        public function __construct()
        {
            parent::__construct();
                       
        }

         public function getLocation()
        {
            $this->load->model('sig_model');
            // $isInList = $this->sig_model->isInList(1);
            // if($isInList) {
                $data['nama'] = $this->sig_model->getList(1);
            // }
            // $this->load->view('home', $data);
            echo json_encode($data['nama']);
        }

        // }
            

    } // end of Book

?>