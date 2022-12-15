package calendarweb;

import java.util.ArrayList;
import java.util.Iterator;

public class GroupSchedule extends MySchedule{
	private ArrayList<String> users;
	private String name;
	private String type;

	//グループスケジュール用
	public GroupSchedule(String name,ArrayList<String> users,String type) {
		this.name=name;
		this.users=users;
		this.type=type;
	}
	
	public void showInfo() {
		System.out.println("name:"+name);
		System.out.println("users:"+users);
		System.out.println("type:"+type);
	}
	
	public void setName(String name) {
		this.name=name;
	}
	
	public String getName() {
		return name;
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
	
	public void setType(String type) {
		this.type=type;
	}
	
	public String getType() {
		return type;
	}

}
