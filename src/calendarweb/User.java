package calendarweb;

import java.io.Serializable;
import java.util.ArrayList;

public class User implements Serializable{
	
	private String imgPath;
	private String name;
	private String password;
	private Schedule schedule;
	private ArrayList<String> groupList;
	
	public User(String imgPath,String name,String password)  {
		this.imgPath=imgPath;
		this.name=name;
		this.password=password;
		this.schedule = new Schedule();
		this.groupList = new ArrayList<>();
	}
	
	public User(String name,String password)  {
		this.name=name;
		this.password=password;
		this.schedule = new Schedule();
		this.groupList = new ArrayList<>();
	}
	
	
	public String getImgPath() {
		return imgPath;
	}
	
	public void setImgPath(String imgPath) {
		this.imgPath=imgPath;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name=name;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password=password;
	}
	
	public Schedule getSchedule() {
		return schedule;
	}
	
	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}
	
	public void addGroup(String name) {
		groupList.add(name);
	}
	
	public void removeGroup(String name) {
		groupList.remove(name);
	}
	
	public boolean isHasGroup(String name) {
		return groupList.contains(name);
	}
	
	public ArrayList<String> getGroupList(){
		return groupList;
	}

}
