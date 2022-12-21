package calendarweb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class User implements Serializable{
	
	private String imgPath;
	private String name;
	private String password;
	private MySchedule schedule;
	private ArrayList<String> groupList;
	private Date loginDate;
	private Date updateDate;
	private String news;
	
	public User(String imgPath,String name,String password)  {
		this.imgPath=imgPath;
		this.name=name;
		this.password=password;
		this.schedule = new MySchedule();
		this.groupList = new ArrayList<>();
		this.loginDate = new Date();
		this.updateDate = new Date();
	}
	
	/*
	 * 現在使用禁止
	public User(String name,String password)  {
		this.name=name;
		this.password=password;
		this.schedule = new MySchedule();
		this.groupList = new ArrayList<>();
	}
	*/
	
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
	
	public MySchedule getMySchedule() {
		return schedule;
	}
	
	public void setMySchedule(MySchedule schedule) {
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
	
	public void setLoginDate() {
		this.loginDate = new Date();
	}
	
	public void setUpdateDate() {
		this.updateDate= new Date();
	}
	
	public Date getLoginDate() {
		return loginDate;
	}
	
	public Date getUpdateDate() {
		return updateDate;
	}
	
	public void setNews(String news) {
		this.news=news;
	}
	
	public String getNews() {
		return news;
	}

}
