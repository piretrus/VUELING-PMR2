///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IntelligentChat v1.8 - 14/Jul/2010
// (c) Anboto Group - www.anbotogroup.com
// Last Update: 6/Nov/2012
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Variables globales//////

//config
var domain = "vueling.anbotocloud.com";
var pathFrontal = "/frontal/chatService";
var pathUpload = "/frontal/upload/";
var pathLang = "js/lang/";
var customer = "chat";
var agente = "Vueling";
var service = 5;
var timerspeed = 2000; //ms | velocidad recarga de chat
var timerUsuarioSpeed = 1800000; //ms | velocidad timeout
var timerTypingSpeed = 1000; //ms | velocidad de comprobación del evento de escritura del usuario

var protocol = "http";
if (window.location.protocol == "https:") {
	protocol = "https";
}
host = protocol +"://"+ domain;

//Idiomas
var languages = new Array();
languages["ES"] = "1";
languages["EN"] = "3";
languages["EU"] = "1";
languages["IT"] = "3";
languages["PT"] = "3";
languages["NL"] = "3";
languages["FR"] = "3";
languages["GA"] = "1";
languages["CA"] = "1";
languages["RU"] = "3";

//debug
var debug = 0;
var pcont = 0;
var rcont = 0;
var debugVisible = false;


//Variables de #datos
var username = "";
var _name = "";
var _sn = "";
var _mail = "";
var _order = "";
var _category = "";
var _subcategory = "";

//Variables de #chat
var _ref = "";
var _pos = "";
var _type = "";
var _lang = 1;

//Variables de #encuesta
var _scoring = "";
var _scoring_tiempo = "";
var _scoring_claridad = "";
var _scoring_resolucion = "";
var _useful = "";
var _comment = "";

//Punteros a divs
var capaIntelligentChat = "Anboto_IntelligentChat";
var capaIntro = "intro";
var capaDatos = "datos";
var capaChat = "chat";
var capaEncuesta = "encuesta";
var capaChatTxt = "ventanachat";
var capaEmotion = "encabezado_chat";
var capaTyping = "typing";

//Declaracion e inicializacion
var objTranslations;
var timerswitch = 0;
var timer;
var timerUsuario;
var timerTyping;
var toque = false;
var istyping = "N";//false;
var visiblecats = false;
var visiblesubcats = false;
var visiblename = false;
var visiblesn = false;
var visiblemail = false;
var contactado = false;

//Categorias
var campos;
var categorias = new Array();

cargaIdioma();
   
//Carga campos de la siguiente pantalla
var url = host + pathFrontal + "?service="+ service +"&action=CAMPOS_FORMULARIO_INICIAL&customer="+ customer +"&lang="+ _lang +"&referer=ch-vuel";
//gResp(url, 'loadFields'); //necesita llamada sincrona

function reset() {
   debug = 0;
   pcont = 0;
   rcont = 0;
   var debugVisible = false;

   timer = 0;

   //Variables de #datos
   username = "";
   _name = "";
   _sn = "";
   _mail = "";
   _order = "";
   _category = "";
   _subcategory = "";

   //Variables de #chat
   _ref = "";
   _pos = "";
   _type = "";

   //Variables de #encuesta
   _scoring = "";
   _scoring_tiempo = "";
   _scoring_claridad = "";
   _scoring_resolucion = "";
   _useful = "";
   _comment = "";
   document.location = document.location.toString().replace(/ref=(.+?)($|&)/gi,'');
}

function loadRef() {
   var params = String(window.location.search);
   if (params.length > 1) {
      //eliminamos el primer caracter '?'
      params = params.substr(1);
	   //insertamos en un array las parejas nombre=valor
	   splits = params.split("&");
	   for (var i=0; i<splits.length; i++) {
	      param = splits[i].split("=");
	      if (param[0] == "ref") {
	         _ref = param[1];
 	    	   break; //toma solo la primera coincidencia
		   }
	   }
   }
}


