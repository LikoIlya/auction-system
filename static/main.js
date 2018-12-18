import app from "/app.js";
import authStore from "/stores/auth.js";
import fetchingStore from "/stores/fetching.js";
import auctionsStore from "/stores/auctions.js";
import dashboardView from "/views/dashboard.js";
import newAuctionView from "/views/new-auction.js";
import auctionView from "/views/auction.js";
import signInView from "/views/sign-in.js";
import signUpView from "/views/sign-up.js";
import notFoundView from "/views/not-found.js";

app.use(authStore);
app.use(fetchingStore);
app.use(auctionsStore);
app.route("/", withAuth(dashboardView));
app.route("#new-auction", withAuth(newAuctionView));
app.route("#auction/:id", withAuth(auctionView));
app.route("#sign-in", withoutAuth(signInView));
app.route("#sign-up", withoutAuth(signUpView));
app.route("*", notFoundView);
app.mount("body");

function withAuth(view) {
  return (state, emit) =>
    state.profile ? view(state, emit) : signInView(state, emit);
}

function withoutAuth(view) {
  return (state, emit) =>
    !state.profile ? view(state, emit) : notFoundView(state, emit);
}
