class faqController{
    constructor(){
        $.get("views/faq.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {
        this.faq = $(data);

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.faq);

    }

    error() {
        $(".content").html("Failed to load the landingspage!");
    }


}