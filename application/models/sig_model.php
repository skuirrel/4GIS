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
	} // end of Koleksi

?>