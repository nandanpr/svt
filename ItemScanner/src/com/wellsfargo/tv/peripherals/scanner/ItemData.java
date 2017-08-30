package com.wellsfargo.tv.peripherals.scanner;

public class ItemData {
	private String isn;
	private String au;
	
	private String front;
	private String back;
	private String grayfront;
	private String grayback;
	private String itemtype;
	private String operation;
    private String content;  //any other content related to item
    
	
	public String getIsn() {
		return isn;
	}
	public void setIsn(String isn) {
		this.isn = isn;
	}
	public String getFront() {
		return front;
	}
	public void setFront(String front) {
		this.front = front;
	}
	public String getBack() {
		return back;
	}
	public void setBack(String back) {
		this.back = back;
	}
	public String getGrayfront() {
		return grayfront;
	}
	public void setGrayfront(String grayfront) {
		this.grayfront = grayfront;
	}
	public String getGrayback() {
		return grayback;
	}
	public void setGrayback(String grayback) {
		this.grayback = grayback;
	}
	public String getItemtype() {
		return itemtype;
	}
	public void setItemtype(String itemtype) {
		this.itemtype = itemtype;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getAu() {
		return au;
	}
	public void setAu(String au) {
		this.au = au;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