function loadFields(f) {
   if (debug == 1 && debugVisible) {
     rcont++;
	  document.getElementById('xml').innerHTML = rcont+" "+xml2html(json2xml(f));
   }
   
   if (!isSet(f.response)) {
      return; //no ha recibido los campos
   }
   
   //Carga el texto intro de la pantalla de recogida de datos de usuario
   if (isSet(f.response.titulo)) {
      var titulo = f.response.titulo;
   }
   
   //Carga el json de las categorias
   if (isSet(f.response.categorias) && isSet(f.response.categorias.categoria)) {
      var cats = f.response.categorias.categoria;
	  if (isArray(cats)) {
		 for (var i=0;i<cats.length;i++) { 
	        categorias[i] = new Object();
			categorias[i].id = cats[i].id;
			categorias[i].name = cats[i].valor;
			if (isSet(cats[i].subcategorias.subcategoria)) {
		       var subcats = cats[i].subcategorias.subcategoria;
		       categorias[i].subcategorias = new Array();
			   if (isArray(subcats)) {
				   for (var j=0;j<subcats.length;j++) { 
				     categorias[i].subcategorias[j] = new Object();
	                 categorias[i].subcategorias[j].id = subcats[j].id;
			         categorias[i].subcategorias[j].name = subcats[j].valor;
				  }
   			   } else {
			      categorias[i].subcategorias[0] = new Object();
				  categorias[i].subcategorias[0].id = subcats.id;
			      categorias[i].subcategorias[0].name = subcats.valor;
			   }
		    }
		 }		 
	  } else {
	     categorias[0] = new Object();
		 categorias[0].id = cats.id;
		 categorias[0].name = cats.valor;
	  }
   }
   
   //Carga el json de los campos
   if (isSet(f.response.campos) && isSet(f.response.campos.campo)) {
      campos = f.response.campos.campo;
	  campos.sort(orderFields); //ordena el array segun el valor pos de cada objeto
   }
   loadCapaDatos(true, titulo);//////
}
function orderFields(a,b) {
   return a.pos - b.pos;
}

window.onload = function () {
   //Carga campos de la siguiente pantalla
   loadRef();
   gResp(url, 'loadFields'); //necesita llamada sincrona

   if (debug == 1) {
	  showDebug();      
	}	
	initTranslations();	
}

window.onunload = function () {
   compCierre();
}
window.onbeforeunload = function () {
   compCierre();
}
function compCierre(){
   if (document.getElementById(capaChat).style.visibility == 'visible')
      desconectar(1);
}

/*//////////////////////////
* 1 - desconexión forzada (ventana cerrada) -> cerrar
* 2 - salida del chat -> encuesta
* 3 - salida de encuesta -> cancelar
* 4 - salida de encuesta -> enviar
*///////////////////////////
function desconectar(tipo) {
	if (isSet(_ref) && _ref != "") { //Si ha habido comunicación con el servidor
       //enviar mensaje de desconexion al servidor
	   clearTimeout(timer);
	   clearTimeout(timerUsuario);
	   switch (tipo) {
	      case 1: 
              var url = host + pathFrontal + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=DESTROY&referer=ch-vuel";
		      gResp(url);
			  break;
	      case 2: //var url = host + pathFrontal + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=&scoring_tiempo=&scoring_claridad=&scoring_resolucion=&useful=&comment=";
              var url = host + pathFrontal + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=PREPARE&referer=ch-vuel";
		      gResp(url);
		      loadEncuesta();
			  break;
	      case 3: break;
		  case 4: //var url = host + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring="+ _scoring +"&useful="+ _useful +"&comment="+ _comment; //haria falta cargar dinamicamente la pantalla de encuesta o enviar todos los parametros de ref, etc.
		      var url = host + pathFrontal + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=PUNTUADO&useful="+ _scoring +"&scoring_tiempo="+ _scoring_tiempo +"&scoring_claridad="+ _scoring_claridad +"&scoring_resolucion="+ _scoring_resolucion + "&comment="+ _comment+ "&referer=ch-vuel"; //haria falta cargar dinamicamente la pantalla de encuesta o enviar todos los parametros de ref, etc.
			  gResp(url);
			  //this.document.location="index.htm";
			  reset();//reinicia las variables para no rescatar conversaciones antiguas
			  if (!loadCapaDatos(false)) { //si no hay formulario de inicio cierra la ventana
	          this.window.close();
	            //cierrechat();
	       }
           break;  
	   }
	} else { //No ha llegado a hacer nada
	   if (!loadCapaDatos(false)) { //si no hay formulario de inicio cierra la ventana
	      this.window.close();
	      //cierrechat();
	   }
	   //this.document.location="index.htm";
	}
}

