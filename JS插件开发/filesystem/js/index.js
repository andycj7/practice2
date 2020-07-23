var current_display_status = "div_display_folder";

(function () {
	GeoBOS.filesystem.init(function(err){
		if (err) {
			console.log(err.message);
		} else {
			//格式['err,<root_path_>,<foler_num>,<folder_name>,<file_num>,<filer_names>']
			document.getElementById("current_path").value = arguments[1];
			var folder_num = arguments[2];
			var div_display_folder = document.getElementById("div_display_folder");
			for(var i = 3; i < 3+folder_num; i++) {
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByName;
				temp_ul.style.color = "red";
				div_display_folder.appendChild(temp_ul);
			}
			file_num = arguments[3 + folder_num];
			for(var i = 3 + folder_num + 1; i < arguments.length; i++) {
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByName;
				div_display_folder.appendChild(temp_ul);
			}
		}
	});
})();

function removeAllChild(parent_element) {
	
	while(parent_element.hasChildNodes()){
		parent_element.removeChild(parent_element.firstChild);
	}
} 

function openFileOrFolderByName() {
	GeoBOS.filesystem.openFileOrFolderByName(this.innerHTML, function(err){
		if(err) {
			console.log(err.message);
		} else {
			if(arguments[1] == "folder") {
				setDivDisplayFolder();
				document.getElementById("current_path").value = arguments[2];
				var folder_num = arguments[3];
				var div_display_folder = document.getElementById("div_display_folder");
				removeAllChild(div_display_folder);
				for(var i = 4; i < 4 + folder_num; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					temp_ul.style.color = "red";
					div_display_folder.appendChild(temp_ul);
				}
				var file_num = arguments[4 + folder_num];
				for(var i =  4 + folder_num + 1; i < arguments.length; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					div_display_folder.appendChild(temp_ul);
				}
			} else if(arguments[1] == "file") {
				setDivDisplayFile();
				document.getElementById(current_display_status).innerHTML = arguments[2];
			}
		}
	});
}

function onOpen() {
	if(current_display_status != "div_display_folder")
		setDivDisplayFolder();
	var current_path = document.getElementById("current_path").value;
	if(current_path == "")
		return;
	
	GeoBOS.filesystem.openFileOrFolderByPath(current_path, function(err){
		if (err) {
			console.log(err.message);
		} else {
			if(arguments[1] == "folder") {
				setDivDisplayFolder();
				var div_display_folder = document.getElementById("div_display_folder");
				var folder_num = arguments[3];
				removeAllChild(div_display_folder);
				for(var i = 4; i < 4 + folder_num; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					temp_ul.style.color = "red";
					div_display_folder.appendChild(temp_ul);
				}
				var file_num = arguments[4 + folder_num];
				for(var i =  4 + folder_num + 1; i < arguments.length; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					div_display_folder.appendChild(temp_ul);
				}
			} else if(arguments[1] == "file") {
				setDivDisplayFile();
				document.getElementById(current_display_status).innerHTML = arguments[2];
			}
		}
	});
}

function onReturn() {
	
	if(current_display_status != "div_display_folder"){
		
		setDivDisplayFolder();
		return;
	}
	GeoBOS.filesystem.returnPreFolder(function(err){
		if (err) {
			console.log(err.message);
		} else {
			document.getElementById("current_path").value = arguments[1];
			var folder_num = arguments[2];
			var div_display_folder = document.getElementById("div_display_folder");
			removeAllChild(div_display_folder);
			for(var i = 3; i < 3+folder_num; i++) {
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByName;
				temp_ul.style.color = "red";
				div_display_folder.appendChild(temp_ul);
			}
			file_num = arguments[3 + folder_num];
			for(var i = 3 + folder_num + 1; i < arguments.length; i++) {
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByName;
				div_display_folder.appendChild(temp_ul);
			}
		}
	});
}

function openFileOrFolderByPath() {
	
	GeoBOS.filesystem.openFileOrFolderByPath(this.innerHTML, function(err){
		if(err) {
			console.log(err.message);
		} else {
			if(arguments[1] == "folder") {
				setDivDisplayFolder();
				document.getElementById("current_path").value = arguments[2];
				var folder_num = arguments[3];
				var div_display_folder = document.getElementById("div_display_folder");
				removeAllChild(div_display_folder);
				for(var i = 4; i < 4 + folder_num; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					temp_ul.style.color = "red";
					div_display_folder.appendChild(temp_ul);
				}
				var file_num = arguments[4 + folder_num];
				for(var i =  4 + folder_num + 1; i < arguments.length; i++) {
					var temp_ul = document.createElement("li");
					temp_ul.innerHTML = arguments[i];
					temp_ul.onclick = openFileOrFolderByName;
					div_display_folder.appendChild(temp_ul);
				}
			} else if(arguments[1] == "file") {
				setDivDisplayFile();
				document.getElementById(current_display_status).innerHTML = arguments[2];
			}
		}
	});
}

function onSearch() {
	if(current_display_status != "div_display_search_result")
		setDivDisplaySearchResult();
	var search_name = document.getElementById("search_name").value;
	if(search_name == "")
		return;
	
	GeoBOS.filesystem.searchFileOrFolderByName(search_name, function(err){
		if(err)
			console.log(err.message);
		else {
			//
			var div_display_search_result = document.getElementById(current_display_status);
			removeAllChild(div_display_search_result);
			var folder_num = arguments[1];
			for(var i = 2; i < 2 + folder_num; i++) {
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByPath;
				temp_ul.style.color = "red";
				div_display_search_result.appendChild(temp_ul);
			}
			var file_num = arguments[2 + folder_num];
			for(var i = 2 + folder_num + 1; i < arguments.length; i++){
				var temp_ul = document.createElement("li");
				temp_ul.innerHTML = arguments[i];
				temp_ul.onclick = openFileOrFolderByPath;
				div_display_search_result.appendChild(temp_ul);
			}
		}
	})
}

//界面的切换

//设置三种显示界面

function setDivDisplayFolder() {
	
	var current_div = document.getElementById(current_display_status);
	removeAllChild(current_div);
	current_div.style.display = "none";
	current_display_status = "div_display_folder";
	document.getElementById(current_display_status).style.display = "inline";
	document.getElementById("button_open").style.disabled = "false";
	document.getElementById("button_search").style.disabled = "false";
	document.getElementById("button_return").style.disabled = "false";
}

function setDivDisplayFile() {
	
	var current_div = document.getElementById(current_display_status);
	removeAllChild(current_div);
	current_div.style.display = "none";
	current_display_status = "div_display_file";
	document.getElementById(current_display_status).style.display = "inline";
	document.getElementById("button_open").style.disabled = "true";
	document.getElementById("button_search").style.disabled = "true";
	document.getElementById("button_return").style.disabled = "false";
}

function setDivDisplaySearchResult() {
	
	var current_div = document.getElementById(current_display_status);
	removeAllChild(current_div);
	current_div.style.display = "none";
	current_display_status = "div_display_search_result";
	document.getElementById(current_display_status).style.display = "inline";
	document.getElementById("button_open").style.disabled = "ture";
	document.getElementById("button_search").style.disabled = "false";
	document.getElementById("button_return").style.disabled = "false";
}
