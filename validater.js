// Password match or not
function DoCheckBoxChecked()
{
  	var frm = document.forms["frmregistration"];
	if(frm.checkterm.checked == false)
  	{
    		return false;
  	}
  	else
  	{
    		return true;
  	}
}
function DoPasswordMatch()
{
	var frm = document.forms["registrationform"];
	if(frm.pasword1.value != frm.cpasword1.value)
  	{
		return false;
  	}
  	else
  	{
    		return true;
  	}
}
// valid url or not
function isValidURL(url)
{
	var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    	if(RegExp.test(url))
	{
        	return true;
   	}
	else
	{
        	return false;
    	}
} 
// Is there object is created or not
function Validator(frmname)
{       
  	this.formobj=document.forms[frmname];
	if(!this.formobj)
	{
	  	alert("BUG: couldnot get Form object "+frmname);
		return;
	}
	if(this.formobj.onsubmit)
	{
		this.formobj.old_onsubmit = this.formobj.onsubmit;
		this.formobj.onsubmit=null;
	}
	else
	{
	 	this.formobj.old_onsubmit = null;
	}
	this.formobj.onsubmit=form_submit_handler;
	this.addValidation = add_validation;
	this.setAddnlValidationFunction=set_addnl_vfunction;
	this.clearAllValidations = clear_all_validations;
}
function set_addnl_vfunction(functionname)
{
  	this.formobj.addnlvalidation = functionname;
}
// clear validations
function clear_all_validations()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		this.formobj.elements[itr].validationset = null;
	}
}
// Form submit
function form_submit_handler()
{
	for(var itr=0;itr < this.elements.length;itr++)
	{
		if(this.elements[itr].validationset &&
	   !this.elements[itr].validationset.validate())
		{
			  return false;
		}
	}
	if(this.addnlvalidation)
	{
		str =" var ret = "+this.addnlvalidation+"()";
		eval(str);
		if(!ret) return ret;
	}
	return true;
}
// Form object is proper or not ?
function add_validation(itemname,descriptor,errstr)
{
  	if(!this.formobj)
	{
		alert("BUG: the form object is not set properly");
		return;
	}
	var itemobj = this.formobj[itemname];
  	if(!itemobj)
	{
	  	alert("BUG: Couldnot get the input object named: "+itemname);
		return;
	}
	if(!itemobj.validationset)
	{
		itemobj.validationset = new ValidationSet(itemobj);
	}
  	itemobj.validationset.add(descriptor,errstr);
}
function ValidationDesc(inputitem,desc,error)
{
        this.desc=desc;
        this.error=error;
        this.itemobj = inputitem;
        this.validate=vdesc_validate;
}
function vdesc_validate()
{
        if(!V2validateData(this.desc,this.itemobj,this.error))
        {
                this.itemobj.focus();
                return false;
        }
        return true;
}
function ValidationSet(inputitem)
{
  	  this.vSet=new Array();
        this.add= add_validationdesc;
        this.validate= vset_validate;
        this.itemobj = inputitem;
}
function add_validationdesc(desc,error)
{
        this.vSet[this.vSet.length]= 
        new ValidationDesc(this.itemobj,desc,error);
}
function vset_validate()
{
   	for(var itr=0;itr<this.vSet.length;itr++)
        {
           	if(!this.vSet[itr].validate())
        	{
                   return false;
                }
         }
         return true;
}
// validation of email address
function validateEmailv2(email)
{
	if(email.length <= 0)
	{
	  return true;
	}
    	var splitted = email.match("^(.+)@(.+)$");
    	if(splitted == null)
		 return false;
    	if(splitted[1] != null )
    	{
      		var regexp_user=/^\"?[\w-_\.]*\"?$/;
      		if(splitted[1].match(regexp_user) == null) return false;
    	}
    	if(splitted[2] != null)
    	{
      		var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      		if(splitted[2].match(regexp_domain) == null) 
      		{
	    		var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    		if(splitted[2].match(regexp_ip) == null) return false;
      		}
		return true;
   	}
	return false;
}
// Validation for all data
function V2validateData(strValidateStr,objValue,strError,objValue2) 
{ 
    	var epos = strValidateStr.search("="); 
    	var  command  = ""; 
    	var  cmdvalue = ""; 
    	if(epos >= 0) 
    	{ 
     		command  = strValidateStr.substring(0,epos); 
     		cmdvalue = strValidateStr.substr(epos+1); 
    	} 
    	else 
    	{ 
    		command = strValidateStr; 
    	} 
    	switch(command) 
    	{ 
        	case "req": 
        	case "required": 
         	{  
			var newval = trim(objValue.value);  
           		if(eval(newval.length) == 0) 
           		{ 
              			if(!strError || strError.length ==0) 
              			{ 
                			strError = objValue.name + " : Required Field"; 
              			} 
              			//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
              			return false; 
           		} 
           		break;
         	}//case required 
        	case "maxlength": 
        	case "maxlen": 
          	{ 	
             		if(eval(objValue.value.length) >  eval(cmdvalue)) 
             		{ 	
               			if(!strError || strError.length ==0) 
               			{ 
                 			strError = objValue.name + " : "+cmdvalue+" characters maximum "; 
               			} 
               			//alert(strError);// + "\n[Current length = " + objValue.value.length + " ]");
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
               			return false; 
             		}
             		break; 
          	}//case maxlen 
        	case "minlength": 
        	case "minlen": 
           	{ 
             		if(eval(objValue.value.length) <  eval(cmdvalue)) 
             		{ 
               			if(!strError || strError.length ==0) 
               			{ 
                 			strError = objValue.name + " : " + cmdvalue + " characters minimum  "; 
               			}
               			//alert(strError);// + "\n[Current length = " + objValue.value.length + " ]");
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
               			return false;
             		}
             		break; 
            	}//case minlen 
        	case "alnum": 
        	case "alphanumeric": 
           	{ 
		        var charpos = objValue.value.search("[^A-Za-z0-9]"); 	
              		if(objValue.value.length > 0 &&  charpos >= 0) 
              		{ 
               			if(!strError || strError.length ==0) 
                		{ 
                  			strError = objValue.name+": Only alpha-numeric characters allowed "; 
                		}
                		//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                		return false; 
              		}
		        break; 
           	}//case alphanumeric 
        	case "num": 
        	case "numeric": 
           	{ 
             		var charpos = objValue.value.search("[^0-9]"); 
              		if(objValue.value.length > 0 &&  charpos >= 0) 
              		{ 
                		if(!strError || strError.length ==0) 
                		{ 
                  			strError = objValue.name+": Only digits allowed "; 
                		}
                		//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                		return false; 
              		} 
              		break;               
           	}//numeric 
        	case "alphabetic": 
        	case "alpha": 
           	{ 
              		var charpos = objValue.value.search("[^A-Za-z]"); 
              		if(objValue.value.length > 0 &&  charpos >= 0) 
              		{ 
                  		if(!strError || strError.length ==0) 
                		{ 
                  			strError = objValue.name+": Only alphabetic characters allowed "; 
                		}
                		//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                		return false; 
              		}
              		break; 
           	}//alpha 
		case "alnumhyphen":
		{
              		var charpos = objValue.value.search("[^A-Za-z0-9\-_@]"); 
              		if(objValue.value.length > 0 &&  charpos >= 0) 
              		{ 
                  		if(!strError || strError.length ==0) 
                		{ 
                  			strError = objValue.name+": characters allowed are A-Z,a-z,0-9,-,@ and _"; 
                		}
                		//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                		return false; 
              		}
			break;
		}
        	case "email": 
          	{  
               		if(!validateEmailv2(objValue.value)) 
               		{  
                 		if(!strError || strError.length ==0) 
                 		{ 
                    			strError = objValue.name+": Enter a valid Email address "; 
                 		}
//                 		alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                 		return false; 
               		}
           		break; 
          	}//case email 
        	case "lt": 
        	case "lessthan": 
         	{ 
            		if(isNaN(objValue.value)) 
            		{ 
              			alert(objValue.name+": Should be a number "); 
              			return false; 
            		}
            		if(eval(objValue.value) >=  eval(cmdvalue)) 
            		{ 
              			if(!strError || strError.length ==0) 
              			{ 
                			strError = objValue.name + " : value should be less than "+ cmdvalue; 
              			}
              			//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
             	 		return false;
             		}
            		break; 
         	}//case lessthan
                case "phonenum":
                {
                        var charpos = objValue.value.search("[^0-9\-+]");
                        if(objValue.value.length > 0 &&  charpos >= 0) 
                        { 
                                if(!strError || strError.length ==0) 
                                { 
                                        strError = objValue.name+": characters allowed are 0-9,-,(,),  and +"; 
                                }
                                //alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                                return false; 
                        }
                        break;
                }
		 case "decimalnum":
                {
                        var charpos = objValue.value.search("[^0-9\.]");
                        if(objValue.value.length > 0 &&  charpos >= 0) 
                        { 
                                if(!strError || strError.length ==0) 
                                { 
                                        strError = objValue.name+":  Only digits allowed "; 
                                }
                                //alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                                return false; 
                        }
                        break;
                }
                case "mobilenum":
                {
                        var charpos = objValue.value.search("[^0-9\-+]");
                        if(objValue.value.length > 0 &&  charpos >= 0) 
                        { 
                                if(!strError || strError.length ==0) 
                                { 
                                        strError = objValue.name+": characters allowed are 0-9, ,- and +"; 
                                }
                                //alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                                return false; 
                        }
                        break;
                }
        	case "gt": 
        	case "greaterthan": 
         	{ 
            		if(isNaN(objValue.value)) 
            		{ 
              			alert(objValue.name+": Should be a number "); 
              			return false; 
            		}
             		if(eval(objValue.value) <=  eval(cmdvalue)) 
             		{ 
               			if(!strError || strError.length ==0) 
               			{ 
                 			strError = objValue.name + " : value should be greater than "+ cmdvalue; 
               			}
               			//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
               			return false;                 
             		}
            		break; 
         	}//case greaterthan 
        	case "regexp": 
         	{ 
		 	if(objValue.value.length > 0)
			{
	        		if(!objValue.value.match(cmdvalue)) 
	            		{ 
	              			if(!strError || strError.length ==0) 
	              			{ 
	                			strError = objValue.name+": Invalid characters found "; 
	              			}
	              			//alert(strError); 
					document.getElementById("editerror").style.display="block";
					document.getElementById("editerror").innerHTML = strError;
	              			return false;                   
	            		}
			}
           		break; 
         	}//case regexp 
        	case "dontselect": 
         	{ 
            		if(objValue.selectedIndex == null) 
            		{ 
              			alert("BUG: dontselect command for non-select Item"); 
              			return false; 
            		} 
            		if(objValue.selectedIndex == eval(cmdvalue)) 
            		{ 
             			if(!strError || strError.length ==0) 
              			{ 
              				strError = objValue.name+": Please Select one option "; 
              			}           
              			//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
              			return false;                                   
             		} 
             		break; 
         	}//case dontselect 
		case "URL": 
         	{ 
			if(!isValidURL(objValue.value)) 
               		{ 
                 		if(!strError || strError.length ==0) 
                 		{ 
                    			strError = objValue.name+": Enter a valid URL "; 
                 		}
                 		//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
                 		return false; 
               		}
           		break; 		 	
		 }
	   	case "pass": 
		{  
			if(!DoPasswordMatch()) 
			{  
				//alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
				return false; 
			} 
		   	break; 		 	
		 }
		 case "checkt": 
		 {  
		 	if(!DoCheckBoxChecked()) 
			{ 
				 //alert(strError); 
				document.getElementById("editerror").style.display="block";
				document.getElementById("editerror").innerHTML = strError;
				 return false; 
			}
		   	break; 		 	
			break; 		 	

		 } // case Check

	}//switch 	

	return true; 

}
// removeing spaces
function trim(str, chars)
{
    return ltrim(rtrim(str, chars), chars);
}
// remove space from left side
function ltrim(str, chars) 
{
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
// remove space from right side
function rtrim(str, chars) 
{
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}