//Espera hasta la carga de traducciones 
function initTranslations() {
	if (isSet(objTranslations) && objTranslations != "") {
	    //loadCategorias(1); //Recaraga las categorias con las traducciones
	    cargaTraducciones(objTranslations);
    } else {
	    setTimeout("initTranslations();", 100);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interacción con elementos de la página
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadCapaDatos(redirect, titulo) {
    activarCapa(capaDatos);
    if (titulo) {
      document.getElementById('PANTALLA-PARAMETROS-TITULO').innerHTML = titulo;
    }
    var dynamicfields = document.getElementById('dynamicfields');
    var empty = true;
	dynamicfields.innerHTML = "";
	for (var i=0;i<campos.length;i++) {
	   if (campos[i].id == 1) { //categorias
		   if (campos[i].habilitado == "T") {
              dynamicfields.innerHTML += '<label for="category">'+campos[i].etiqueta+'</label><select size="1" name="categoria" id="categoria" onchange="loadSubcategorias(this.selectedIndex)"></select><br />';
		      visiblecats = true;
              empty = false;
           }
	   } else if (campos[i].id == 2) { //subcategorias
		   if (campos[i].habilitado == "T") {
              dynamicfields.innerHTML += '<label for="subcategory" id="lblsubcat">'+campos[i].etiqueta+'</label><select size="1" name="subcategoria" id="subcategoria"></select><br id="brsubcat" />';
		      visiblesubcats = true;
              empty = false;
           }
	   } else if (campos[i].id == 3) { //nombre
		   if (campos[i].habilitado == "T") {
              dynamicfields.innerHTML += '<label for="name">'+campos[i].etiqueta+'</label><input type="text" name="nombre" id="nombre" value="" maxlength="50" /><br />';
		      visiblename = true;
              empty = false;
           }
	   } else if (campos[i].id == 4) { //apellidos
		   if (campos[i].habilitado == "T") {
              dynamicfields.innerHTML += '<label for="sn">'+campos[i].etiqueta+'</label><input type="text" name="apellidos" id="apellidos" value="" maxlength="50" /><br />';
		      visiblesn = true;
              empty = false;
           }
	   } else if (campos[i].id == 5) { //email
		   if (campos[i].habilitado == "T") {
              dynamicfields.innerHTML += '<label for="mail">'+campos[i].etiqueta+'</label><input type="text" name="email" id="email" value="" maxlength="45" /><br />';
		      visiblemail = true;
              empty = false;
           }
	   } else {
	      if (campos[i].habilitado == "T") {
             dynamicfields.innerHTML += '<label for="'+campos[i].etiqueta.toLowerCase()+'">'+campos[i].etiqueta+'</label><input type="text" name="'+campos[i].etiqueta.toLowerCase()+'" id="'+campos[i].etiqueta.toLowerCase()+'" value="" maxlength="50" /><br />';
             empty = false;
          }
	   }
	}
   
    if (!empty && visiblecats) {
	   loadCategorias(0);
	}
	//empty = true; //debug
	if (empty) {
       if (redirect) {
	      loadChat();
	   }
	   return false;
    }
	return true;
	//initTranslations();
	
}

function loadCategorias(cat) {
  //if ((cat == null) || (cat == 0)) return; //si no hay ninguna seleccionada sale de la funcion
  //Vacia el menu
  var categoria = document.getElementById('categoria');
  for (var i=categoria.options.length; i>=0; i--) { 
  	  categoria.options[i] = null;
  }
  //carga el menu
  for(var i=0; i<categorias.length; i++) {
	  categoria.options[i] = new Option(categorias[i].name, categorias[i].id);
  }
  categoria.options[0].selected = true;
  //traduceSelect('categoria');
  if (visiblesubcats) {
     loadSubcategorias(categoria.selectedIndex);
  }
}

function loadSubcategorias(cat) {
  //if ((cat == null) || (cat == 0)) return; //si no hay ninguna seleccionada sale de la funcion
  //Vacia el menu
  var subcategoria = document.getElementById('subcategoria');
  for (var i=subcategoria.options.length; i>=0; i--) { 
  	  subcategoria.options[i] = null;
  }
  document.getElementById('subcategoria').style.display = "none";
  document.getElementById('lblsubcat').style.display = "none";
  document.getElementById('brsubcat').style.display = "none";

  if (isSet(categorias[cat].subcategorias) && categorias[cat].subcategorias != "") {
	 var subcategorias = categorias[cat].subcategorias;
	 document.getElementById('lblsubcat').style.display = "inline";
	 document.getElementById('subcategoria').style.display = "inline";
	 document.getElementById('brsubcat').style.display = "inline";
     //carga el submenu
     for(var i=0; i<subcategorias.length; i++) {
	    subcategoria.options[i] = new Option(subcategorias[i].name, subcategorias[i].id);
     }
     subcategoria.options[0].selected = true;
  }
  //traduceSelect('subcategoria');
}

//Carga los datos del formulario #datos
function loadDatos() {
  if (visiblename) 
     username = document.getElementById('nombre').value;
     _name = encodeURIComponent(username);     
  if (visiblesn) 
     _sn = encodeURIComponent(document.getElementById('apellidos').value);
  if (visiblemail) 
     _mail      = encodeURIComponent(document.getElementById('email').value);
  if (visiblecats) 
     _category  = encodeURIComponent(document.getElementById('categoria').value);	
  if (visiblesubcats) {
     _subcategory  = encodeURIComponent(document.getElementById('subcategoria').value);
     if (document.getElementById('subcategoria').value > 0) {
        _category = _subcategory; //la subcategoria se trata como una categoria mas
     }
  }
  //_order     = encodeURIComponent(document.getElementById('ncompra').value);
  //_category = 1; //debug!!!
  if (_category == "") _category = 0;
  if (username == "") {
      if (_lang == 1) {
		  _name = "Usuario";
	  } else { //default
		  _name = "User";
	  }
      username = _name;
   }
}

//Comprueba que esten los datos requeridos en el formulario #datos
function validarDatos() {
   var resultado = true;
   if (visiblename) {
      var nombre = document.getElementById('nombre');
      if (nombre.value == "") {
        nombre.className = "error";
	     resultado = false;
      } else {
        nombre.className = "ok";
      }
   }
   if (visiblesn) {
      var apellidos = document.getElementById('apellidos');
      if (apellidos.value == "") {
        apellidos.className = "error";
	     resultado = false;
      } else {
        apellidos.className = "ok";
      }
   }
   if (visiblemail) {
      var email = document.getElementById('email');
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email.value)){
        email.className = "ok";
      } else {
        email.className = "error";
	     resultado = false;
      }
   }
      
   //return true; //debug puenteado
   return resultado;
}

