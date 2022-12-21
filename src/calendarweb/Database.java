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
		System.out.println("ユーザー追加:"+user.getName());
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
		//users = copyToArray(userIte);
	}
	

	public void removeSchedule(String schedulename) {
		Iterator<GroupSchedule> scheIte = schedules.iterator();
		while(scheIte.hasNext()) {
			if(((GroupSchedule)scheIte.next()).getName().equals(schedulename)) 
				scheIte.remove();
		}
		
		//schedules = copyToArray(scheIte);
	}
	
	private <T> ArrayList<T> copyToArray(Iterator<T> ite) {
		ArrayList<T> array = new ArrayList<>();
		while(ite.hasNext()) {
			array.add(ite.next());
		}
		return array;
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
	
	public boolean changeUserStuts(String imgPath,String nowName,String newName,String nowPassword,String password1,String password2) {
		User user = getUesr(nowName);
		String nowImgPath = user.getImgPath();
		String password = user.getPassword();
		newName  = newName.trim().replaceAll("　","");
		
		if(!user.getPassword().equals(nowPassword)) {
			return false;
		}	
		
		if((password1.length()!=1||password2.length()!=1)&&password1.equals(password2)) {
			System.out.println("パスワード変更");
			user.setPassword(password1);
			password = password1;
		}
		
		if(imgPath.length()!=0) {
			System.out.println("アイコン変更");
			user.setImgPath(imgPath);
			nowImgPath = imgPath;
		}
		
		
		if(newName.length()!=0) {
			System.out.println("名前変更:"+nowName+"⇨"+newName);
			MySchedule mySchedule = user.getMySchedule();
			removeUser(nowName);
			User newUser = new User(nowImgPath,newName,password);
			newUser.setMySchedule(mySchedule);
			//グループ内の名前の表示も変更する
			for(GroupSchedule schedule : schedules) {
				Iterator<String> userIte = schedule.getMember().iterator();
				//発見フラグ
				boolean isContain = false;
				//イテレーターで名前を見つける
				while(userIte.hasNext()) {
					String username = userIte.next();
					if(username.equals(nowName)) {
						userIte.remove();
						isContain =true;
						break;
					}
				}
				//削除したユーザー名を追加
				if(isContain) {
					schedule.addMember(newName);
					newUser.addGroup(schedule.getName());
				}
			}
			addUser(newUser);
			
		}else {
			setUser(user);
		}
		
		
		return true;
		
	}
	
	public ArrayList<GroupSchedule> getGroupScheduleList(){
		return schedules;
	}

}
