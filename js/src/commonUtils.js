var CommonUtils = {
	baseUrl: "http://20.14.3.21:8080",
	bigAreaUrl: function(){// 查询大区地址
		return this.baseUrl+"/survey/projectAudit/show?username=admin&password=a5dec63ec01cefc0418f49aa3073c6b8";
	},
	schoolUrl:function(){// 查询大区学校地址
		return this.baseUrl+"/survey/school/queryByRegion";
	}, 
	subjectUrl:function(){// 查询学校专业地址
		return this.baseUrl+"/survey/major/queryBySchool";
	},
	saveDataUrl: function(){
		return this.baseUrl+"/survey/projectAudit/save";
	}
	
	
}
