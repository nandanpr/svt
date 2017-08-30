package com.wellsfargo.tv.peripherals.scanner;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

//This Endpoint will be exposed to external systems  to accept HTTP
//connections and interact with WebSockets

@WebServlet(value = "/getItem")
public class ItemScannerController extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		String deviceId = request.getParameter("deviceId");
		String data = request.getParameter("data");
	


/*		Session session = RecieveFormSocket.deviceSessions.get(deviceId);

		if (session != null && session.isOpen()) {

			session.getBasicRemote().sendText(data);
		} 
*/
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//String type="{\"type\":\"write\"}";
		
		//String msg="{\"content\":" + "\"" .concat(CheckImages.frontImage).concat("\"").concat("}");
		
		//String msg="{\"xcontent\":\""+ "test" + "\"}";
		String msg="{\"isn\":\"1234567890901234560001\",\"au\":\"04166\",\"front\":\""+ CheckImages.frontImage + "\"" + 
				",\"back\":\""+ CheckImages.backImage + "\"" +
				",\"grayfront\":\""+ CheckImages.grayfrontImage + "\"" + 
				",\"grayback\":\""+ CheckImages.graybackImage + "\"}"
		         ;	
		
		System.out.println("DMS HTTP POST response message::"+ msg);
		response.getWriter().println(msg);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		String deviceId = request.getParameter("deviceId");
		String data = request.getParameter("data");
	


/*		Session session = RecieveFormSocket.deviceSessions.get(deviceId);

		if (session != null && session.isOpen()) {

			session.getBasicRemote().sendText(data);
		} 
*/
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//String type="{\"type\":\"write\"}";
		
		//String msg="{\"content\":" + "\"" .concat(CheckImages.frontImage).concat("\"").concat("}");
		
		//String msg="{\"xcontent\":\""+ "test" + "\"}";
		String msg="{\"isn\":\"1234567890901234560001\",\"au\":\"04166\",\"front\":\""+ CheckImages.frontImage + "\"" + 
				",\"back\":\""+ CheckImages.backImage + "\"" +
				",\"grayfront\":\""+ CheckImages.grayfrontImage + "\"" + 
				",\"grayback\":\""+ CheckImages.graybackImage + "\"}"
		         ;	
		
		System.out.println("DMS HTTP GET response message::"+ msg);
		response.getWriter().println(msg);
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
