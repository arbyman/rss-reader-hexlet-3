const input = document.getElementById('inputRSS');
const button = document.querySelector('.jumbotron button[type="submit"]');
const subscribesList = document.querySelector('.subscribes');
const feedNewsList = document.querySelector('.feed-news');
const alertError = document.createElement('div');
alertError.classList.add('alert', 'alert-danger');
const alertInfo = document.createElement('div');
alertInfo.classList.add('alert', 'alert-info');

const renderInput = ({
  state, url, message, submitDisabled,
}) => {
  alertError.remove();
  button.disabled = submitDisabled;
  input.value = url;
  switch (state) {
    case 'invalid':
      input.classList.add('border', 'border-danger');
      alertInfo.remove();
      alertError.textContent = message;
      input.parentNode.append(alertError);
      break;
    case 'valid':
      input.classList.remove('border', 'border-danger');
      alertInfo.remove();
      break;
    case 'loading':
      alertInfo.textContent = message;
      input.parentNode.append(alertInfo);
      break;
    default:
      input.classList.remove('border', 'border-danger');
      alertInfo.remove();
      input.value = '';
  }
};

const alertLoading = document.createElement('li');
alertLoading.classList.add('list-group-item');
alertLoading.innerHTML = '<h4>Loading...</h4>';

const renderSubscribes = ({ subscribes, state }) => {
  switch (state) {
    case 'loadSuccess':
      subscribes.forEach(({ title, description, id }) => {
        if (document.getElementById(`subscribe-${id}`)) {
          return;
        }
        const newSubscribe = document.createElement('li');
        newSubscribe.classList.add('list-group-item');
        newSubscribe.id = `subscribe-${id}`;
        newSubscribe.innerHTML = `<h4>${title}</h4><p>Description: ${description}</p>`;
        subscribesList.prepend(newSubscribe);
      });
      break;
    case 'loadFailed':
      alertLoading.remove();
      break;
    default:
      alertLoading.remove();
  }
};
const renderNews = ({ state, feedNews }) => {
  feedNews.forEach(({
    titleNews, linkNews, descriptionNews, id,
  }) => {
    const nextNews = document.createElement('li');
    nextNews.classList.add('list-group-item');
    if (state === 'loadSuccess') {
      if (document.getElementById(`news-${id}`)) {
        const badge = feedNewsList.querySelector(`#news-${id} .badge`);
        if (badge) {
          badge.remove();
        }
        return;
      }
      nextNews.id = `news-${id}`;
      nextNews.innerHTML = `
        <a href="${linkNews}">${titleNews} <span class="badge badge-success">New</span></a>
        <button class="btn btn-primary float-right" data-toggle="modal" data-target="#Modal-${id}">Read more</button>
        <div class="modal fade" id="Modal-${id}" tabindex="-1" role="dialog" aria-labelledby="Label-${id}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${titleNews}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <div class="modal-body">${descriptionNews}</div>
            </div>
          </div>
        </div>`;
      feedNewsList.prepend(nextNews);
    }
  });
};
export { renderInput, renderSubscribes, renderNews };
