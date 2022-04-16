


function getPageList(totalPages, page, maxLength){
    function range(start, end){
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength  < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;


    if(total <=  maxLength){
        return range(1, totalPages);
    }

    if(page <= maxLength  - sideWidth - 1 - rightWidth) {
        return range( 1, maxLength-sideWidth-1).concat(0, range(totalPages -sideWidth+1, totalPages));

    }

    if(page >= totalPages  - sideWidth - 1 - rightWidth) {
        return range( 1, sideWidth).concat(0, range(totalPages -sideWidth-11, rightWidth-leftWidth, totalPages));;

    }

    return range( 1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages -sideWidth + 1, totalPages));

}

$(function(){
    var numberofitem = $(".card-content .card").length;
    var limitPerpage = 3 // How many Cards items are visible per page
    var totalPage = Math.ceil(numberofitem / limitPerpage);
    var paginationsize = 7;
    var currentPage;

    function showpage(whichPage){
        if(whichPage < 1 || whichPage > totalPage)
            return false

        currentPage = whichPage;

        $(".card-content .card").hide().slice((currentPage - 1) * limitPerpage, currentPage * limitPerpage).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPage, currentPage, paginationsize).forEach(item => {
                $("<li>").addClass("page-item").addClass(item ? "current=page" : "dots").toggleClass("active", item === currentPage).append($("<a>")
                .addClass("page-link")).attr({href: "javascript:void(0)"}).text(item || ("....")).insertBefore(".next-page");
        });


        $(".previous-page").toggleClass("disable", currentPage ==  1);
        $(".next-page").toggleClass("disable", currentPage ==  totalPage);
        return true;
    }


    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>")
        .addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),

        $("<li>").addClass("page-item").addClass("next-page").append($("<a>")
        .addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))

    );
});