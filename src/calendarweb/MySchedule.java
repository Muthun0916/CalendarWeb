package calendarweb;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;

public class MySchedule implements Serializable{
	
	private HashMap<Date,String> schedule;
	
	//マイスケジュール用
	public MySchedule() {
		this.schedule = new HashMap<Date, String>();
	}
	
	
	public void register(Date date, String stuts) {
		schedule.put(date, stuts);
	}
	
	
	public HashMap<Date,String> getDates() {
		return schedule;
	}
	
	public String getStuts(Date date) {
		return schedule.get(date);
	}
	

}
