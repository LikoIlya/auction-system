import api from "/api.js";

export default function auctionsStore(state, emitter) {
  state.auctions = null;

  emitter.on("fetch-auctions", async () => {
    try {
      if (state.auctions) return;

      emitter.emit("start-fetching");
      const { data } = await api.get("/auctions");
      state.auctions = data.sort((a, b) => b.id - a.id);
      emitter.emit("render");
    } catch (err) {
      state.auctions = [];
      alert(err.message);
    } finally {
      emitter.emit("stop-fetching");
    }
  });

  emitter.on("add-auction", auc => {
    if (!state.auctions) state.auctions = [];
    state.auctions.unshift(auc);
    emitter.emit(state.events.PUSHSTATE, "/");
  });

  emitter.on("add-bid", ({ auctionId, bid }) => {
    if (!state.auctions) return;
    state.auctions.forEach((auc, index) => {
      if (auc.id === auctionId) {
        state.auctions[index].bids.unshift(bid);
      }
    });
  });
}
