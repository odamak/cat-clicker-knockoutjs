let initialCats = [
{
    clickCount : 0,
    name : 'Tabby',
    imgSrc : 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
    nicknames : ['titi','toutou','tata','tutu','tonton']
},
{
    clickCount : 0,
    name : 'Tiger',
    imgSrc : 'img/4154543904_6e2428c421_z.jpg',
    imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
    nicknames : ['tigi','toutou','tata','tutu','tonton']
},
{
    clickCount : 0,
    name : 'Scaredy',
    imgSrc : 'img/22252709_010df3379e_z.jpg',
    imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709',
    nicknames : ['scary','toutou','tata','tutu','tonton']
},
{
    clickCount : 0,
    name : 'Shadow',
    imgSrc : 'img/1413379559_412a540d29_z.jpg',
    imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559',
    nicknames : ['shady','toutou','tata','tutu','tonton']
},
{
    clickCount : 0,
    name : 'Sleepy',
    imgSrc : 'img/9648464288_2516b35537_z.jpg',
    imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288',
    nicknames : ['sleepsleep','toutou','tata','tutu','tonton']
}
];

let Cat = function(data) {
    self = this;
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nicknames = ko.observableArray (data.nicknames);

    this.title = ko.computed(function(){
        let title;
        let clicks = self.clickCount();
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
    })
    
}

// Make the cats show up in a list (html + bindings)
// Make the cats clickable (function to set new currentCat)

let ViewModel = function() {

    let self = this;
    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem) );
    })

    self.currentCat = ko.observable(this.catList()[0]);

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

    this.setNewCurrentCat = function(clickedCat){
        console.log(clickedCat);
        self.currentCat(clickedCat);
        
    } 

}

ko.applyBindings(new ViewModel())