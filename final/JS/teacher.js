
const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

function StudentTable({data, app}) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>รหัส</th>
          <th>ชื่อ</th>
          <th>สกุล</th>
          <th>Email</th>
          <th>วันที่เช็คชื่อ</th>
          <th>วิชา</th>
          <th>ห้อง</th>
          <th>กลุ่ม</th>
          <th>แก้ไข</th>
          <th>ลบ</th>
    
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>{s.email}</td>
            <td>{s.class_date}</td>
            <td>{s.subject}</td>
            <td>{s.room}</td>
            <td>{s.section}</td>
            <td><EditButton std={s} app={app}/></td>
            <td><DeleteButton std={s} app={app}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AnswerTable({ answers, checkAnswer }) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>รหัสนักศึกษา</th>
          <th>คำตอบ</th>
          <th>เช็คคำตอบ</th> {/* เพิ่มหัวคอลัมน์เพื่อใส่ปุ่มเช็คคำตอบ */}
        </tr>
      </thead>
      <tbody>
        {answers.map((answer) => (
          <tr key={answer.id}>
            <td>{answer.studentId}</td>
            <td>{answer.answer}</td>
            <td><button onClick={() => checkAnswer(answer)}>เช็ค</button></td> {/* เพิ่มปุ่มเช็คคำตอบ */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}





  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }

   function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }

  function QuestionTable({ questions, viewquestion}) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>คำถามทั้งหมด</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((fetchQuestionsFromDatabase) => (
            <tr key={question.id}>
              <td>{questions.studentId}</td>
              <td>{questions.questions}</td>
              <td><button onClick={() => viewquestion(fetchQuestionsFromDatabase)}>ดูคำถามทั้งหมด</button></td> {/* เพิ่มปุ่มเช็คคำตอบ */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  

  
  
  
  

 



class App extends React.Component {

    
      
      
          
        
    // ฟังก์ชันสำหรับการคลิกปุ่มแสดง/ซ่อนข้อมูลของ Card.Footer
    toggleFooterContent = () => {
        this.setState((prevState) => ({
          showFooterContent: !prevState.showFooterContent,
        }));
      };
      toggleFooterContent2 = () => {
        this.setState((prevState) => ({
          showFooterContent2: !prevState.showFooterContent2,
        }));
      };
    title = (
      <Alert variant="info">
        <b>สำหรับอาจารย์/ผู้สอน</b>
      </Alert>
    );
    
    state = {
        showAllStudents: false,
        showCheckedStudents: false,
        students: [],
        questions: [], // เพิ่ม state สำหรับเก็บคำถาม
        answers: [],   // เพิ่ม state สำหรับเก็บคำตอบ
        scene: 0,
        students:[],
        stdid:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        username: "", // เพิ่ม state สำหรับเก็บข้อมูล username
        password: "", // เพิ่ม state สำหรับเก็บข้อมูล password
        newQuestion: "", // เพิ่ม state สำหรับเก็บคำถามใหม่
      };
      componentDidMount() {
        this.autoReadAnswerQuestion();
        this.autoReadQuestions(); // เรียกใช้เมื่อ Component โหลดเสร็จ
    }

    

   // state = {
    //     scene: 0,
    //     students:[],
    //     stdid:"",
    //     stdfname:"",
    //     stdlname:"",
    //     stdemail:"",
    //     username: "", // เพิ่ม state สำหรับเก็บข้อมูล username
    //     password: "", // เพิ่ม state สำหรับเก็บข้อมูล password
    //     newQuestion: "", // เพิ่ม state สำหรับเก็บคำถามใหม่
        
        
    // }
    checkAnswer(answer) {
      // ดำเนินการเช็คคำตอบ โดยอาจจะใช้การแสดง Alert หรือการแสดงผลใด ๆ ตามที่คุณต้องการ
      alert(`รหัสนักศึกษา: ${answer.studentId}, คำตอบ: ${answer.answer}`);
  }
  viewquestion(questions) {
    // ดำเนินการเช็คคำตอบ โดยอาจจะใช้การแสดง Alert หรือการแสดงผลใด ๆ ตามที่คุณต้องการ
    alert(`คำถามทั้งหมด: ${questions.studentId}`);
}  

    
      
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }
    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
        
    }
    autoRead2() {
        db.collection("check").onSnapshot((querySnapshot) => {
          const checkData = [];
          querySnapshot.forEach((doc) => {
            checkData.push({ id: doc.id, ...doc.data() });
          });
      
          const studentsPromises = checkData.map((check) => {
            return db.collection("students").doc(check.id).get();
          });
      
          Promise.all(studentsPromises)
            .then((studentSnapshots) => {
              const students = studentSnapshots.map((snapshot, index) => {
                const studentData = snapshot.data();
                return {
                  ...studentData,
                  ...checkData[index], // เพิ่มข้อมูลการเช็คชื่อลงในข้อมูลของนักศึกษา
                };
              });
              this.setState({ students: students });
            })
            .catch((error) => {
              console.error("เกิดข้อผิดพลาดในการอ่านข้อมูลนักศึกษา: ", error);
            });
        });
      }
    //   autoReadQuestions() {
    //     db.collection("questions").onSnapshot((querySnapshot) => {
    //         const questions = [];
    //         querySnapshot.forEach((doc) => {
    //             questions.push({ id: doc.id, ...doc.data() });
    //         });
    //         this.setState({ questions: questions });
    //     });
    // }
    autoRead3() {
      db.collection("questions").onSnapshot((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          checkData.push({ id: doc.id, ...doc.data() });
        });

        const questionPromises = questions.map((questions) => {
          return db.collection("questions").doc(questions.id).get();
        });

        Promise.all(questionPromises)
          .then((studentSnapshots) => {
            const students = studentSnapshots.map((snapshot, index) => {
              const studentData = snapshot.data();
              return {
                ...studentData,
                ...questions, // เพิ่มข้อมูลการเช็คชื่อลงในข้อมูลของนักศึกษา
              };
            });
            this.setState({ questions: questions });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอ่านข้อมูลนักศึกษา: ", error);
          });
      });
    }
    autoReadQuestions() {
      db.collection("questions").onSnapshot((querySnapshot) => {
          var questions = [];
          querySnapshot.forEach((doc) => {
              questions.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ questions: questions });
      });
  }
    autoReadAnswerQuestion() {
      db.collection("answers").onSnapshot((querySnapshot) => {
          const answers = [];
          querySnapshot.forEach((doc) => {
              anslist.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ answers: answers });
      });
  }
  
  render() {
      return (
          <div>
              {/* ตรงนี้คุณสามารถเรียกใช้ Component AnswerTable และส่ง props checkAnswer */}
              <AnswerTable answers={this.state.answers} checkAnswer={this.checkAnswer} />
              <QuestionTable questions={this.state.questions} viewquestion={this.viewquestion}/>
          </div>
      );
  }


      
    
    
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           email : this.state.stdemail,
           section : this.state.stdsection,
        });
    }
    edit(std){      
        this.setState({
         stdid    : std.id,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdemail : std.section,
        
        })
     }
     delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
           db.collection("check").doc(std.id).delete();
        }
    }

    checkStudentAttendance() {
        const stdCheckId = this.state.stdCheckId;
        db.collection("students").doc(stdCheckId).get().then((doc) => {
          if (doc.exists) {
            // นักศึกษาพบ
            const studentData = doc.data();
            const studentName = studentData.fname + " " + studentData.lname;
            const currentDate = new Date().toLocaleDateString();
            // ทำการเช็คชื่อใน collection checkin
            db.collection("check").add({
              subject: "Mobile and Web Application Development",
              room: "SC9127",
              class_date: currentDate,
              id: stdCheckId
            }).then(() => {
              alert(`รหัสนักศึกษา: ${stdCheckId}, ชื่อ-สกุล: ${studentName}`);
              // อัปเดต state หรือทำการอื่น ๆ ตามต้องการ
            }).catch((error) => {
              console.error("เกิดข้อผิดพลาดในการเช็คชื่อ: ", error);
            });
          } else {
            // ไม่พบนักศึกษา
            alert("ไม่พบนักศึกษาดังกล่าว");
          }
        }).catch((error) => {
          console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูลนักศึกษา: ", error);
        });
      }
      // ฟังก์ชันเพิ่มคำถามใหม่ลงในฐานข้อมูล Firestore
      addQuestionToDatabase = () => {
        const { newQuestion } = this.state;
        // เพิ่มคำถามใหม่ลงในคอลเลกชัน "questions" ใน Firestore
        db.collection("questions")
          .add({
            question: newQuestion,
            answers: [], // เริ่มต้นยังไม่มีคำตอบเลยเราจะเก็บในรูปแบบของอาเรย์ว่าง
          })
          .then(() => {
            console.log("เพิ่มคำถามใหม่ลงในฐานข้อมูลสำเร็จ");
            // อัปเดต state หรือทำอย่างอื่น ๆ ตามต้องการหลังจากเพิ่มคำถามเสร็จ
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการเพิ่มคำถามใหม่: ", error);
          });
      };
      // ฟังก์ชันเปลี่ยนแปลง state เมื่อผู้ใช้ป้อนคำถามใหม่
      handleNewQuestionChange = (event) => {
        this.setState({ newQuestion: event.target.value });
      };





      
    



    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
            
            <Card style={{ textAlign: "center" }}>
            <Card.Header>{this.title}</Card.Header>
            <Card.Body>
            

            

            <TextInput label="กรอกรหัสเพื่อเช็คชื่อ" app={this} value="stdCheckId" style={{width:120}}/><br/>
            <Button onClick={()=>this.checkStudentAttendance()} style={{ backgroundColor: '#560f74' }}>ยืนยัน</Button>
            
            <br></br>
            <div>
        
        <Button onClick={()=>this.autoRead()}>รายชื่อทั้งหมด</Button>
              <Button onClick={()=>this.autoRead2()}>ดูรายชื่อนักศึกษาที่เช็คชื่อแล้ว</Button>
              <Button onClick={()=>this.autoReadAnswerQuestion()}>เช็คคำตอบ</Button>
              <Button onClick={()=>this.autoRead3()}>ดูคำถามทั้งหมด</Button>
              <div>
              <StudentTable data={this.state.students} app={this}/>  
              
              </div>
              
      </div>

              <br/><br/>
              
            

            

          

            

            
            </Card.Body>

            




            <Card.Footer style={{ textAlign: "center" }}>

            
            <Button onClick={this.toggleFooterContent2} style={{ backgroundColor: '#f2d7fe', color: 'black' }}>
  {this.state.showFooterContent2 ? 'ซ่อนการเพิ่มคำถาม' : 'เพิ่มคำถาม'}
