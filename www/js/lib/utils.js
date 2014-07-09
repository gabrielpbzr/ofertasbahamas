var Message = {
	showAlertMsg: function(msg){
		var msgBox = $('#mensagens');
		msgBox.removeClass('alert-info');
		msgBox.removeClass('alert-success');
		msgBox.removeClass('alert-danger');
		
		msgBox.addClass('alert-warning');
		
		msgBox.find('#msg-text').html(msg);
		msgBox.find('#msg-icon').html('<i class="fa fa-exclamation-circle"></i>');
		msgBox.fadeIn();
		setTimeout(function(){
			msgBox.fadeOut('slow');
			msgBox.find('#msg-icon').html('');
			msgBox.find('#msg-text').html('');			
		}, 3000);
	},
	
	showErrorMsg: function(msg){
		var msgBox = $('#mensagens');
		msgBox.removeClass('alert-info');
		msgBox.removeClass('alert-success');
		msgBox.removeClass('alert-warning');
		
		msgBox.addClass('alert-danger');
		
		msgBox.find('#msg-text').html(msg);
		msgBox.find('#msg-icon').html('<i class="fa fa-times-circle"></i>');
		msgBox.fadeIn();
		setTimeout(function(){
			msgBox.fadeOut('slow');
			msgBox.find('#msg-icon').html('');
			msgBox.find('#msg-text').html('');			
		}, 3000);
	},
	
	showInfoMsg: function(msg){
		var msgBox = $('#mensagens');
		msgBox.removeClass('alert-warning');
		msgBox.removeClass('alert-success');
		msgBox.removeClass('alert-danger');
		
		msgBox.addClass('alert-info');
		
		msgBox.find('#msg-text').html(msg);
		msgBox.find('#msg-icon').html('<i class="fa fa-info-circle"></i>');
		msgBox.fadeIn();
		setTimeout(function(){
			msgBox.fadeOut('slow');
			msgBox.find('#msg-icon').html('');
			msgBox.find('#msg-text').html('');			
		}, 3000);
	},
	
	showSuccessMsg: function(msg){
		var msgBox = $('#mensagens');
		msgBox.removeClass('alert-warning');
		msgBox.removeClass('alert-info');
		msgBox.removeClass('alert-danger');
		
		msgBox.addClass('alert-success');
		
		msgBox.find('#msg-text').html(msg);
		msgBox.find('#msg-icon').html('<i class="fa fa-check-circle fa-lg"></i>');
		msgBox.fadeIn();
		setTimeout(function(){
			msgBox.fadeOut('slow');
			msgBox.find('#msg-icon').html('');
			msgBox.find('#msg-text').html('');			
		}, 3000);
	},
	
	confirm: function(msg, title){
		var result;
		var options_modal = {
			message:msg,
			title: title,
			buttons:{
				sim:{
					label: "Sim",
					className: "btn-primary",
					callback:function(){
						result = true;
					}
				},
			
				nao:{
					label: "N&atilde;o",
					className: "btn-default",
					callback:function(){
						result=false;
					}
				}
			}//Fim de buttons};
		};//Fim de options
		bootbox.dialog(options_modal);
		return result;
	}
}

var Formatter = {
	toCurrency: function(val){
		var formatted = val.toFixed(2);
		formatted = formatted.replace('.', ',');
		return "R$"+formatted;
	},
	
	fromCurrency: function(val){
		val = val.replace(',', '.');
		val = val.replace(/R\$/, '');
		return Number(val);
	},
	
	toFloat: function(val){
		val = val.replace(',', '.');
		return val;
	},
	
	toBRFloat: function(val){
		val = val.replace('.', ',');
		return val;
	}
};

/**
 * Utilitario para conversao entre Date e Strings
 */ 
var DateFormatter = {
	fromDBString: function(strdate){
		if(!strdate){
			return "";
		}
		if(!strdate.match(/[0-9]{4}\-(0|1)[0-9]\-[0-9]{2}/) || strdate.match(/[0-9]{4}\-(0|1)[0-9]\-[0-9]{2} [0-9]{2}\:[0-9]{2}:[0-9]{2}/)){
			throw "ERROR: String is not an ISO-8601 date";
			return null;
		}
		var split = strdate.split("-");
		var year = split[0];
		var month = split[1];
		var day = split[2];
		var dt = new Date(year, month, day);
		
		return dt;
	},
	
	toDBString: function(date){
		if(!date){
			return "";
		}
		
		var month = (Number(date.getMonth())+1);
		if(month < 10){
			month = "0"+month;
		}
		
		var day = date.getDate();
		
		if(day < 10){
			day = "0"+day;
		}
		var strdate = date.getFullYear() + "-" + month + "-" + day;
		return strdate;
	},
	
	toBRString: function(date){
		if(!date){
			return "";
		}
		
		var month = (Number(date.getMonth())+1);
		if(month < 10){
			month = "0"+month;
		}
		var day = date.getDate();
		if(day < 10){
			day = "0"+day;
		}
		var strdate =  day + "/" + month + "/" + date.getFullYear();
		return strdate;
	},
	
	fromBRString: function(strdate){
		var millis = 0;
		if(!strdate.match(/[0-3]*[0-9]\/(0|1)*[0-9]\/[0-9]{4}/)){
			throw "ERROR: String is not in dd/MM/yyyy format";
			return null;
		}
		try{
			var split = strdate.split("/");
			var year = split[2];
			var month = Number(split[1]) - 1;
			var day = split[0];
			var dt = new Date(year, month, day);
			
			return dt;
		}catch(Exception){
			return null;
		}
	}
}
/**
 * Opcoes de configuracao do datepicker do jQuery UI para o portugues
 */ 
function datePickerOptions(){
	return {
		dateFormat: 'dd/mm/yy',
		dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
		dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
		dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
		nextText: 'Próximo',
		prevText: 'Anterior'
	};
}

function criaDataTable(seletor){
	return $(seletor).DataTable({
		"oLanguage": {
			"sEmptyTable":     "Nenhum registro encontrado na tabela",
			"sInfo": "Mostrar _START_ até _END_ do _TOTAL_ registros",
			"sInfoEmpty": "Mostrar 0 até 0 de 0 Registros",
			"sInfoFiltered": "(Filtrar de _MAX_ total registros)",
			"sInfoPostFix":    "",
			"sInfoThousands":  ".",
			"sLengthMenu": "Mostrar _MENU_ registros por pagina",
			"sLoadingRecords": "Carregando...",
			"sProcessing":     "Processando...",
			"sZeroRecords": "Nenhum registro encontrado",
			"sSearch": "Pesquisar",
			"oPaginate": {
				"sNext": "Proximo",
				"sPrevious": "Anterior",
				"sFirst": "Primeiro",
				"sLast":"Ultimo"
			},
			"oAria": {
				"sSortAscending":  ": Ordenar colunas de forma ascendente",
				"sSortDescending": ": Ordenar colunas de forma descendente"
			}

		},
		"bAutoWidth":false
   });
}
