<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Ledger extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function add() {
		$data_set = array(
			"date" => $this->input->post('date') ? $this->input->post('date') : "",
			"perticular" => $this->input->post('perticular') ? $this->input->post('perticular') : "",
			"type" => $this->input->post('type') ? $this->input->post('type') : "",
			"amount" => $this->input->post('amount') ? $this->input->post('amount') : "",
			"notes" => $this->input->post('notes') ? $this->input->post('notes') : "",
			"transactionBy" => $this->input->post('transactionBy') ? $this->input->post('transactionBy') : ""
		);

		$query = $this->db->insert("off_ledger", $data_set);
		if ($query) {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('message' => "Successfully add an entry", 'code' => 'success')));
		} else {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('message' => "Error adding an entry", 'code' => 'error')));
		}
	}

	public function get_total() {
		$query = $this->db->get('off_ledger');
		$total = 0;

		foreach ($query->result() as $row) {
      if ($row->type == "credit") {
      	$total = $total + $row->amount;
      } else if($row->type == "debit") {
      	$total = $total - $row->amount;
      }
		}

		$this->output->set_content_type('application/json')->set_output(json_encode(array('message' => "Successfully added the total", 'code' => 'success', 'data' => $total)));
	}

	public function get_log() {
		$query = $this->db->get('off_ledger');

		if ($query) {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('message' => "Successfully returned the data`", 'code' => 'success', 'data' => json_encode($query->result()))));
		} else {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('message' => "Error fetching the data", 'code' => 'error')));
		}

	}
}
