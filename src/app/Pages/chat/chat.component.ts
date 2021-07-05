import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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

  constructor(private mainService: MainService) { }

  ngOnInit() {

    this.class_id = JSON.parse(localStorage.getItem('user')).class_is;
    this.user_id = JSON.parse(localStorage.getItem('user'))._id;
    this.loadAllUserForChatBySubject();
  }


  loadAllUserForChatBySubject() {
    let url = environment.filterStudentChatMembers + this.class_id;
    this.mainService.get(url).subscribe(res => {
      res.students.forEach(element => {
        if (element._id !== this.user_id) {
          // return element
          this.students.push(element);
        }
      });
      res.subject.forEach(element => {
        this.teachers.push(element.teacher);
      });;
      this.userForGroupChat = this.teachers.concat(this.students)
      console.log(this.userForGroupChat)
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
