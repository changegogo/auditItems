var Ajax = {
	// 获取大区数据
	getBigArea: function(url,callback){
		$.ajax({
			type:"get",
			url: url,
			async:true,
			success: function(res){
				callback(res);
			},
			error: function(err){
				console.error(err);
			}
		});
	},
	// 获取校区数据
	getSchool: function(url, bigAreaId, callback){
		$.ajax({
			type:"get",
			url: url,
			async:true,
			data: {
				bigAreaId: bigAreaId
			},
			success: function(res){
				callback(res);
			},
			error: function(err){
				console.error(err);
			}
		});
	},
	// 获取校区专业的数据
	getSubject: function(url, schoolId, callback){
		$.ajax({
			type:"get",
			url: url,
			async:true,
			data: {
				schoolId: schoolId
			},
			success: function(res){
				callback(res);
			},
			error: function(err){
				console.error(err);
			}
		});
	}
}
