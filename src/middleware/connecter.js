class connector{
    constructor(props) {
        this.connection = new WebSocket('ws://127.0.0.1:4444');
        this.state = {date:"test"};
      }
   getdata(){
        // this.connection.onopen=()=>{
        //     console.log("connection is opened ")
        
        // }  
        this.connection .onmessage =(e)=>{
            console.log(e)
           return e
        }
   }
   senddata(){
    var feed = {operation:"getdata"}
    var sendstring=JSON.stringify(feed)
    this.connection .send(sendstring)
   }
}
export default connector;