function sendEncuesta() {
   if (validarEncuesta()) {
      desconectar(4);
      return true;
   } else {
      alert(translate("PANTALLA-OPINION-ALERT-INCOMPLETO"));
   }
}

function validarEncuesta() {
   var resultado = true;
   var servicio   = getRadioValue('scoring');
   //var servicio   = getRadioValue('bloque1');
   var tiempo     = getRadioValue('tiempo');
   var claridad   = getRadioValue('claridad');
   var resolucion = getRadioValue('resolucion');
   var comentario = document.getElementById('comment').value;

   if (!(servicio >0 && servicio <6)) {
       resultado = false;
   } else {
       _scoring = servicio;
   }
   if (!(tiempo >0 && tiempo <6)) {
       resultado = false;
   } else {
       _scoring_tiempo = tiempo;
   }
   if (!(claridad >0 && claridad <6)) {
       resultado = false;
   } else {
       _scoring_claridad = claridad;
   }
   if (!(resolucion >0 && resolucion <6)) {
       resultado = false;
   } else {
       _scoring_resolucion = resolucion;
   }
   _comment = encodeURIComponent(comentario);

   return resultado;
}


//Pasa a la pantalla #chat
function loadChat() {
	if (!validarDatos()) {
	   return;
	}	
    activarCapa(capaChat);
	loadDatos();
	if (_ref > 0) {
      sendFeedback("AV2CHAT");
	}
	//carga variables asociadas a elementos del DOM
	capaEmotion = document.getElementById(capaEmotion);
	capaChatTxt = document.getElementById(capaChatTxt);
	//Escribe automaticamente la linea de entrada
	printResponse(translate("PANTALLA-CHAT-ENTRADILLA"));
}

//Pasa a la pantalla #encuesta
function loadEncuesta() {
	activarCapa(capaEncuesta);
}

function activarCapa(capa) {
   document.getElementById(capaIntro).style.visibility = 'hidden';
   document.getElementById(capaDatos).style.visibility = 'hidden';
   document.getElementById(capaChat).style.visibility = 'hidden';
   document.getElementById(capaEncuesta).style.visibility = 'hidden';
   document.getElementById(capa).style.visibility = 'visible';
}


//Pinta la pregunta del usuario
function printQuestion(pregunta) {
	capaChatTxt.innerHTML += "<div class=\"usuario\"><h3>"+ username +". "+horaActual()+"</h3><p>"+ pregunta + "</p></div>";
	capaChatTxt.scrollTop = capaChatTxt.scrollHeight; //mueve el scroll abajo
    document.getElementById('pregunta').value = ""; //limpia el campo de la pregunta
}

