var ViewModel = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/cat_picture0.jpeg');
    this.imgAttribution = ko.observable('https://www.flickr.com/photos');

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };

}

ko.applyBindings(new ViewModel())