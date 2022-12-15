package calendarweb;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class Fileloader {
	
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
		//test2();
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
		base.addUser(new User("a","ad"));
		base.addUser(new User("b","bd"));
		base.addUser(new User("c","cd"));
		write(base);
	}
	
	public static void showPw() {
		Database base = read();
		for(GroupSchedule schedule :base.getGroupScheduleList()) {
			System.out.println(schedule.getName());
		}
	}
	
	public static void test1() {
		Database base = new Database();
		ArrayList<String> users = new ArrayList<>();
		User user = new User("aaa","aaa");
		users.add("aaa");
		base.addSchedule(new GroupSchedule("unti",users,"a"));
		System.out.println(base.getGroupScheduleList());
		System.out.println(base.getUserList());
		base.setUser(user);
		System.out.println(base.getGroupScheduleList());
		System.out.println(base.getUserList());
		write(base);
		base = read();
		System.out.println(base.getGroupScheduleList());
		System.out.println(base.getUserList());
		base.removeUser("aaa");
		System.out.println(base.getGroupScheduleList());
		System.out.println(base.getUserList());
		
	}
	
	public static void test2() {
		Database base = new Database();
		ArrayList<String> users = new ArrayList<>();
		User user = new User("aaa","aaa");
		users.add("aaa");
		base.addSchedule(new GroupSchedule("unti",users,"a"));
		base.getSchedule("unti").showInfo();
		base.setUser(user);
		write(base);
		base = read();
		base.getSchedule("unti").showInfo();

		
	}

}