//Pinta la respuesta del servidor
function printResponse(respuesta) {
	capaChatTxt.innerHTML += "<div class=\"agente\"><h3>"+ agente +".  "+horaActual()+"</h3><p>"+respuesta + "</p></div>";
    capaChatTxt.scrollTop = capaChatTxt.scrollHeight; //mueve el scroll abajo
    self.focus();
}

function printLink(caption, target) {
    respuesta = '<img src="img/html.png" class="enlaces" /><a href="'+target+'" target="_blank">'+caption+'</a>';
	capaChatTxt.innerHTML += "<div class=\"agente\"><h3>"+ agente +" - "+horaActual()+"</h3><p>"+respuesta + "</p></div>";
    capaChatTxt.scrollTop = capaChatTxt.scrollHeight; //mueve el scroll abajo
    self.focus();
}

function printFile(file) {
   respuesta = '<img src="img/attach.png" class="enlaces" /><a href="'+target+'" target="_blank">'+caption+'</a>';
   capaChatTxt.innerHTML += "<div class=\"agente\"><h3>"+ agente +" - "+horaActual()+"</h3><p>"+respuesta + "</p></div>";
   capaChatTxt.scrollTop = capaChatTxt.scrollHeight; //mueve el scroll abajo
   self.focus();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Comunicación con el servidor
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Hace la llamada JSONP al servidor
function gResp(url, callback) { 
   var callback = callback || "loadJSON";  
   //Añade los parametros para llamada json
   var now = new Date();
   var d = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
   var uid = _ref +"."+ d.toString(32) +"."+ Math.floor(Math.random()*10000).toString(32);

   var urljson = url+"&output=json&codificacion=utf-8&referer=ch-vuel&callback=" + callback + "&uid="+ uid;// +"&antiCache=" + Math.random();

   //Pinta la peticion GET en la ventana DEBUG
   if (debug == 1 && debugVisible) {
      pcont++;
	  document.getElementById("petition").innerHTML = pcont+" "+urljson.replace(/&/g, "&amp;");; //pinta la peticion que se va a hacer
   }
   //Crea la llamada dinamica al script que recibira JSON
   var head = document.getElementsByTagName("head")[0];  
   var script = document.createElement("script");  
   script.type = "text/javascript";  
   script.src = urljson;  
   head.appendChild(script);  //carga el script
}

//Carga los valores JSON devueltos
function loadJSON(obj){  

   //Recarga el DEBUG XML
   if (debug == 1 && debugVisible) {
      rcont++;
	  document.getElementById('xml').innerHTML = rcont+" "+xml2html(json2xml(obj));
   }

   var errorcode = obj.response.error.cod;
   if (errorcode != "0000" ) { //&& errorcode != 1001 && errorcode != 9999) { //
      //alert('Se ha producido un error: '+ errorcode +' - '+ obj.response.error.desc);
      return;
   }

   if(!isSet(obj.response.context)) { //Ha desconectado
      return; 
   }
   
   var customer = obj.response.context.customer;
   var text     = obj.response.context.text;
   var typing   = obj.response.context.writing;
   var lang     = obj.response.context.lang;
   var ref      = obj.response.context.ref;
   var type     = obj.response.context.type;
   var pos      = obj.response.context.pos;
   
   _ref      = ref;
   _type     = type;
   _pos      = pos;

   if (typing == 'S') {
      document.getElementById(capaTyping).className = "typing-on";
   } else {
      document.getElementById(capaTyping).className = "typing-off";
   }
   //Extrae los nodos de fields
   if(isSet(obj.response.fields.question)) {
      var questions = obj.response.fields.question;
      if (isArray(questions)) { // el JSON devuelto solo formatea como array cuando hay mas de de un elemento de la misma clase
	     for (i=0;i<questions.length;i++) {
  	        loadQuestion(questions[i]); //fields - question
	     }
      } else { // solo hay una pregunta : question (no es un array)
		 loadQuestion(questions);
      }
   } else { //No hay respuesta de texto, pero puede ser de link, archivo o formulario
      if(isSet(obj.response.fields.links)) { //enlaces
	     var links = obj.response.fields.links; 
         loadOnlyLinks(links);
	  //} else if (isSet(obj.response.fields.files)) { //archivos
	  //   var files = obj.response.fields.files; 
	  } else if (isSet(obj.response.fields.file)) { //archivo
	     var file = obj.response.fields.file; 
         loadOnlyFiles(file);
	  } else if (isSet(obj.response.fields.form)) { //formulario
		 var forms = obj.response.fields.form; 
         loadOnlyForms(forms);	  
      } else { //posible update
	     //do nothing
	  }
   }
   if (isSet(obj.response.fields.hold)) { //hold
      if (obj.response.fields.hold == "TRUE") {
         clearTimeout(timerUsuario);
         toque = false;
      } else {
         timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);
      }
   }
   if (type != 'AUTO' && type != 'END') { 
	  //cargar temporizador para chat
	  if (!isSet(timer) || timer == 0) {
	     timer = setTimeout("actualizarChat('"+host + pathFrontal+"');", timerspeed);
	  }
   }
} 

