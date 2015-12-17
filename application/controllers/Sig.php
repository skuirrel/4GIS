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
                $data['nama'] = $this->sig_model->getList($id);
            }
            else{
                $data['nama'] = null;
            }
            // $this->load->view('home', $data);
            echo json_encode($data['nama']);
        }
        
        public function isInList($id)
        {
            $this->load->model('sig_model');
            $ada = $this->sig_model->isInList($id);
            $data['bs'] = $ada;
            if($ada){
                $data['lat'] = $this->sig_model->getLat($id);
                $data['lng'] = $this->sig_model->getLong($id);
            }

            echo json_encode($data);
        }

        public function showAll(){
            $this->load->model('sig_model');
            $data['query'] = $this->sig_model->getAll();
            echo json_encode($data);
        }

        // public function saveData(){
        //     // if ( $_SERVER['REQUEST_METHOD'] == 'POST' ){
        //         $data['id'] = trim(mysql_prep($_POST['id']));
        //         $data['name'] = trim(mysql_prep($_POST['name']));
        //         $data['photo'] = trim(mysql_prep($_POST['photo']));
        //         $data['address'] = trim(mysql_prep($_POST['address']));
        //         $data['telp'] = trim(mysql_prep($_POST['telp']));
        //         $data['opening_hours'] = trim(mysql_prep($_POST['opening_hours']));
                
        //     // }
        //     $this->load->model('sig_model');
        //     if($this->sig_model->checkId($data['id'])){

        //     }else{
        //         $data['query'] = $this->sig_model->addData();
        //     }
            
        // }

            

    } // end of Book

?>