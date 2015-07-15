angular.module('app').controller('mvMainCtrl', function () {
    var self = this;
    self.courses = [
        {name: 'Learning 101', featured: true, published: new Date('12/15/14')},
        {name: 'Dont be a dummy', featured: false, published: new Date('6/8/14')},
        {name: 'Dont Suck for Dummys', featured: true, published: new Date('7/4/12')},
        {name: 'Basic logic 2', featured: true, published: new Date('10/6/14')},
        {name: 'Bais Logic 1', featured: false, published: new Date('3/3/13')},
        {name: 'Back to basics', featured: false, published: new Date('4/4/14')},
        {name: 'Basic Programming', featured: false, published: new Date('12/15/17')},
        {name: 'Basic Programming 2', featured: false, published: new Date('12/15/17')},
        {name: 'Basic Programming for the vertically challenged', featured: false, published: new Date('3/15/17')},
        {name: 'Basic Programming for the long legged', featured: false, published: new Date('4/15/17')},
        {name: 'Basic Backend', featured: false, published: new Date('5/15/17')},
        {name: 'Binary B!^@%es', featured: false, published: new Date('12/15/17')},
        {name: 'Frontend for sociopaths', featured: true, published: new Date('3/4/11')},
        {name: 'Happy Wife Happy Life', featured: true, published: new Date('3/4/11')}
    ]
});