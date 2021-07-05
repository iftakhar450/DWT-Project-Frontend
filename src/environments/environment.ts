// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://192.168.1.102:3000',
  login: '/login',

  // all default routes
  userDefault: '/user',
  filterUsers: '/user/filter/',
  classDefault: '/class',
  subjectDefault: '/subject',
  testDefault: '/test',
  chatDefault:'/message',
  chatInGroupDefault:'/message/group',

  // dashboard data
  adminDashboardData: '/dashboard/admin',

  //subject
  getTeacherSubject: '/subject/teacher/',
  archiveSubject: '/subject/archive/',
  getClassSubject: '/class/subject/',

  //test
  getTeacherTests: '/test/teacher/',
  getTestsMarkscheet: '/test/markscheet/',

  // test result

  updateMultipleTestResult: '/test/result',
  updateSingleTestResult: '/test/singleresult',
  getTestForStudent: '/test/student',
  studentSubjectDetail:'/testresult/subject',
  studentResultCard: '/test/result/card/',
  // chat
 
  filterStudentChatMembers :'/chat/menbers/student/',
  loadChat:'/load/message',




};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
