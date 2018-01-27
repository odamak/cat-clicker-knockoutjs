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

    this.currentCat = ko.observable(new Cat());
    
    this.incrementCounter = function() {
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    };

}

ko.applyBindings(new ViewModel())