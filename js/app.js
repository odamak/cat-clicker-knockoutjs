var Cat = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/cat_picture0.jpeg');
    this.imgAttribution = ko.observable('https://www.flickr.com/photos');

    this.nicknames = ko.observableArray ([  
        { nickname: 'titi'},
        { nickname: 'toutou'},
        { nickname: 'tata'},
        { nickname: 'tutu'},
        { nickname: 'tonton'}
    ]);

    this.level = ko.computed(function(){
        return (this.clickCount() < 3 ? 'infant': 
        (this.clickCount() < 6 ? 'teenage': 
        (this.clickCount() < 11 ? 'adult': 'senior')))
    },this)
}

var ViewModel = function() {

    let self = this;
    this.currentCat = ko.observable(new Cat());
    this.incrementCounter = function() {
        // originally the instruction on line 37 was:
        // this.currentCat().clickCount(this.currentCat().clickCount()+1 )
        // we delete currentCat() when calling clickCount in the following statement
        // although "clickCount" is a variable of the "currentCat" object
        // because when the call is happening inside the DOM in "index.html",
        // we are within the binding context of "with: currentCat"
        // therefore, "this" refers to "currentCat"
        // instead of referring to "ViewModel" as it may appear to be
        // if we read the code of "app.js" independently from "index.html"
        // (beginning of code)
        // this.clickCount(this.clickCount() + 1);
        // (end of code)
        // alternatively, we could add outside of the function block
        // the following declaration statement: "let self = this;"
        // and keep the same instruction stated in line 28 replacing "this" 
        // by "self" as follows:
        // (beginning of code)
        self.currentCat().clickCount(self.currentCat().clickCount()+1)
        // (end of code)
        //Then, no matter from where the function gets called, self will point out
        //to the same object, and we don't need to make any change
    };

}

ko.applyBindings(new ViewModel())