function typing () { 
   clearInterval(timerTyping);
   istyping = "S";//true;
   timerTyping = setInterval('istyping = "N";', timerTypingSpeed);   
}

///////
function avisoTimeOut () {

  //return;//anulado
  
    if (!toque) { //TIMEOUT
	    //avisa de que si no responde en x segs se acabará la conversación
	    var respuesta = translate("AVISO-TIMEOUT");
		var url = host + pathFrontal + "?service="+ service +"&action=TECH_RESP&user=SYSTEM&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=TIMEOUT&text="+ encodeURIComponent(respuesta)+"&referer=ch-vuel"; //respuesta es el mensaje de aviso
	    gResp(url);
	    toque = true;
		clearTimeout(timerUsuario);
        timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);
    } else { //TIMEOVER
	    var respuesta = translate("NOTIFICACION-TIMEOUT");
		var url = host + pathFrontal + "?service="+ service +"&action=TECH_RESP&user=SYSTEM&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=TIMEOUT&text="+ encodeURIComponent(respuesta)+"&referer=ch-vuel"; //respuesta es el mensaje de aviso
	    gResp(url);
		printResponse(respuesta);
		toque = false;
	    clearTimeout(timerUsuario);
		clearTimeout(timer);
        timer = 0;
		//desconectar?
		var url = host + pathFrontal + "?service="+ service +"&action=SCORE&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&scoring=TIMEOUT&referer=ch-vuel";
	    gResp(url); //finaliza la conversación
		_type = "AUTO";
	}
//alert(url);
}

//Carga una respuesta del servidor
function loadQuestion (question) {
   //if (field.getElementsByTagName('connections').length) {		   		  
   if(isSet(question.value))       
      var value       = question.value;
   if(isSet(question.resp))        
      var resp        = question.resp;
   if(isSet(question.emotion))     
      var emotion     = question.emotion;
   if(isSet(question.links))       
      var links       = question.links;
   if(isSet(question.connections)) 
      var connections = question.connections;

   //Carga los enlaces
   if (isSet(links) && isSet(links.link)) {
      links = links.link;
      if (isArray(links)) {
	     for (j=0;j<links.length;j++) {
	         resp = loadLinks(links[j], resp);
         }
	  } else {
		  resp = loadLinks(links, resp);
      }
   }
   //Carga las conexiones asociadas
   if (isSet(connections) && isSet(connections.connection)) {
	  resp = resp+'<br /><br />'+connections.header;
      connections = connections.connection;
	  if (isArray(connections)) {
	     for (var j=0;j<connections.length;j++) {
			 resp = loadConnections(connections[j], resp);
         }
	  } else {
		  resp = loadConnections(connections, resp);
      }
   }

   
   if (resp != '') { //Si la respuesta es vacía no se muestra nada (UPD)
      var respuesta = resp;
      printResponse(respuesta);
	  	  
	  //clearTimeout(timerUsuario);
	  //timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);

	  if (_type == "END") { //el agente te/se ha desconectado
		  clearTimeout(timer); //Para el modo Chat
          timer = 0;
		  clearTimeout(timerUsuario); //Para el timeout del usuario
		  _type = "AUTO";
          contactado = false;
	  } else if (_type == "AUTO") { //modo p&r
		  clearTimeout(timerUsuario); //por si estaba activado
	  } else if (_type == "ASIS") { //respuesta vacia al envio de pregunta
          //do nothing
      } else if (_type == "null") { //esta a la espera de un agente
	      //do nothing
	  } else if (_type != "") { //esta en conversacion con un agente
          if (contactado != true) {
            //window.opener.agenteContactado();
            agenteContactado(_ref);            
            contactado = true;
          }
	      clearTimeout(timerUsuario);
	      timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);
	  } else {
	  	  //do nothing
	  }
   }
}


