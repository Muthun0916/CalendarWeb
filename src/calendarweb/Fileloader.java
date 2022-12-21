package calendarweb;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Fileloader {
	
	private final static String path = "WebContent/unKnown.png";
	
	public static void write(Database base) {
		
		try {
			ObjectOutputStream output = new ObjectOutputStream(new FileOutputStream("./userinfo.txt"));
			output.writeObject(base);
			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static Database read() {
		Database base = null;
		try {
			ObjectInputStream input = new ObjectInputStream(new FileInputStream("./userinfo.txt"));
			base = (Database)input.readObject();
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return base;
	}
	

	public static void main(String[] args) {
		init();
		starting();
		showUsers();
		System.out.println("=================");
		//showPw();
		//test1();
		//showUsers();
	}
	
	public static void init() {
		Database readBase = new Database();
		//デシリアライズしたあとにイテレーターは初期化されている。
		//そのため再度使うにはcopyToIte()を実行する必要がある。
		for(User user:readBase.getUserList()) {
			System.out.println(user.getName());
		}
		readBase.init();
		for(User user:readBase.getUserList()) {
			System.out.println(user.getName());
		}
		write(readBase);
	}
	
	public static void starting() {
		Database base = read();
		base.addUser(new User(path,"a","ad"));
		base.addUser(new User(path,"b","bd"));
		base.addUser(new User(path,"c","cd"));
		write(base);
	}
	
	public static void resetGroup() {
		Database base = read();
		for(User user : base.getUserList()) {
			for(GroupSchedule sche: base.getGroupScheduleList()) {
				if(sche.isMember(user.getName()))
					user.removeGroup(sche.getName());
			}
		}
		Fileloader.write(base);
	}
	
	public static void showUsers() {
		Database base = read();
		for(User user : base.getUserList()) {
			System.out.println("name :"+user.getName());
			System.out.println("password :"+user.getPassword());
			System.out.println("image :"+user.getImgPath());
			System.out.println("loing :"+user.getLoginDate());
			System.out.println("update :"+user.getUpdateDate());
		}
	}
	
	public static void showGroup() {
		Database base = read();
		for(GroupSchedule group : base.getGroupScheduleList()) {
			System.out.println("name :"+group.getName());
			System.out.println("type :"+group.getType());
		}
	}
	
	public static void showPw() {
		Database base = read();
		for(GroupSchedule schedule :base.getGroupScheduleList()) {
			System.out.println(schedule.getName());
		}
	}

	
	public static void test1() {
		Database base = read();
		base.removeUser("b");	
		base.addUser(new User("WebContent/unKnown.png","d","dd"));
		write(base);
	}
	
	public static void test2() {

	}

}
