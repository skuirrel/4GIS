<?php

	class sig_model extends CI_Model
	{

		function isInList($id)
		{
			$this->db->select('*');
	        $this->db->from('list');
	        $this->db->where('id',$id);    
	        $query= $this->db->get()->result();

	        if(sizeof($query)!=0)
	        {       
	          	return true;
	        }
	        else
	        {
	        	return false;
	        }
		}

		function getLat($id)
		{
			$this->db->select("latitude");
	        $this->db->from('list');
	        $this->db->where('id',$id);    

			$result = $this->db->get()->result();
			
			foreach ($result as $key => $value) 
			{
				$lat=$value->latitude;
			}
			return $lat;
		}

		function getLong($id)
		{
			$this->db->select("longitude");
	        $this->db->from('list');
	        $this->db->where('id',$id);    

			$result = $this->db->get()->result();
			
			foreach ($result as $key => $value) 
			{
				$long=$value->longitude;
			}
			return $long;
		}

		// function getList($id)
		// {
		// 	$this->db->select('nama');
	 //        $this->db->from('list');
	 //        $this->db->where('id',$id);    

		// 	$result = $this->db->get()->result();
			
		// 	foreach ($result as $key => $value) 
		// 	{
		// 		$name=$value->nama;
		// 	}

		// 	return $name;

		// }

		function getAll(){
			$this->db->select('*');
			$this->db->from('list');
			$query = $this->db->get();
			return $query->result();
		}

		// function addData($data){
		// 	$id=$data['id'];
		// 	$name=$data['name'];
		// 	$photo=$data['photo'];
		// 	$addr=$data['address'];
		// 	$telp=$data['telp'];
		// 	$open=$data['opening_hours'];
		// 	$this->db->insert('list', array('id'=>$id, 'name'=>$name, 'photo'=>$photo, 'address'=>$address, 'telp'=>$telp, 'opening_hours'=>$open));
		// }

		// function checkId($id){
		// 	$query = $this->db->get_where('list', array(//making selection
	 //            'id' => $id
	 //        ));
	 //        $count = $query->num_rows();
	 //        if ($count === 0) {
	 //        	return true;
	 //        }
	 //        else{
	 //        	return false;
	 //        }
		// }
	} // end of Koleksi

?>