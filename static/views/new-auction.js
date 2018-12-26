import api from "/api.js";
import headerView from "/views/header.js";

export default function newAuctionView(state, emit) {
  return html`
    <body class="text-center">
      ${headerView(state, emit)}

      <form
        style="
          width: 100%;
          max-width: 330px;
          padding: 15px;
          margin: 0 auto;
        "
        onsubmit="${handleSubmit}"
      >
        <img
          class="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-1 font-weight-normal">New Auction</h1>
        <div class="mb-3"></div>
        <label for="inputName" class="sr-only">Name</label>
        <input
          type="text"
          name="name"
          id="inputName"
          class="form-control"
          placeholder="Name"
          required=""
        />
        <div class="mb-3"></div>
        <label for="inputDescription" class="sr-only">Description</label>
        <input
          type="text"
          name="description"
          id="inputDescription"
          class="form-control"
          placeholder="Description"
          required=""
        />
        <div class="mb-3"></div>
        <label for="inputLocation" class="sr-only">Location</label>
        <input
          type="text"
          name="location"
          id="inputLocation"
          class="form-control"
          placeholder="Location"
          required=""
        />
        <div class="mb-3"></div>
        <label for="inputImg" class="sr-only">Image URL</label>
        <input
          type="text"
          name="img"
          id="inputImg"
          class="form-control"
          placeholder="Image URL"
          required=""
        />
        <div class="mb-3"></div>
        <div class="mb-3"></div>
        <label for="inputEndTime" class="sr-only">End time</label>
        <input
          type="date"
          name="endTime"
          id="inputEndTime"
          class="form-control"
          placeholder="End time"
          required=""
        />
        <div class="mb-3"></div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Submit Auction
        </button>
      </form>
    </body>
  `;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      emit("start-fetching");
      const formData = new FormData(e.currentTarget);
      const params = {};
      for (const [key, value] of formData.entries()) {
        params[key] = value;
      }

      const { data: auc } = await api.post("/auctions", params);
      emit("add-auction", auc);
    } catch (err) {
      alert(err.message);
    } finally {
      emit("stop-fetching");
    }
  }
}
