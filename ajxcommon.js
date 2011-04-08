function getHTTPObject()
{
	var xmlHttp;
	try
	{
		xmlHttp=new XMLHttpRequest(); 		// Firefox, Opera 8.0+, Safari
		return xmlHttp;
	}
	catch (e)
	{
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
			return xmlHttp;
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
				return xmlHttp;			
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}	 
}
httpObject = getHTTPObject();  
function getTemplateFromType(templateType)
{
 	if (httpObject!="") 
	{ 
		var params;		
		document.getElementById("templateDiv").innerHTML = "Loading...";
		params = "&action=templatefromtype&typeid="+templateType;
 		httpObject.open("POST", "ajaxfunctions.php",true);
 		httpObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpObject.setRequestHeader("Content-length", params.length);
		httpObject.setRequestHeader("Connection", "close");
		httpObject.send(params);
		
		httpObject.onreadystatechange = function(){
			if(httpObject.readyState==4)
			{
				var results =  Trim(httpObject.responseText); 
				document.getElementById("templateDiv").innerHTML = results;
				frmval1.clearAllValidations();
				frmval1.addValidation("txtArticleName","req","Please enter article name.");
				frmval1.addValidation("lstArticleType","req","Please select template type.");
				frmval1.addValidation("lstTemplate","req","Please select template.");
 			}	
		}
 	}  
}	 
function Trim(s) 
{
	while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
	{
		s = s.substring(1,s.length);
	}
	while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || 	(s.substring(s.length-1,s.length) == '\r'))
	{
		s = s.substring(0,s.length-1);
	}
	return s;
}
