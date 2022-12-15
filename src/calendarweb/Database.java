package calendarweb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;


public class Database implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private ArrayList<User> users;	//ユーザー情報
	private ArrayList<GroupSchedule> schedules; //グループスケジュール
	
	public Database() {
		init();
	}
	
	public void init() {
		this.users=new ArrayList<>();
		this.schedules=new ArrayList<>();
	}
	
	public void addUser(User user) {
		users.add(user);
	}
	
	public void addSchedule(GroupSchedule schedule) {
		schedules.add(schedule);
	}
	
	public GroupSchedule getSchedule(String schedulename) {
		Iterator<GroupSchedule> scheIte = schedules.iterator();
		while(scheIte.hasNext()) {
			GroupSchedule schedule = scheIte.next();
			if(schedule.getName().equals(schedulename)) 
				return schedule;
		}
		return null;
	}
	
	
	public void removeUser(String username) {
		Iterator<User> userIte = users.iterator();
		while(userIte.hasNext()) {
			if(((User)userIte.next()).getName().equals(username)) 
				userIte.remove();
		}
		//copyToArray();
	}
	
	public void removeSchedule(String schedulename) {
		Iterator<GroupSchedule> scheIte = schedules.iterator();
		while(scheIte.hasNext()) {
			if(((GroupSchedule)scheIte.next()).getName().equals(schedulename)) 
				scheIte.remove();
		}
		//copyToArray();
	}
	
	public ArrayList<User> getUserList(){
		return users;
	}
	
	public boolean isExistUser(String username) {
		Iterator<User> userIte = users.iterator();
		while(userIte.hasNext()) {
			if(((User)userIte.next()).getName().equals(username)) 
				return true;
		}
		return false;
	}
	
	public User getUesr(String username) {
		Iterator<User> userIte = users.iterator();
		while(userIte.hasNext()) {
			User user = (User)userIte.next();
			if(user.getName().equals(username)) 
				return user;
		}
		return null;
	}
	
	public void setUser(User user) {
		removeUser(user.getName());
		addUser(user);
	}
	
	public void setGroupSchedule(GroupSchedule schedule) {
		removeSchedule(schedule.getName());
		addSchedule(schedule);
	}
	
	public ArrayList<GroupSchedule> getGroupScheduleList(){
		return schedules;
	}

}
