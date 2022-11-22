package calendarweb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;


public class Database implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private ArrayList<User> users;	//ユーザー情報
	private ArrayList<Schedule> schedules; //グループスケジュール
	private transient Iterator<User> userIte;
	private transient Iterator<Schedule> scheIte;
	
	public Database() {
		init();
		copyToIte();
	}
	
	public void init() {
		this.users=new ArrayList<>();
		this.schedules=new ArrayList<>();
	}
	
	public void copyToIte() {
		this.userIte=users.iterator();
		this.scheIte=schedules.iterator();
	}
	
	public void copyToArray() {
		this.users= new ArrayList<>();
		while(userIte.hasNext()) {
			users.add((User) userIte.next());
		}
		this.schedules= new ArrayList<>();
		while(userIte.hasNext()) {
			schedules.add((Schedule) scheIte.next());
		}
	}
	
	public void addUser(User user) {
		users.add(user);
		copyToIte();
	}
	
	public void addSchedule(Schedule schedule) {
		schedules.add(schedule);
		copyToIte();
	}
	
	
	public void removeUser(String username) {
		copyToIte();
		while(userIte.hasNext()) {
			if(((User)userIte.next()).getName().equals(username)) 
				userIte.remove();
		}
		copyToArray();
	}
	
	public void removeSchedule(String schedulename) {
		copyToIte();
		while(scheIte.hasNext()) {
			if(((Schedule)scheIte.next()).getName().equals(schedulename)) 
				scheIte.remove();
		}
		copyToArray();
	}
	
	public ArrayList<User> getUserList(){
		return users;
	}
	
	public boolean isExistUser(String username) {
		copyToIte();
		while(userIte.hasNext()) {
			if(((User)userIte.next()).getName().equals(username)) 
				return true;
		}
		return false;
	}
	
	public User getUesr(String username) {
		copyToIte();
		while(userIte.hasNext()) {
			User user = (User)userIte.next();
			if(user.getName().equals(username)) 
				return user;
		}
		return null;
	}
	
	public ArrayList<Schedule> getScheduleList(){
		return schedules;
	}

}
