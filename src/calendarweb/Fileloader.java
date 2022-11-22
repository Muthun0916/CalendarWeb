package calendarweb;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

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
		
		/*
		writeBase.addUser(user1);
		writeBase.addUser(user2);
		write(writeBase);
		System.out.println(writeBase.getUserList().get(1).getName());
		*/
		Database readBase = new Database();
		//Database readBase  = read();
		//デシリアライズしたあとにイテレーターは初期化されている。
		//そのため再度使うにはcopyToIte()を実行する必要がある。
		//System.out.println(writeBase.getUserList().get(1).getName());
		for(User user:readBase.getUserList()) {
			System.out.println(user.getName());
		}
		readBase.init();
		for(User user:readBase.getUserList()) {
			System.out.println(user.getName());
		}
		write(readBase);
	}

}
