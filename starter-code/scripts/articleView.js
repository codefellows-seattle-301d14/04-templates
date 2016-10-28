// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {

  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = {authorName:$(this).find('address a').text()};
    var sourceAuthor = $('#stretchAuthor-template').html();
    var renderAuthor = Handlebars.compile(sourceAuthor);
    optionTag = renderAuthor(authorName);
    $('#author-filter').append(optionTag);

    // console.log($(this).attr('data-category'));
    category = {catagoryName:$(this).attr('data-category')};
    var sourceCatagory = $('#stretchCatagory-template').html();
    console.log(category.catagoryName);
    console.log(category);
    var renderCatagory = Handlebars.compile(sourceCatagory);
    optionTag = renderCatagory(category);
    // '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category.catagoryName + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.populateFilters();
articleView.handleCategoryFilter();
articleView.handleAuthorFilter();
articleView.handleMainNav();
articleView.setTeasers();
