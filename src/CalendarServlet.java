
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import calendarweb.Database;
import calendarweb.Fileloader;
import calendarweb.GroupSchedule;
import calendarweb.MySchedule;
import calendarweb.User;

@WebServlet("/doGet")
@MultipartConfig(
	    fileSizeThreshold = 1024 * 1024, // 1 MB
	    maxFileSize = 1024 * 1024 * 5,   // 5 MB
	    maxRequestSize = 1024 * 1024 * 5 // 5 MB
)
public class CalendarServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException, IOException {
		String method = request.getParameter("method");

		StringBuilder builder = new StringBuilder();
		if(method.equals("mypage")) {
			String username = request.getParameter("user");
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\"");
			builder.append('}');

		}else if(method.equals("registerMySchedule")) {
			String username = request.getParameter("user");
			//System.out.println(request.getQueryString());
			//System.out.println(getQueryMap(request.getQueryString()));
			Map<Date, String> dates = getQueryMap(request.getQueryString());
			Database base  = Fileloader.read();
			User user = base.getUesr(username);
			user.setUpdateDate();
			base.setUser(user);
			MySchedule change = base.getUesr(username).getMySchedule();
			for(Date key: dates.keySet()) {
				change.register(key, dates.get(key));
			}
			base.getUesr(username).setMySchedule(change);
			Fileloader.write(base);
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"output\":\"").append("success").append("\"");
			builder.append('}');

		//グループに所属しているメンバーを取得
		}else if(method.equals("getMySchedule")) {
			String username = request.getParameter("user");
			
			Database base  = Fileloader.read();
			MySchedule dates = base.getUesr(username).getMySchedule();
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			
			for(Date date:dates.getDates().keySet()) {
				SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
				builder.append("\"").append(df.format(date)).append("\":\"").append(dates.getDates().get(date)).append("\",");
			}
			
			builder.append("\"output\":\"").append("success").append("\",");
			builder.append("\"method\":\"").append("init").append("\"");
			builder.append('}');

		}else if(method.equals("getGroupList")) {//グループに所属しているメンバーを取得
			String username = request.getParameter("user");
			
			Database base  = Fileloader.read();
			System.out.println(base.getUserList().toString());
			User user = base.getUesr(username);
			//ArrayList<String> strs = new ArrayList<>();
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"groups\":\"").append(user.getGroupList()).append("\",");
			builder.append("\"output\":\"").append("success").append("\",");
			builder.append("\"method\":\"").append("getGroupList").append("\"");
			builder.append('}');
					
		//メンバーの予定を取得
		}else if(method.equals("getGroupSchedule")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
			
			Database base  = Fileloader.read();
			String type = base.getSchedule(groupName).getType();
			
			ArrayList<String> groups = base.getSchedule(groupName).getMember();
			ArrayList<Date> dateUnion = new ArrayList<>();
			//スケジュール和集合を生成
			for(String user:groups) {
				for(Date date:base.getUesr(user).getMySchedule().getDates().keySet()) {
					if(dateUnion.indexOf(date)==-1) {
						dateUnion.add(date);
					}
				}
			}
			
			HashMap<String,HashMap<String,String> > sendMapArray = new HashMap<>(); 
			
			//Schedule dates = base.getUesr(username).getSchedule();
			builder.append('{');
			//builder.append("\"user\":\"").append(username).append("\",");
			for(Date date:dateUnion) {

				HashMap<String,String> stuts = new HashMap<>(); 
				
				for(String user:groups) {
					
					stuts.put("\""+user+"\"","\""+base.getUesr(user).getMySchedule().getStuts(date)+"\"");
				}
				//builder.append("\"").append(df.format(date)).append("\":\"").append(stuts).append("\",");
				sendMapArray.put("\""+df.format(date)+"\"",stuts);
			}
			
			builder.append("\"changes\":{");
			int i = 0;
			for (String key : sendMapArray.keySet()) {
				builder.append(key + ":{");
			    HashMap<String, String> innerMap = sendMapArray.get(key);
			    int j=0;
			    for (String innerKey : innerMap.keySet()) {
			    	builder.append(innerKey + ":" + innerMap.get(innerKey));
			    	if(j!=innerMap.size()-1)
			    		 builder.append(",");
			    	 j++;
			    }
			    if(i==sendMapArray.size()-1)
			    	builder.append("}");
			    else {
			    	builder.append("},");
			    }
			    i++;
			}
			
			builder.append("},");
			builder.append("\"order\":\"").append(base.getSchedule(groupName).getType()).append("\",");
			builder.append("\"type\":\"").append(type).append("\",");
			builder.append("\"output\":\"").append("success").append("\",");
			builder.append("\"method\":\"").append("getGroupSchedule").append("\"");
			builder.append('}');
			
					
					
		}else if(method.equals("createGroup")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			String type = request.getParameter("type");
			System.out.println(groupName+"作成");
			Database base  = Fileloader.read();
			User user = base.getUesr(username);
			user.addGroup(groupName);
			//初期のメンバーをセット
			ArrayList<String> users = new ArrayList<>();
			users.add(user.getName());
			base.addSchedule(new GroupSchedule(groupName,users,type));
			base.setUser(user);
			Fileloader.write(base);
			
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"output\":\"").append("success").append("\"");
			builder.append('}');
			
			
		}else if(method.equals("getMember")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			Database base  = Fileloader.read();
			System.out.println(groupName);
			System.out.println(base.getGroupScheduleList());
			//File imageFile = new File("WebContent/WEB-INF/"+username+".jpg");
			ArrayList<String> members = base.getSchedule(groupName).getMember();
			HashMap<String,String> imagePear = new HashMap<>();
			for(String member:members) {
				File imageFile = new File(base.getUesr(member).getImgPath());
				byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

			    // Encode the image bytes as a base64 string
			    String base64Image = Base64.getEncoder().encodeToString(imageBytes);
				imagePear.put(member, base64Image);
			}
			builder.append('{');
			builder.append("\"user\":\"").append(username).append("\",");
			builder.append("\"groupName\":\"").append(groupName).append("\",");
			builder.append("\"member\":{");
			int i =0;
			for (String key : imagePear.keySet()) {
				builder.append("\""+key+"\":\""+ imagePear.get(key)+"\"");
				if(imagePear.keySet().size()-1!=i) {
					builder.append(",");
				}
				i++;
			}
			builder.append("},");
			builder.append("\"output\":\"").append("success").append("\",");
			builder.append("\"method\":\"").append("getMember").append("\"");
			builder.append('}');
					
		}else if(method.equals("addMember")) {
			String username = request.getParameter("user");
			String groupName = request.getParameter("groupName");
			String addedMember = request.getParameter("memberName");
			Database base  = Fileloader.read();
			GroupSchedule schedule = base.getSchedule(groupName);
			//存在するメンバーであるかつまだ追加されていないメンバー
			System.out.println(base.isExistUser(addedMember));
			System.out.println(schedule.isMember(addedMember));
			
			if(base.isExistUser(addedMember)&&(!schedule.isMember(addedMember))) {
				File imageFile = new File(base.getUesr(addedMember).getImgPath());
				byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

			    // Encode the image bytes as a base64 string
			    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

				builder.append('{');
				builder.append("\"user\":\"").append(username).append("\",");
				builder.append("\"groupName\":\"").append(groupName).append("\",");
				builder.append("\"newMember\":\"").append(addedMember).append("\",");
				builder.append("\"image\":\"").append(base64Image).append("\",");;
				builder.append("\"method\":\"").append("addMember").append("\",");
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');
				schedule.addMember(addedMember);
				User addedUser = base.getUesr(addedMember);
				addedUser.addGroup(groupName);
				base.setGroupSchedule(schedule);
				base.setUser(addedUser);
				Fileloader.write(base);
			}else {
				builder.append('{');
				builder.append("\"method\":\"").append("addMember").append("\",");
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}
			
					
		}
		String json = builder.toString();
		System.out.println(json);
		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();


	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		String method = request.getParameter("method");

		StringBuilder builder = new StringBuilder();
		
		if(method.equals("sign_in")) {
			//readFile();
			String username = request.getParameter("user");
			String password = request.getParameter("password");
			
			Database base = Fileloader.read();
			
			if(base == null) {
				base = new Database();
			}
			
			String news = "";
			
			if((!(username==""||password=="")&&base.isExistUser(username))&&
					base.getUesr(username).getPassword().equals(password)) {
				news = makeNews(username);
				builder.append('{');
				builder.append("\"user\":\"").append(username).append("\",");
				builder.append("\"news\":\"").append(news).append("\",");
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');
				

			}else {
				builder.append('{');
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}


		}else if(method.equals("sign_up")){
			String username = request.getParameter("user");
			String password1 = request.getParameter("password1");
			String password2 = request.getParameter("password2");
			
			Database base = Fileloader.read();

			if(base == null) {
				base = new Database();
			}

			System.out.println("password1:"+password1);
			System.out.println("password2:"+password2);
			if((!(username==""||password1==""||password2==""||base.isExistUser(username)))&&password1.equals(password2)) {
				builder.append('{');
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');
				
				
				Part imageFile = request.getPart("imageFile");
				
				//画像ファイル未提出である場合
				if(imageFile.getSubmittedFileName() == null){
					base.addUser(new User("WebContent/unKnown.png",username,password1));
					Fileloader.write(base);
					
				//なにか指定している画像ファイルが存在する場合
				}else {
					InputStream fileContent = imageFile.getInputStream();
					FileOutputStream outputStream = new FileOutputStream("WebContent/WEB-INF/userIcon/"+username+".jpg");
					int read;
					final byte[] bytes = new byte[1024];

					while ((read = fileContent.read(bytes)) != -1) {
					    outputStream.write(bytes, 0, read);
					}
					outputStream.close();
					base.addUser(new User("WebContent/WEB-INF/userIcon/"+username+".jpg",username,password1));
					Fileloader.write(base);
				}
					

			}else {
				builder.append('{');
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}
		}else if(method.equals("changeUserStuts")) {
			Database base = Fileloader.read();
			
			String nowUsername = request.getParameter("nowName");
			String newUsername = request.getParameter("newName");
			String password = request.getParameter("password");
			String password1 = request.getParameter("password1");
			String password2 = request.getParameter("password2");
			Part imageFile = request.getPart("imageFile");
			
			String imgPath = "WebContent/unKnown.png";
			if(newUsername=="")
				newUsername = nowUsername;
			
			if(imageFile.getSubmittedFileName()!=null) {
				InputStream fileContent = imageFile.getInputStream();
				FileOutputStream outputStream = new FileOutputStream("WebContent/WEB-INF/userIcon/"+newUsername+".jpg");
				int read;
				final byte[] bytes = new byte[1024];

				while ((read = fileContent.read(bytes)) != -1) {
				    outputStream.write(bytes, 0, read);
				}
				outputStream.close();
				imgPath = "WebContent/WEB-INF/userIcon/"+newUsername+".jpg";

			}
			boolean isSuccess = base.changeUserStuts(imgPath, nowUsername, newUsername, password, password1, password2);
			Fileloader.write(base);
			if(isSuccess) {
				builder.append('{');
				builder.append("\"user\":\"").append(newUsername.length()!=0? newUsername:nowUsername).append("\",");
				builder.append("\"method\":\"").append("changeStuts").append("\",");
				builder.append("\"output\":\"").append("success").append("\"");
				builder.append('}');
			}else {
				builder.append('{');
				builder.append("\"method\":\"").append("changeStuts").append("\",");
				builder.append("\"output\":\"").append("decline").append("\"");
				builder.append('}');
			}
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
	
	public String makeNews(String username) {
		
		Database base = Fileloader.read();
		User user = base.getUesr(username);
		Date loginDate = user.getLoginDate();
		user.setLoginDate();
		String news = "";
		ArrayList<String> yourFriends  = new ArrayList<>();
		//グループリスト参照
		for(String group : user.getGroupList()) {
			//所属するメンバーを取得
			for(String friend:base.getSchedule(group).getMember()) {
				//まだリストに追加していないメンバー&&自分では無い人は追加する
				if(!yourFriends.contains(friend)&&!username.equals(friend)) {
					yourFriends.add(friend);
				}
			}
		}
		for(String friend: yourFriends) {
			if(loginDate.before(base.getUesr(friend).getUpdateDate())) {
				news+=friend+"さんがスケジュールを更新しました!  ";
			}
		}
		user.setNews(news);
		base.setUser(user);
		Fileloader.write(base);
		return news;
	}




}
