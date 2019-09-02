package com.example.todo;

import com.teamellipsis.dynamic.DynamicApp;
import com.example.todo.Task;

import java.util.ArrayList;
import java.util.HashMap;

public class Todo_App implements DynamicApp {
    private static final long serialVersionUID = 7165582299168504281L;
    int last_task_id;
    ArrayList<Task> tasks;

    public Todo_App() {
        this.tasks = new ArrayList<Task>();
        this.last_task_id=0;
//        TextFile initial= new TextFile("Sample");
//        this.textFiles.add(initial);
    }


    public String getText() {
        return "shehan";
    }


    public void fetchState(Object[] state) {
        this.tasks= (ArrayList<Task>) state[0];

    }
//    String title , String description ,String date

    public Object execute(Object[] args) {

        int arg0= Integer.parseInt((String)args[0]);
        if(arg0==0){ // ADD_Todo
            Task task = new Task(this.last_task_id,(String)args[1],(String)args[2],(String)args[3]);
            this.last_task_id=this.last_task_id+1;
            tasks.add(task);
            System.out.println("task id is:"+task.id);
            return task;
        }
        else if(arg0==1){ //change date
            String txt= "";
            int index= Integer.parseInt((String)args[1]);
            System.out.println(index);
            for (int j = 0; j < tasks.size(); j++) {
                System.out.println(tasks.get(j).id);
                if (tasks.get(j).id == index) {
                    if ((String) args[2] != null) {
                        tasks.get(j).setDate((String) args[2]);
                        return tasks.get(j).date;
                    }
                }
            }
        }
        else if(arg0==2){// setstate {arg[0]==2,
            int index= Integer.parseInt((String)args[1]);
            Task task= tasks.get(index);
            for (int j = 0; j < tasks.size(); j++) {
                if(tasks.get(j).id==index){
                    if((String)args[2]!=null){
                        tasks.get(j).setState((String)args[2]);
                        return tasks.get(j);
                    }

                }
            }

        }
        else if(arg0==3){// setdescrioption
            int index= Integer.parseInt((String)args[1]);
            for (int j = 0; j < tasks.size(); j++) {
                if(tasks.get(j).id==index){
                    if((String)args[2]!=null){
                        tasks.get(j).setDescription((String)args[2]);
                        return tasks.get(j);
                    }

                }
            }

        }
        else if(arg0==4){// settitle
            int index= Integer.parseInt((String)args[1]);
            for (int j = 0; j < tasks.size(); j++) {
                if(tasks.get(j).id==index){
                    if((String)args[2]!=null){
                        tasks.get(j).setTitle((String)args[2]);
                        return tasks.get(j);
                    }

                }
            }

        }
        else if(arg0==5){ //remove task
            int index= Integer.parseInt((String)args[1]);
            for (int j = 0; j < tasks.size(); j++) {
                if(tasks.get(j).id==index){
                    tasks.remove(j);

                }
            }
            return null;
        }
        return "Argument Wrong";
    }


    public Object[] saveState() {

        return this.tasks.toArray();

    }

    public void UpdateTodo(HashMap<String, String> args){
        int id = Integer.parseInt(args.get("id"));
        String title = args.get("title");
        String description = args.get("description");
        String date = args.get("date");
        for (int j = 0; j < tasks.size(); j++) {
            if(tasks.get(j).id==id){
                if(title!=null && description!=null){
                    tasks.get(j).setTitle(title);
                    tasks.get(j).setDescription(description);
                    tasks.get(j).setDate(date);
                }

            }
        }


    }

    public void DoneTodo(HashMap<String, String> args){
        int id = Integer.parseInt(args.get("id"));
//        String title = args.get("title");
//        String description = args.get("description");
        for (int j = 0; j < tasks.size(); j++) {
            if(tasks.get(j).id==id){
                tasks.get(j).setState("Done");
            }
        }
    }
    public void RemoveTodo(HashMap<String, String> args){
        int id = Integer.parseInt(args.get("id"));
//        String title = args.get("title");
//        String description = args.get("description");
        for (int j = 0; j < tasks.size(); j++) {
            if(tasks.get(j).id==id){
                tasks.remove(j);
            }
        }
    }

    public void AddTodo(HashMap<String, String> args){
        String title = args.get("title");
        String description = args.get("description");
        String date = args.get("date");
        Task task = new Task(this.last_task_id,title,description,date);
        this.last_task_id=this.last_task_id+1;
        tasks.add(task);
        System.out.println("task id is:"+task.id);
    }
}
