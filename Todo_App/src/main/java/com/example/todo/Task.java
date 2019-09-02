package com.example.todo;//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;

import com.teamellipsis.dynamic.DynamicApp;

public class Task implements DynamicApp {
    private static final long serialVersionUID = 7165582299168504283L;


    String title;
    String state;
    String description;
    String date;
    int id;

    public Task(int id , String title , String description , String date) {
        this.title = title;
        this.state="Not_done";
        this.description=description;
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
//        LocalDate localDate = LocalDate.now();
        this.date=date;
        this.id=id;

//        this.subTopicList= new ArrayList<>();
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public String getState() {
        return state;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return null;
    }

    public void fetchState(Object[] state) {

    }

    public Object execute(Object[] args) {
        return null;
    }

    public Object[] saveState() {
        return new Object[0];
    }
}