</Button>
{this.state.showFooterContent2 && (
  <div>
    <b>เพิ่มคำถาม</b><br/>
    <label>
      คำถาม:
      <input
        type="text"
        value={this.state.newQuestion}
        onChange={this.handleNewQuestionChange}
      />
    </label>
    <button onClick={this.addQuestionToDatabase}>ยืนยัน</button>
    {this.state.answers && <AnswerTable answers={this.state.answers} />}
  </div>
)}




<p></p>
<p></p>
<br></br>
  {/* เมื่อคลิกปุ่ม "แสดง/ซ่อนข้อมูล" ให้แสดง/ซ่อนข้อมูลของ Card.Footer */}
  <Button onClick={this.toggleFooterContent} style={{ backgroundColor: '#f2d7fe' , color: 'black' }}>
    {this.state.showFooterContent ? 'ซ่อนการเพิ่มข้อมูลนักศึกษา' : 'เพิ่มข้อมูลนักศึกษา'}
  </Button>
  {this.state.showFooterContent && (
    <div>
      <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา </b><br/>
      <TextInput label="รหัศนักศึกษา" app={this} value="stdid" style={{width:120}}/>  
      <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
      <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
      <TextInput label="อีเมล" app={this} value="stdemail" style={{width:150}} />
      <TextInput label="กลุ่ม" app={this} value="stdsection" style={{width:150}} />         
      <Button onClick={()=>this.insertData()} style={{ backgroundColor: '#560f74' }}>บันทึก</Button>
    </div>
  )}
</Card.Footer>
          </Card>          
        );
      }
  
  
    
       
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD6rz5gGWak1SsVY9HgYJnZ2Xo83ejzdvs",
    authDomain: "test-8517b.firebaseapp.com",
    projectId: "test-8517b",
    storageBucket: "test-8517b.appspot.com",
    messagingSenderId: "910179285225",
    appId: "1:910179285225:web:012ec239ff32decc25d878",
    measurementId: "G-CCWS2Z3W9B"
  };
    firebase.initializeApp(firebaseConfig);      
    const db = firebase.firestore();
    // db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`,doc.data());
//   });
// });
  




// ระบุคอมโพเนนต์ที่ใช้สำหรับหน้าแรก
const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
