var AuditItems = {
	curDate: "",
	selectTips: '<option value="">请选择</option>',
	init: function(){
		this.curDate = new Date();
		this.initElements();
		this.initData();
		this.initEvents();
		this.initTable();
	},
	initElements: function(){
		var self = this;
		laydate.render({
		  elem: '#startInput',
		  theme: '#393D49',
		  value: self.curDate
		});
		laydate.render({
		  elem: '#endInput',
		  theme: '#393D49',
		  value: self.curDate
		});
		laydate.render({
		  elem: '#projectData',
		  theme: '#393D49'
		});
		laydate.render({
		  elem: '#commitDate_add',
		  theme: '#393D49'
		});
	},
	initData: function(){
		var self = this;
		// 初始化大区数据
		Ajax.getBigArea(CommonUtils.bigAreaUrl(), function(res){
			if(res.status === 0){
				var html = self.selectTips;
				var bigAreaArray = res.rows;
				for (var i = 0; i < bigAreaArray.length; i++) {
					html += '<option text="' + bigAreaArray[i].largeareaname + '"value="' + bigAreaArray[i].id + '">' + bigAreaArray[i].largeareaname + '</option>';
					// 查询条件的大区
					$("#bigArea").html(html);
					// 模态框的大区
					$("#bigRegion_add").html(html);
				}
			}
		})
	},
	initEvents: function(){
		var self = this;
		// 为学校select添加change事件
		$("#bigArea").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#schools").empty();
			// 查询条件上面的学校下拉框清空
			$("#profession").empty();
			$("#profession").html(self.selectTips);
			if(!checkValue) {
				$("#schools").html(self.selectTips);
				return;
			}
			Ajax.getSchool(CommonUtils.schoolUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var school = res.rows;
					for (var i = 0; i < school.length; i++) {
						html += '<option text="' + school[i].schoolname + '"value="' + school[i].id + '">' + school[i].schoolname + '</option>';
						$("#schools").html(html);
					}
				}
			})
		});
		// 为学校select添加点击事件
		$("#schools").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#profession").empty();
			if(!checkValue) {
				$("#profession").html(self.selectTips);
				return;
			}
			Ajax.getSubject(CommonUtils.subjectUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var subject = res.rows;
					for (var i = 0; i < subject.length; i++) {
						html += '<option text="' + subject[i].majorname + '"value="' + subject[i].id + '">' + subject[i].majorname + '</option>';
						$("#profession").html(html);
					}
				}
			})
		});
		// 点击查询按钮
		$("#searchBtn").click(function(){
			alert("执行查询逻辑，刷新表格");
		});
		
		// 新增事件
		$("#btnAdd").click(function() {
			//模态框的显示
			$('#myModal').modal('show');
		});
		// 新增模态框的大区change
		$("#bigRegion_add").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 学校下拉框清空
			$("#school_add").empty();
			// 专业下拉框清空
			$("#subject_add").empty();
			$("#subject_add").html(self.selectTips);
			if(!checkValue) {
				$("#school_add").html(self.selectTips);
				return;
			}
			Ajax.getSchool(CommonUtils.schoolUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var school = res.rows;
					for (var i = 0; i < school.length; i++) {
						html += '<option text="' + school[i].schoolname + '"value="' + school[i].id + '">' + school[i].schoolname + '</option>';
						$("#school_add").html(html);
					}
				}
			})
		});
		// 模态框学校select添加点击事件
		$("#school_add").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#subject_add").empty();
			if(!checkValue) {
				$("#subject_add").html(self.selectTips);
				return;
			}
			Ajax.getSubject(CommonUtils.subjectUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var subject = res.rows;
					for (var i = 0; i < subject.length; i++) {
						html += '<option text="' + subject[i].majorname + '"value="' + subject[i].id + '">' + subject[i].majorname + '</option>';
						$("#subject_add").html(html);
					}
				}
			})
		});
		
		// 保存数据
		$("#saveBtn").click(function(){
			// 获取模态框中的数据
			// 大区id
			var bigAreaId = $("#bigRegion_add").find('option:selected').val();
			// 学校id
			var schoolId = $("#school_add").find('option:selected').val();
			// 专业id
			var subjectId = $("#subject_add").find('option:selected').val();
			// 讲师名称
			var teacherName = $("#teacher_add").val();
			// 班级名称
			var className = $("#class_add").val();
			// 分数
			var score = $("#score_add").val();
			// 等级
			var level = $("#level_add").find('option:selected').val();
			// 人次
			var personCount = $("#personCount_add").val();
			// 审阅状态
			var shenyueStatus = $("#shenyueStatus_add").find('option:selected').val();;
			// 双师名称
			var secondTeacher = $("#secondTeacher_add").val();
			// 项目提交日期
			var commitDate = $("#commitDate_add").val();
			// 项目评价
			var evaluate = $("#evaluate_add").val();
			// 原因
			var reason = $("#reason_add").val();
			
			var obj = {
				regionid: bigAreaId, // 大区id
				schoolid: schoolId, // 校区id
				majorid: subjectId, // 专业id
				teachername: teacherName, // 讲师名称
				onlineteachername: secondTeacher, // 在线老师
				classname: className, // 班级名称
				score: score, // 分数
				rank: level,
				reason: reason,
				evaluate: evaluate,
				stage: "第一阶段",
				worknum: personCount,
				state: shenyueStatus,
				submittime: commitDate // 提交日期
			};
			
			Ajax.saveData(CommonUtils.saveDataUrl(), obj, function(res){
				console.log(res);
			})
		})
	},
	initTable: function(){
		// 初始化table
		$('#tb_departments').bootstrapTable({
			dataType : "json",
			url: "json/data.json",
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
			sidePagination : "server",
			//是否显示搜索
			search : true,
			searchAlign : "right",
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
				field : 'teacherName',
				width : 100,
				title : '老师',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'className',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "班级"
			}, {
				field : 'score',
				width : 100,
				title : '分数',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'rank',
				width : 100,
				title : '等级',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'workNum',
				width : 100,
				title : '人次',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'evaluate',
				width : 100,
				title : '评价',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'reason',
				width : 100,
				title : '原因',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'submitTime',
				width : 100,
				title : '提交日期',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'attachment',
				width : 100,
				title : '附件',
				align : 'center',
				valign : 'middle',
				formatter: function(value, row, e){
					return "<a href="+value+">下载</a>";
				}
			}, {
				field : 'operate',
				width : 100,
				title : '操作',
				align : 'center',
				valign : 'middle',
				events : null,
				formatter : function(value, row, e){
					return [
						'<button id="edit" class="btn btn-success btn-xs" type="button">编辑</button>',
						'<button id="remove" class="btn btn-danger btn-xs" type="button">删除</button>'
					].join('');
				}
			} ]
		});
	}
	
	
	
}
