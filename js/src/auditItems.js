var AuditItems = {
	init: function(){
		this.initElements();
		this.initData();
		this.initEvents();
		this.initTable();
	},
	initElements: function(){
		console.log("初始化元素");
	},
	initData: function(){
		console.log("初始化数据");
	},
	initEvents: function(){
		console.log("初始化事件");
	},
	initTable: function(){
		// 初始化table
		$('#tb_departments').bootstrapTable({
			dataType : "json",
			toolbar : "#btnAdd",
			showRefresh : false, //刷新按钮
			showToggle : false, // 切换视图
			showColumns : false, //列选择按钮
			buttonsAlign : "left", //按钮对齐方式
			cache : false, // 不缓存
			height : 555, // 设置高度，会启用固定表头的特性
			striped : true, // 隔行加亮
			//是否显示分页（*） 
			pagination : true,
			pageList : [ 10, 25, 50, 100, 'All' ],
			//分页方式：client客户端分页，server服务端分页（*）
			sidePagination : "client",
			//是否显示搜索
			search : true,
			searchAlign : "left",
			columns : [ {
				field : 'id',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "id"
			}, {
				field : 'largeAreaName',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "大区"
			}, {
				field : 'schoolName',
				width : 100,
				title : '学校',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'majorName',
				width : 100,
				title : '专业',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'role',
				width : 100,
				title : '角色',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'teacherName',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "姓名"
			}, {
				field : 'className',
				width : 100,
				title : '班级名',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'operate',
				width : 100,
				title : '操作',
				align : 'center',
				valign : 'middle',
				events : null,
				formatter : null
			} ],
			data : []
		});
	}
	
	
	
}