function loadOnlyLinks (links) {
   var respuesta = "";
   var resp = "";
   if (isSet(links)) {
      //links = links.link;
	  if (isArray(links)) {
	     for (var j=0;j<links.length;j++) {
	         resp = loadLinks(links[j].link, links[j].link.caption);
			 printResponse(resp);
         }
	  } else if (isSet(links.link)) {
		  resp = loadLinks(links.link, links.link.caption);
		  printResponse(resp);
      }
	  clearTimeout(timerUsuario);
	  timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);
   }
}
//Pinta una respuesta del servidor con solo archivos
function loadOnlyFiles (files) {
   var respuesta = "";
   var resp = "";
   if (isSet(files)) {
      //links = links.link;
	  if (isArray(files)) {
	     for (var j=0;j<files.length;j++) {
	         resp = loadFile(files[j]);
			 printResponse(resp);
         }
	  } else {
		  resp = loadFile(files);
		  printResponse(resp);
      }
	  clearTimeout(timerUsuario);
	  timerUsuario = setTimeout("avisoTimeOut();", timerUsuarioSpeed);
   }
}

//Pinta una respuesta del servidor con solo enlaces
function loadOnlyForms (forms) {
   //Envia a la web del cliente el formulario del agente
   if (isSet(forms.xml)) {
      var xml = forms.xml
	  //alert(xml);
	  a2u(xml);
   }
}

//Sustituye las palabras con sus enlaces asignados
function loadLinks (link, resp) {
	var caption = link.caption;
   	var target  = link.target;
	return resp.replace(caption, '<img src="img/html.png" class="enlaces" /><a href="'+target+'" target="_blank">'+caption+'</a>');
	//resp = caption.link(target);
}

//Crea un enlace de un archivo recibido
function loadFile (file) {
	var caption = file.split("/").pop();
   	var target  = file;
	return '<img src="img/attach.png" class="enlaces" /><a href="'+target+'" target="_blank">'+caption+'</a>';
}

//Añade enlaces a otros temas relacionados
function loadConnections (pregunta, resp) {
	return resp +'<br /><a href="javascript: enviarPregunta(\''+ pregunta +'\');">'+ pregunta +'</a>';
}


function actualizarChat() {
    var url = host + pathFrontal + "?service="+ service +"&action=UPDATE_USR&writing="+ istyping +"&ref="+ _ref +"&last_pos="+ _pos +"&customer="+ customer +"&lang="+ _lang +"&category="+ _category+"&referer=ch-vuel";
	gResp(url); //busca nueva respuesta
    timer = setTimeout("actualizarChat();", timerspeed);
}


//Envia una nueva pregunta. Para los enlaces relacionados
function enviarPregunta(pregunta) {
    if (pregunta == "") {
	   return;
	}
	var url = host + pathFrontal + "?service="+ service +"&action=NEW_QUESTION&writing=&ref="+ _ref +"&pos="+ _pos +"&customer="+ customer +"&lang="+ _lang +"&text="+ encodeURIComponent(pregunta)+'&name='+ _name +'&sn='+ _sn +'&mail='+ _mail +'&order='+ _order +'&category='+ _category+"&referer=ch-vuel";
	//Pinta la pregunta del usuario
	printQuestion(pregunta);
	clearTimeout(timerUsuario);
	toque = false;
	gResp(url); 
}

