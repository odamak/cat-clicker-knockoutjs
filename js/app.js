let Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nicknames = ko.observableArray (data.nicknames);

    this.title = ko.computed(function(){
        let title;
        let clicks = this.clickCount();
        if (clicks < 5) {
            title = 'Newborn';
        } else if (clicks < 10) {
            title = 'Infant';
        } else if (clicks < 15) {
            title = 'Child';
        } else if (clicks < 20) {
            title = 'Teen';
        } else if (clicks < 25) {
            title = 'Adult';
        } else {
            title = 'Ninja';
        }
        return title;
    },this)
    
}

let ViewModel = function() {

    let self = this;
    this.currentCat = ko.observable(new Cat({
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/cat_picture0.jpeg',
            imgAttribution : 'https://www.flickr.com/photos',
            nicknames : ['titi','toutou','tata','tutu','tonton']
        })
    );
    this.incrementCounter = function() {
        // originally the instruction of code * was:
        // this.currentCat().clickCount(this.currentCat().clickCount()+1 )
        // we delete currentCat() when calling clickCount in the following statement
        // although "clickCount" is a variable of the "currentCat" object
        // because when the call is happening inside the DOM in "index.html",
        // we are within the binding context of "with: currentCat"
        // therefore, "this" refers to "currentCat"
        // instead of referring to "ViewModel" as it may appear to be
        // if we read the code of "app.js" independently from "index.html"
        // (beginning of code **)
        // this.clickCount(this.clickCount() + 1);
        // (end of code **)
        // alternatively, we could add outside of the function block
        // the following declaration statement: "let self = this;"
        // and keep the same instruction stated in code ** replacing "this" 
        // by "self" as follows:
        // (beginning of code *)
        self.currentCat().clickCount(self.currentCat().clickCount()+1)
        // (end of code *)
        //Then, no matter from where the function gets called, self will point out
        //to the same object, and we don't need to make any change
    };

}

ko.applyBindings(new ViewModel())