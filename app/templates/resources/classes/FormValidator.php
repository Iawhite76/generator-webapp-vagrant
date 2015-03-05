<?php
/**
 * T3Validator.php
 * Validates arrays or properties by setting up simple arrays.
 * Example:
 *
 * $validations = array('name' => 'anything','email' => 'email','alias' => 'anything','pwd'=>'anything','gsm' => 'phone','birthdate' => 'date');
 * $required = array('name', 'email', 'alias', 'pwd');
 * $sanitize = array('alias');
 *
 * $validator = new FormValidator($validations, $required, $sanitize);
 *
 * if($validator->validate($_POST)) {
 *      $_POST = $validator->sanitize($_POST);
 *      // now do your saving, $_POST has been sanitized.
 *      die($validator->getScript()."<script type='text/javascript'>alert('saved changes');</script>");
 * } else {
 *      die($validator->getScript());
 * }
 *
 * To validate just one element:
 * $validated = new FormValidator()->validate('blah@bla.', 'email');
 *
 * To sanitize just one element:
 * $sanitized = new FormValidator()->sanitize('<b>blah</b>', 'string');
 *
 *
 * Adapted from Pork.FormValidator
 * @author SchizoDuckie
 * @copyright SchizoDuckie 2008
 * @version 1.0
 * @access public
 *
 *
 */class FormValidator {
    public static $regexes = Array(
        // Letters, spaces, commas, dashes, max 25, utf-8 letters (e.g. è, ä, ü)
        'name'          =>  "^[a-zA-Z\sàáâäãåèéêëìíîïòóôöõùúûüÿýñçčšžÀÁÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕØÙÚÛÜŸÝÑßÇČŠŽ∂ð ',-]{0,50}\$",
        // Positive or negative integer [e.g. -19; 1024; 0; -8675309]
        'amount'        =>  "^[-]?[0-9]+\$",
        // Same as 'amount', but accepts commas [e.g. -19,000; 1,024, -8,675,309]
        'number'        =>  "^[-]?[0-9,]+\$",
        // Alphanumeric with spaces and basic punctuation
        'alfanum'       =>  "^[0-9a-zA-Z àáâäãåèéêëìíîïòóôöõùúûüÿýñçčšžÀÁÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕØÙÚÛÜŸÝÑßÇČŠŽ∂ð,'._#&\\s\?\!-]+\$",
        // Not empty
        'not_empty'     =>  "[a-z0-9A-Z]+",
        // Letters and spaces only
        'words'         =>  "^[A-Za-z]+[A-Za-z \\s]*\$",
        // North American phone numbers optionally using parentheses
        'phone'         =>  "^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:)?\$",
   //   'phone'         =>  "^(?:(?:\?\s*  (?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:)?\$",
        // US zip code in 5 or 9 digit format
        'zipcode'       =>  "^\d{5}(-\d{4})?\$"
    );

    private $validations, $sanitizations, $mandatories, $equal, $errors, $corrects, $fields;

    public function __construct($validations=array(), $mandatories = array(), $sanitizations = array(), $equal = array()) {
        $this->validations = $validations;
        $this->sanitizations = $sanitizations;
        $this->mandatories = $mandatories;
        $this->equal = $equal;
        $this->errors = array();
        $this->errors_required = array();
        $this->errors_formatting = array();
        $this->errors_equals = array();
        $this->corrects = array();
    }

    /**
     * Validates an array of items (if needed) and returns true or false
     *
     */
    public function validate($items) {
        $this->fields = $items;
        $havefailures = false;

        //Check for mandatories
        foreach($this->mandatories as $key=>$val) {
            if(!array_key_exists($val,$items)) {
                $havefailures = true;
                $this->addError($val);
                $this->addErrorRequired($val);
            }else{
                if(trim($items[$val]) == ""){
                    $havefailures = true;
                    $this->addError($val);
                    $this->addErrorRequired($val);
                }
            }
        }

        //Check for equal fields
        foreach($this->equal as $key=>$val) {
            //check that the equals field exists
            if(!array_key_exists($key,$items)) {
                $havefailures = true;
                $this->addError($val);
                $this->addErrorEquals($key, $val);
            }

            //Check that the two fields are equal
            if($items[$key] != $val) {
                $havefailures = true;
                $this->addError($key);
                $this->addErrorEquals($key, $val);
            }
        }

        foreach($this->validations as $key=>$val) {
            // Empty values are okay, as they are taken care of by the mandatories
            if((array_key_exists($key,$items)) && (trim($items[$key]) != "")){
                $result = self::validateItem($items[$key], $val);

                if($result === false) {
                    $havefailures = true;
                    $this->addError($key, $val);
                    $this->addErrorFormatting($key, $val);
                } else {
                    $this->corrects[] = $key;
                }
            }
        }

        return(!$havefailures);
    }

    /**
     *
     *  Returns a JSON encoded array containing the names of fields with errors and those without.
     */
    public function getJSON() {
        $errors = array();
        $errors_required = array();
        $errors_formatting = array();
        $errors_equals = array();

        if(!empty($this->errors)) {
            foreach($this->errors as $key=>$val) { $errors[] = $key; }
        }

        if(!empty($this->errors_required)) {
            foreach($this->errors_required as $key=>$val) { $errors_required[] = $key; }
        }

        if(!empty($this->errors_formatting)) {
            foreach($this->errors_formatting as $key=>$val) { $errors_formatting[] = $key; }
        }

        if(!empty($this->errors_equals)) {
            foreach($this->errors_equals as $key=>$val) { $errors_equals[] = $key; }
        }

        $output = array('errors' => 'true','fields_missing' => $errors_required,'fields_invalid' => $errors_formatting,'fields_equals' => $errors_equals);
        return json_encode($output);
    }

    /**
     *
     *  Adds unvalidated class to those elements that are not validated. Removes them from classes that are.
     */
    public function getScript() {
        if(!empty($this->errors)) {
            $errors = array();
            foreach($this->errors as $key=>$val) { $errors[] = "'input[name={$key}]'"; }

            $output = '$('.implode(',', $errors).').addClass("unvalidated");';
            //$output .= "new FormValidator().showMessage();";
        }
        if(!empty($this->corrects)) {
            $corrects = array();
            foreach($this->corrects as $key) { $corrects[] = "'input[name={$key}]'"; }
            $output .= '$('.implode(',', $corrects).').removeClass("unvalidated");';
        }
        $output = "<script type='text/javascript'>{$output} </script>";
        //return($output);
        return false;
    }


    /**
     *
     * sanitizes an array of items according to the $this->sanitizations
     * sanitizations will be standard of type string, but can also be specified.
     * For ease of use, this syntax is accepted:
     * $sanitizations = array('fieldname', 'otherfieldname'=>'float');
     */
    public function sanitize($items) {
        foreach($items as $key=>$val) {
            if(array_search($key, $this->sanitizations) === false && !array_key_exists($key, $this->sanitizations)) continue;
            $items[$key] = self::sanitizeItem($val, $this->validations[$key]);
        }
        return($items);
    }


    /**
     *
     * Adds an error to the errors array.
     */
    private function addError($field, $type='string') {
        $this->errors[$field] = $type;
    }

    /**
     *
     * Adds an error to the errors array.
     */
    private function addErrorRequired($field, $type='string') {
        $this->errors_required[$field] = $type;
    }

    /**
     *
     * Adds an error to the errors array.
     */
    private function addErrorFormatting($field, $type='string') {
        $this->errors_formatting[$field] = $type;
    }

    /**
     *
     * Adds an error to the errors array.
     */
    private function addErrorEquals($field, $type='string') {
        $this->errors_equals[$field] = $type;
    }

    /**
     *
     * sanitize a single var according to $type.
     * Allows for static calling to allow simple sanatization
     */
    public static function sanitizeItem($var, $type) {
        $flags = NULL;
        switch($type) {
            case 'url':
                $filter = FILTER_SANITIZE_URL;
                break;
            case 'int':
                $filter = FILTER_SANITIZE_NUMBER_INT;
                break;
            case 'float':
                $filter = FILTER_SANITIZE_NUMBER_FLOAT;
                $flags = FILTER_FLAG_ALLOW_FRACTION | FILTER_FLAG_ALLOW_THOUSAND;
                break;
            case 'email':
                $var = substr($var, 0, 254);
                $filter = FILTER_SANITIZE_EMAIL;
                break;
            case 'string':
            default:
                $filter = FILTER_SANITIZE_STRING;
                $flags = FILTER_FLAG_NO_ENCODE_QUOTES;
                break;
        }
        $output = filter_var($var, $filter, $flags);
        return($output);
    }

    /**
     *
     * Validates a single var according to $type.
     * Allows for static calling to allow simple validation.
     *
     */
    public static function validateItem($var, $type) {
        if(array_key_exists($type, self::$regexes)) {
            $returnval =  filter_var($var, FILTER_VALIDATE_REGEXP, array("options"=> array("regexp"=>'!'.self::$regexes[$type].'!i'))) !== false;
            return($returnval);
        }
        $filter = false;
        switch($type) {
            case 'email':
                $var = substr($var, 0, 254);
                $filter = FILTER_VALIDATE_EMAIL;
                break;
            case 'int':
                $filter = FILTER_VALIDATE_INT;
                break;
            case 'boolean':
                $filter = FILTER_VALIDATE_BOOLEAN;
                break;
            case 'ip':
                $filter = FILTER_VALIDATE_IP;
                break;
            case 'url':
                $filter = FILTER_VALIDATE_URL;
                break;
        }
        return ($filter === false) ? false : filter_var($var, $filter) !== false ? true : false;
    }
}
?>