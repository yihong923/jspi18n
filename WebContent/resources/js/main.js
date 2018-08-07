/**
 * 
 */
$(function(){
	loadProperties();
	
	$('#button_login').click(function(){//点击登录按钮后验证用户信息
		var id = $('#username').val();//用户名
		var payload = {};
		payload['password']=$('#password').val();
		payload = $.toJSON(payload); 
		$.ajax({
			url : 'rest/users/' + id + '/tokens',//REST URI
			type : 'POST',
		    data: payload, // Request body
			contentType : 'application/json',
			dataType:'json',
			success : function(data) {
				//验证成功则显示欢迎信息和密钥
				$('#content').html($.i18n.prop('string_hello',id,data.token));
			},
			error : function(jqXHR, textStatus, errorThrown) {
				if(jqXHR.status == 403){
					//用户不存在
					alert($.i18n.prop('string_usernotexist'));
				}else if(jqXHR.status == 401){
					//密码错误
					alert($.i18n.prop('string_wrongpassword'));
				}else{
					//其他异常信息
					alert(errorThrown);
				}
			}
		});
	});
});

function loadProperties(){
	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
		name:'strings', //资源文件名称
		path:'resources/i18n/', //资源文件路径
		mode:'map', //用Map的方式使用资源文件中的值
		language:'zh',
		callback: function() {//加载成功后设置显示内容
			//用户名
			$('#label_username').html($.i18n.prop('string_username'));
		    //密码
			$('#label_password').html($.i18n.prop('string_password'));
		    //登录
			$('#button_login').val($.i18n.prop('string_login'));
		}
	});
}