function sendFeedback(feedback) {
   var url = host + pathFrontal + "?service="+ service +"&ref="+ _ref +"&customer="+ customer +"&lang="+ _lang +"&action="+feedback+'&name='+ _name +'&sn='+ _sn +'&mail='+ _mail +'&order='+ _order +'&category='+ _category+"&referer=ch-vuel";
	gResp(url);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Funciones del sistema
/////////////////////////////////////////////////////////////////////////////////////////////////////
function createAjax() {
      var objectAjax = false;
      try {
         //Distinct to internet explorer
         objectAjax = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
         try {
            //For explorer
            objectAjax = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (E) {
            objectAjax = false;
         }
      }
      if (!objectAjax && typeof XMLHttpRequest != 'undefined') {
         objectAjax = new XMLHttpRequest();
      }
      return objectAjax;
}

function horaActual() {
  t = new Date();
  horas = t.getHours()
  minutos = t.getMinutes();
  segundos = t.getSeconds();
  if (horas < 10) horas = '0'+horas;
  if (minutos < 10) minutos = '0'+minutos;
  if (segundos < 10) segundos = '0'+segundos;
  return horas +':'+ minutos +':'+ segundos;
}

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

function inArray(array, elemento)
{
  for(var i=0;i<array.length;i++)
  {
     if (array[i] == elemento)
      return true;
  }
  return false;
}

function isSet(obj) {
   if (typeof obj == "undefined") 
	  return false;
   else
	  return true;
}

function getRadioValue(radiobutton) {
   eval("var rdbtn = document.frmencuesta."+radiobutton);
   for (var i=0; i < rdbtn.length; i++) {
      if (rdbtn[i].checked) {
         var value = rdbtn[i].value;
      }
   }
   return value;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Carga de traducciones
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Carga el parametro idioma recibido por GET
function cargaIdioma(lang) {
   lang = loadLang();
   _lang = languages[lang];
}

//Aplica las traducciones a la pagina
function cargaTraducciones(obj) {
   for (var clave in obj) {
      if(document.getElementById(clave)) {
         if (clave == 'PANTALLA-PARAMETROS-TITULO') continue; //salta esta traduccion
         document.getElementById(clave).innerHTML = obj[clave];
	   }
	  //traduceSelect('categorias');
	  //traduceSelect('subcategorias');
   }
   document.getElementById('goChat').value = obj["PANTALLA-PARAMETROS-BOTON"];
   //document.getElementById('btndesconectar').value = obj["PANTALLA-CHAT-DESCONECTAR"];
   document.getElementById('enviar').value = obj["PANTALLA-OPINION-BOTON-ENVIAR"];
}   

//Traduce el contenido de campos select (categorias, subcategoriaS)
function traduceSelect(id) {
    if(document.getElementById(id)) {
	    for(var i=0;i<document.getElementById(id).options.length;i++) {
	        option = document.getElementById(id).options[i];
		    option.text = translate(option.text);
		}
	}
}

//Traduce una frase
function translate(txt) {
   if (isSet(objTranslations) && objTranslations[txt]) {
      return objTranslations[txt];
   } else {
      return txt;
   }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funciones DEBUG
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function showDebug() { //inserta las capas de debug
   //html a insertar
   var html = document.createElement("div");  
   html.setAttribute('id','debug');
   var pet = document.createElement("div"); 
   pet.setAttribute('id','petition');
   var xml = document.createElement("div"); 
   xml.setAttribute('id','xml');
   html.appendChild(pet);
   html.appendChild(xml);

   //insercion del html
   var body = document.getElementsByTagName("body")[0];  
   body.appendChild(html);  //carga el html

   debugVisible = true;
   return;
}

function xml2html (xml) {
    xml = xml.replace(/</g, "&lt;");
 	xml = xml.replace(/>/g, "&gt;");	
	return xml;
}

function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

function insertLiteral(literalString, targetElement)
{
    literalString = literalString.replace(/>/g,">\r\n");
	var textNode = document.createTextNode(literalString);
    targetElement.appendChild(textNode);
	//alert(textNode);
    return textNode;
}

/**
 * Concatenates the values of a variable into an easily readable string
 * by Matt Hackett [scriptnode.com]
 * @param {Object} x The variable to debug
 * @param {Number} max The maximum number of recursions allowed (keep low, around 5 for HTML elements to prevent errors) [default: 10]
 * @param {String} sep The separator to use between [default: a single space ' ']
 * @param {Number} l The current level deep (amount of recursion). Do not use this parameter: it's for the function's own use
 */
function print_r(x, max, sep, l) {
	l = l || 0;
	max = max || 10;
	//sep = sep || ' ';
	sep = sep || '<br>';
	if (l > max) {
		return "[WARNING: Too much recursion]\n";
	}
	var
		i,
		r = '',
		t = typeof x,
		tab = '';
	if (x === null) {
		r += "(null)\n";
	} else if (t == 'object') {
		l++;
		for (i = 0; i < l; i++) {
			//tab += sep;
		}
		tab += sep;//
		if (x && x.length) {
			t = 'array';
		}
		r += '(' + t + ") :\n";
		for (i in x) {
			try {
				r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1));
			} catch(e) {
				return "[ERROR: " + e + "]\n";
			}
		}
	} else {
		if (t == 'string') {
			if (x == '') {
				x = '(empty)';
			}
		}
		r += '(' + t + ') ' + x + "\n";
	}
	return r;
};

