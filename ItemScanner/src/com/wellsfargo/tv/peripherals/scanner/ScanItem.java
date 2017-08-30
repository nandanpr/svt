package com.wellsfargo.tv.peripherals.scanner;

public class ScanItem {

	private String msgtype;
	private ItemData data;

	
	
	public ItemData getData() {
		return data;
	}
	public void setData(ItemData data) {
		this.data = data;
	}
	public String getMsgtype() {
		return msgtype;
	}
	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}
		
	
}
