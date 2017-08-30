package com.wellsfargo.tv.peripherals.scanner;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.commons.io.IOUtils;

import com.fasterxml.jackson.databind.ObjectMapper;


@WebServlet(value = "/getDBItem")
public class GetDBItemController extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String ientity = request.getParameter("ientity");
		String isn = request.getParameter("isn");
	
		Session session = WsItemScannerSocket.deviceListernerSessions.get(ientity);

		if (session != null && session.isOpen()) {

			//Get image from DAO based on ientity/isn
			String imageData="";
			
			session.getBasicRemote().sendText(imageData);
		} 

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		
		ObjectMapper mapper = new ObjectMapper();


		String ientity = request.getParameter("ientity");
		String isn = request.getParameter("isn");
	
		Session session = WsItemScannerSocket.deviceListernerSessions.get(ientity);

		if (session != null && session.isOpen()) {

			//Get image from DAO based on ientity/isn ..form json string 
			String imageData="";
	

			String message="{\"isn\":\"isn\",\"au\":\"au\",\"front\":\""+ "FRONT"+ "\"" +
    				 ",\"back\":\""+ "BACK"+ "\"" +
    			   	 ",\"grayfront\":\""+ "GRAYFRONT"+ "\""+
    				 ",\"grayback\":\""+ "GRAYBACK"+ "\""
    				+ "}";
			session.getBasicRemote().sendText(message);
		} 

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
 }

	// Generates sample data
	public String getStream() {

		String content = "";
		try {

			InputStream resourceContent = getServletContext()
					.getResourceAsStream("/WEB-INF/sample.txt");
			content = IOUtils.toString(resourceContent, "UTF-8");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return content;
	}

}
