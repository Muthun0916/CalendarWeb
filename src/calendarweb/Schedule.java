package calendarweb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

public class Schedule implements Serializable{
	
	//private HashMap<String,Character>  schedule;
	private HashMap<Date,String> schedule;
	private ArrayList<String> users;
	private String name;
	
	//マイスケジュール用
	public Schedule() {
		this.schedule = new HashMap<Date, String>();
	}
	
	//グループスケジュール用
	public Schedule(String name,ArrayList<String> users) {
		this.name=name;
		this.users=users;
	}
	
	public void register(Date date, String stuts) {
		schedule.put(date, stuts);
	}
	
	public void setName(String name) {
		this.name=name;
	}
	
	public String getName() {
		return name;
	}
	
	public HashMap<Date,String> getDates() {
		return schedule;
	}
	
	public String getStuts(Date date) {
		return schedule.get(date);
	}
	
	public void addMember(String username) {
		users.add(username);
	}
	
	public void removeMember(String username) {
		users.remove(username);
	}
	
	public boolean isMember(String username) {
		Iterator<String> userIte = users.iterator();
		while(userIte.hasNext()) {
			if(username.equals(userIte.next())) {
				return true;
			}
		}
		return false;
	}
	
	public ArrayList<String> getMember(){
		return users;
	}
	
	
	

}
