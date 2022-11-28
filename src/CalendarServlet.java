
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import calendarweb.Database;
import calendarweb.Fileloader;
import calendarweb.Schedule;
import calendarweb.User;


@WebServlet("doGet")
public class CalendarServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException, IOException {
		String method = request.getParameter("method");

		StringBuilder builder = new StringBuilder();
		if(method.equals("login")) {
			//readFile();
			String username = request.getParameter("user");
			String password = request.getParameter("password");
			Database base = Fileloader.read();
			if(base == null) {
				base = new Database();
			}

			if((!(username==""||password=="")&&base.isExistUser(username))&&
					base.getUesr(username).getPassword().equals(password)) {
				builder.append('{');
				builder.append("\"user\":\"").append(username).append("\",");
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');

			}else {
				builder.append('{');
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}


		}else if(method.equals("newAccount")){
			String username = request.getParameter("user");
			String password1 = request.getParameter("password1");
			String password2 = request.getParameter("password2");

			Database base = Fileloader.read();

			if(base == null) {
				base = new Database();
			}

			System.out.println("password1:"+password1);
			System.out.println("password2:"+password2);
			if((!(username==""||password1==""||password2==""))&&password1.equals(password2)) {
				builder.append('{');
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');
				base.addUser(new User(username,password1));
				Fileloader.write(base);

			}else {
				builder.append('{');
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}


		}else if(method.equals("mypage")) {
			String username = request.getParameter("user");
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\"");
			builder.append('}');

		}else if(method.equals("myscheduleGet")) {
			String username = request.getParameter("user");
			
			Database base  = Fileloader.read();
			Schedule dates = base.getUesr(username).getSchedule();
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			for(Date date:dates.getDates().keySet()) {
				SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
				builder.append("\"").append(df.format(date)).append("\":\"").append(dates.getDates().get(date)).append("\",");
			}
			builder.append("\"output\":\"").append("init").append("\"");
			builder.append('}');

		}else if(method.equals("myscheduleRegister")) {
			String username = request.getParameter("user");
			//System.out.println(request.getQueryString());
			//System.out.println(getQueryMap(request.getQueryString()));
			Map<Date, String> dates = getQueryMap(request.getQueryString());
			Database base  = Fileloader.read();
			Schedule change = base.getUesr(username).getSchedule();
			for(Date key: dates.keySet()) {
				change.register(key, dates.get(key));
			}
			base.getUesr(username).setSchedule(change);
			Fileloader.write(base);
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"output\":\"").append("success").append("\"");
			builder.append('}');

		}else if(method.equals("gpLoad")) {
			String username = request.getParameter("user");
			
			Database base  = Fileloader.read();
			System.out.println(base.getUserList().toString());
			User user = base.getUesr(username);
			//ArrayList<String> strs = new ArrayList<>();
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"groups\":\"").append(user.getGroupList()).append("\",");
			builder.append("\"output\":\"").append("gpLoad").append("\"");
			builder.append('}');
					
					
		}else if(method.equals("gpscheduleGet")) {
			String username = request.getParameter("user");
			
			Database base  = Fileloader.read();
			User user = base.getUesr(username);
			ArrayList<String> groups = user.getGroupList();
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"output\":\"").append("success").append("\"");
			builder.append('}');
			
					
					
		}else if(method.equals("createGroup")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			System.out.println(groupName+"作成");
			Database base  = Fileloader.read();
			User user = base.getUesr(username);
			user.addGroup(groupName);
			//初期のメンバーをセット
			ArrayList<String> users = new ArrayList<>();
			users.add(user.getName());
			base.addSchedule(new Schedule(groupName,users));
			base.setUser(user);
			Fileloader.write(base);
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"output\":\"").append("success").append("\"");
			builder.append('}');
			
			
		}else if(method.equals("loadMember")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			Database base  = Fileloader.read();
			System.out.println(groupName);
			System.out.println(base.getScheduleList());
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"groupName\":\"").append(groupName).append("\",");
			builder.append("\"member\":\"").append(base.getSchedule(groupName).getMember()).append("\",");
			builder.append("\"output\":\"").append("memberLoad").append("\"");
			builder.append('}');
					
		}
		else if(method.equals("addMember")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			String addedMember = request.getParameter("memberName");
			Database base  = Fileloader.read();
			Schedule schedule = base.getSchedule(groupName);
			//存在するメンバーであるかつまだ追加されていないメンバー
			System.out.println(base.isExistUser(addedMember));
			System.out.println(schedule.isMember(addedMember));

			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"groupName\":\"").append(groupName).append("\",");
			builder.append("\"newMember\":\"").append(addedMember).append("\",");
			builder.append("\"method\":\"").append("addMember").append("\",");
			if(base.isExistUser(addedMember)&&(!schedule.isMember(addedMember))) {
				schedule.addMember(addedMember);
				User addedUser = base.getUesr(addedMember);
				addedUser.addGroup(groupName);
				base.setSchedule(schedule);
				base.setUser(addedUser);
				Fileloader.write(base);
				
				builder.append("\"output\":\"").append("success").append("\"");
			}else {
				builder.append("\"output\":\"").append("decline").append("\"");
			}
			builder.append('}');
					
		}
		String json = builder.toString();
		System.out.println(json);
		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();


	}
	
	public Map<Date, String> getQueryMap(String query) {  
	    String[] params = query.split("&");  
	    Map<Date, String> map = new HashMap<Date, String>();

	    for (String param : params) {  
	        String name = param.split("=")[0]; 
	        if(name.substring(0, 4).equals("Date")) {
	        	name = name.substring(7).replaceAll("%2F", "/");
	        	SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
	        	Date date = null;
				try {
					date = df.parse(name);
				} catch (ParseException e) {
					e.printStackTrace();
				}
	        	String value = param.split("=")[1];  
	 	        map.put(date, value);  
	        }
	    }  
	    return map;  
	}




}
