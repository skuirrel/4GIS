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
            $isInList = $this->sig_model->isInList($id);
            if($isInList) {
                $data = $this->sig_model->getList($id);
            }
            $this->load->view('home', $data);
        }

        // }
            

    } // end of Book

?>