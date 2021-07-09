import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  class_id: any;
  chat_option: any = 'std'

  students: any = [];
  teachers: any = [];
  message: any = '';
  receiver: any = {};

  chat: any = [];

  isChatBoxShow: any = false;
  user_id: any;
  user_role: any;


  userForGroupChat: any = [];
  selectedForGroupChat = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,

  };

  disableScrollDown = false

  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  constructor(private mainService: MainService) { }

  ngOnInit() {

    this.class_id = JSON.parse(localStorage.getItem('user')).class_is;
    this.user_id = JSON.parse(localStorage.getItem('user'))._id;
    this.user_role = JSON.parse(localStorage.getItem('user')).role;
    if (this.user_role == 'student') {

      this.loadAllUserForChatBySubject();
    }
    if (this.user_role == 'teacher') {

      this.loadAllChatMembersForTeacher();
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onScroll() {
    let element = this.myScrollContainer.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false
    } else {
      this.disableScrollDown = true
    }
  }

  scrollToBottom(): void {
    if (this.disableScrollDown) {
      return
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  loadAllChatMembersForTeacher() {
    let url = environment.filterTeacherChatMembers + this.user_id;
    this.mainService.get(url).subscribe(res => {
      if (res.subjects.length > 0) {
        res.subjects.forEach(element => {
          if (element.class.students.length > 0) {
            element.class.students.forEach(ele => {
              let index = this.students.findIndex(x => x._id == ele._id)
              index === -1 ? this.students.push(ele) : console.log('already exsist')
            });
          }
        });
      }
      this.userForGroupChat = this.students;
    }, error => {
      console.log(error)
    })
  }
  loadAllUserForChatBySubject() {
    let url = environment.filterStudentChatMembers + this.class_id;
    this.mainService.get(url).subscribe(res => {
      res.students.forEach(element => {
        if (element._id !== this.user_id) {
          this.students.push(element);
        }
      });
      res.subject.forEach(element => {
     
        let index = this.teachers.findIndex(x => x._id == element.teacher._id)
        index === -1 ? this.teachers.push(element.teacher) : console.log('already exsist')
        // this.teachers.push(element.teacher);
      });
      this.userForGroupChat = this.teachers.concat(this.students)
      // console.log(this.userForGroupChat)
      // console.log(res.subject)
    }, error => {
      console.log(error)
    })
  }

  chatOptionClick(option) {
    this.chat_option = option;
    this.receiver = {};
    this.selectedForGroupChat = [];
    this.isChatBoxShow = false;
    this.chat = [];
  }


  chatListClick(receiver) {

    this.receiver = receiver;
    console.log(this.receiver)
    this.isChatBoxShow = true;
    this.loadChat();
  }


  sendMessage() {
    if (this.message && this.message != null) {
      if (this.chat_option == 'grup') {
        if (this.selectedForGroupChat.length > 0) {
          let allmMesg = [];
          this.selectedForGroupChat.forEach(element => {
            let obj = {
              text: this.message,
              sender: this.user_id,
              receiver: element
            }
            allmMesg.push(obj);
          });

          let url = environment.chatInGroupDefault;
          this.mainService.post(url, { data: allmMesg }).subscribe(res => {
            // console.log(res);
            this.chat.push(res.msg[0]);
            this.message = '';
          }, error => {
            console.log(error)
          })
        } else {
          console.log('No user selected in group list')
        }
      } else {
        let url = environment.chatDefault;
        let data = {
          text: this.message,
          sender: this.user_id,
          receiver: this.receiver._id
        }
        this.mainService.post(url, data).subscribe(res => {
          // console.log(res);
          this.chat.push(res.msg);
          this.message = '';
        }, error => {
          console.log(error);
        })
      }

    }

  }


  loadChat() {
    let url = environment.loadChat;
    let filter = []
    filter.push(this.receiver._id);
    filter.push(this.user_id);
    this.mainService.post(url, { filter: filter }).subscribe(res => {
      console.log(res.chat)
      this.chat = res.chat;
    }, error => {
      console.log(error)
    })
  }




  onItemSelect(item: any) {
    // console.log(item);
    console.log(this.selectedForGroupChat)
    if (this.selectedForGroupChat.length == 0) {
      this.isChatBoxShow = false;
    } else {
      this.isChatBoxShow = true;

    }
  }
  onSelectAll(items: any) {
    this.isChatBoxShow = true;
  }

  onItemDeSelect($event) {
    if (this.selectedForGroupChat.length == 0) {
      this.isChatBoxShow = false;
    } else {
      this.isChatBoxShow = true;

    }
  }
  onDeSelectAll($event) {
    this.isChatBoxShow = false;
  }

}
