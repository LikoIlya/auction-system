import api from "/api.js";
import headerView from "/views/header.js";

export default function auctionView(state, emit) {
  emit("fetch-auctions");

  const { params, auctions } = state;
  let auc = null;
  if (auctions && params.id) {
    auc = auctions.find(a => a.id == params.id);
    if (!auc.bids) {
      auc.bids = []
    }
  }
  return html`
    <body><style>.card-overlay {
          background: rgba(0, 0, 0, 0.5);
        }</style> ${headerView(state, emit)} ${auc ? html`
              <div class="container"><!-- Jumbotron Header -->
                <div class="jumbotron text-white" style="background-size:cover; background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"><div class="card-overlay text-center rounded"><h1 class="display-4">${auc.name}</h1>
                    <hr class="my-2" />
                    <p class="lead">${auc.description}</p></div></div>

                <ul class="list-group">${auc.bids
                      .sort((a, b) => {
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                      })
                      .map(bid => html`
                          <li class="list-group-item d-flex justify-content-between align-items-center">${bid.updatedBy.email} <span class="badge badge-primary badge-pill">${bid.amount}</span></li>`)}</ul>
                < div style = " width: 100 % ; max - width: 330 px; padding: 15 px; margin: 0 auto; " >
                <div class="mb-3"></div>
                <form class=" form-inline" onsubmit="${handleSubmit}" style="margin-left:20px"><div class="form-group mb-2"><label for="staticEmail2" class="sr-only">Email</label> <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="${state.profile.email}" /></div>
                  <div class="form-group mx-sm-3 mb-2"><label for="inputBid" class="sr-only">BID</label> <input type="number" name="amount" class="form-control" id="inputBid" placeholder="BID" /></div>
                  <button type="submit" class="btn btn-primary mb-2">Confirm BID</button></form>
                < /div></div>` : html`
              <h1>Auction Not Found</h1>`}</body>`;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      emit("start-fetching");
      const formData = new FormData(e.currentTarget);
      const params = {};
      for (const [key, value] of formData.entries()) {
        params[key] = value;
      }
      const { data: bid } = await api.post(`/auctions/${auc.id}/bid`, params);
      if (bid.message)
        throw bid;
      emit("add-bid", { auctionId: auc.id, bid });
    } catch (err) {
      alert(err.message);
    } finally {
      emit("stop-fetching");
    }
  }
}
