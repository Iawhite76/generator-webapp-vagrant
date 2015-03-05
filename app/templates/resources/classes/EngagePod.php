<?php

include 'ArrayToXml.php';

class EngagePod {

    /**
     * Current version of the library
     *
     * Uses semantic versioning (http://semver.org/)
     *
     * @const string VERSION
     */
    const VERSION = '0.0.2';

    private $_baseUrl;
    private $_session_encoding;
    private $_jsessionid;
    private $_username;
    private $_password;

    /**
     * Constructor
     * 
     * Sets $this->_baseUrl based on the engage server specified in config
     */
    public function __construct($config) {

        // It would be a good thing to cache the jsessionid somewhere and reuse it across multiple requests
        // otherwise we are authenticating to the server once for every request
        $this->_baseUrl = 'http://api' . $config['engage_server'] . '.silverpop.com/XMLAPI';
        $this->_login($config['username'], $config['password']);

    }
    
    /**
     * Add a contact to a list
     * 
     */
    public function addContact($databaseID, $updateIfFound, $columns) {

        $data["Envelope"] = array(
            "Body" => array(
                "AddRecipient" => array(
                    "LIST_ID" => $databaseID,
                    "CREATED_FROM" => 1,         // 1 = created manually, 2 = opted in
                    // "SEND_AUTOREPLY"  => 'true',
                    "UPDATE_IF_FOUND" => ($updateIfFound ? 'true' : 'false'),
                    "COLUMN" => array(),
                ),
            ),
        );
        foreach ($columns as $name => $value) {
            $data["Envelope"]["Body"]["AddRecipient"]["COLUMN"][] = array("NAME" => $name, "VALUE" => $value);
        }
        $response = $this->_request($data);
        $result = $response["Envelope"]["Body"]["RESULT"];
        if ($this->_isSuccess($result)) {
            if (isset($result['RecipientId']))
                return '{"errors":"false","fields_missing":[],"fields_invalid":[],"fields_equals":[],"message":"' . $result['RecipientId'] . '"}';
                //return $result['RecipientId'];
            else {
                return '{"errors":"false","fields_missing":[],"fields_invalid":[],"fields_equals":[],"message":"Recipient added but no recipient ID was returned from the server."}';
                //throw new \Exception('Recipient added but no recipient ID was returned from the server.');
            }
        } else {
            return '{"errors":"true","fields_missing":[],"fields_invalid":[],"fields_equals":[],"message":"AddRecipient Error"}';
            //throw new \Exception("AddRecipient Error: ".$this->_getErrorFromResponse($response));
        }
    }

    /**
     * Update a contact. 
     *
     * @param int    $databaseID
     * @param string $oldEmail 
     * @param array  $columns
     * @return int recipient ID
     */
    public function updateContact($databaseID, $oldEmail, $columns) {
        $data["Envelope"] = array(
            "Body" => array(
                "UpdateRecipient" => array(
                    "LIST_ID"         => $databaseID,
                    "OLD_EMAIL"       => $oldEmail,
                    "CREATED_FROM"    => 1,        // 1 = created manually
                    "COLUMN" => array(),
                ),
            ),
        );
        foreach ($columns as $name => $value) {
            $data["Envelope"]["Body"]["UpdateRecipient"]["COLUMN"][] = array("NAME" => $name, "VALUE" => $value);
        }
        $response = $this->_request($data);
        $result = $response["Envelope"]["Body"]["RESULT"];
        if ($this->_isSuccess($result)) {
            if (isset($result['RecipientId']))
                return $result['RecipientId'];
            else {
                throw new \Exception('Recipient added but no recipient ID was returned from the server.');
            }
        }
        
        throw new \Exception("UpdateRecipient Error: ".$this->_getErrorFromResponse($response));
    }

    /**
     * Private method: authenticate with Silverpop
     *
     */
    private function _login($username, $password) {
        $data["Envelope"] = array(
            "Body" => array(
                "Login" => array(
                    "USERNAME" => $username,
                    "PASSWORD" => $password,
                ),
            ),
        );
        $response = $this->_request($data);
        $result = $response["Envelope"]["Body"]["RESULT"];
        if ($this->_isSuccess($result)) {
            $this->_jsessionid = $result['SESSIONID'];
            $this->_session_encoding = $result['SESSION_ENCODING'];
            $this->_username = $username;
            $this->_password = $password;
        } else {
            throw new \Exception("Login Error: ".$this->_getErrorFromResponse($response));
        }
    }

    /**
     * Private method: close and invalidate the Silverpop session
     * 
     */
    private function _logout() {
        $data["Envelope"] = array(
            "Body" => array(
                "Logout" => array(),
            ),
        );
        $response = $this->_request($data);
        $result = $response["Envelope"]["Body"]["RESULT"];
        if ($this->_isSuccess($result)) {
            unset($this->_jsessionid); 
        } else {
            throw new \Exception("Logout Error: ".$this->_getErrorFromResponse($response));
        }
    }    

    /**
     * Private method: generate the full request url
     *
     */
    private function _getFullUrl() {
        return $this->_baseUrl . (isset($this->_session_encoding) ? $this->_session_encoding : '');
    }

    /**
     * Private method: make the request
     *
     */
    private function _request($data, $replace = array(), $attribs = array()) {

        if (is_array($data))
        {
            $atx = new ArrayToXML($data, $replace, $attribs);
            $xml = $atx->getXML();
        }
        else
        {
            //assume raw xml otherwise, we need this because we have to build
            //  our own sometimes because assoc arrays don't support same name keys
            $xml = $data;
        }

        $fields = array(
            "jsessionid" => isset($this->_jsessionid) ? $this->_jsessionid : '',
            "xml" => $xml,
        );

        $response = $this->_httpPost($fields);
        
        if ($response) {
            $atx = new ArrayToXML($data, $replace, $attribs);
            $arr = $atx->getArray($response);
            if (isset($arr["Envelope"]["Body"]["RESULT"]["SUCCESS"])) {
                return $arr;
            } else {
                $this->_logout();
                throw new \Exception("HTTP Error: Invalid data from the server");
            }
        } else {
            $this->_logout();
            throw new \Exception("HTTP request failed");
        }
    }

    /**
     * Private method: post the request to the url
     *
     */
    private function _httpPost($fields) {
        $fields_string = http_build_query($fields);
        //open connection
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded; charset=UTF-8'));
        curl_setopt($ch,CURLOPT_URL,$this->_getFullUrl());
        curl_setopt($ch,CURLOPT_POST,count($fields));
        curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

        //execute post
        $result = curl_exec($ch);

        //close connection
        curl_close($ch);

        return $result;
    }

    /**
     * Private method: parse an error response from Silverpop
     *
     */
    private function _getErrorFromResponse($response) {
        if (isset($response['Envelope']['Body']['Fault']['FaultString']) && !empty($response['Envelope']['Body']['Fault']['FaultString'])) {
            return $response['Envelope']['Body']['Fault']['FaultString'];
        }
        return 'Unknown Server Error';
    }

    /**
     * Private method: determine whether a request was successful
     *
     */
    private function _isSuccess($result) {
        if (isset($result['SUCCESS']) && in_array(strtolower($result["SUCCESS"]), array('true', 'success'))) {
            return true;
        }
        return false;
    }

}
