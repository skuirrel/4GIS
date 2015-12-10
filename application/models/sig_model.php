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

		function getList($id)
		{
			$this->db->select('*');
	        $this->db->from('list');
	        $this->db->where('id',$id);    

			$result = $this->db->get()->result();
			return $result;
			
		}
	} // end of Koleksi

?>