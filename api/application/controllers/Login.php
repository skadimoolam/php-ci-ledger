<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('encryption');
		$this->load->database();
	}

	public function create() {
		$cred_folder = $this->input->post('folder');
		$cred_detail = $this->encryption->encrypt($this->input->post('cred'));

		$this->db->insert('pass_creds', array(
			'cred_folder' => $cred_folder,
			'cred_detail' => $cred_detail,
		));

		$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'success', 'message' => 'New Login created')));
	}

	public function update() {
		$cred_id = $this->uri->segment(3);
		$cred_folder = $this->input->post('folder');
		$cred_detail = $this->encryption->encrypt($this->input->post('cred'));

		$this->db->update('pass_creds', array(
			'cred_folder' => $cred_folder,
			'cred_detail' => $cred_detail,
		), array('cred_id' => $cred_id), 1);

		$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'success', 'message' => 'Login updated')));
	}

	public function get_all() {
		$cred_folder = $this->uri->segment(3);
		$query = $this->db->where('cred_folder', $cred_folder)->get('pass_creds');

		if (sizeof($query->result()) > 0) {
			$logins = array();
			foreach ($query->result() as $login) {
				$login->cred_detail = json_decode($this->encryption->decrypt($login->cred_detail));
				array_push($logins, $login);
			}

			$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'success', 'data' => $logins, 'count' => count($logins))));
		} else {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'error', 'message' => 'No Logins found')));
		}
	}

	public function delete() {
		$cred_id = $this->uri->segment(3);

		$resp = $this->db->delete('pass_creds', array('cred_id' => $cred_id));

		if ($resp == 1) {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'success', 'message' => 'Login deleted')));
		} else {
			$this->output->set_content_type('application/json')->set_output(json_encode(array('code' => 'error', 'message' => 'Error deleting the Login')));
		}

	}
}
