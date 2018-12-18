import api from "/api.js";

export default function signUpView(state, emit) {
  return html`
    <body class="text-center">
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
        <h1 class="h3 mb-1 font-weight-normal">Please sign up</h1>
        <h1 class="h4 mb-3 font-weight-normal">
          Or <a href="#sign-in">sign in</a>
        </h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          name="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <div class="mb-3"></div>
        <label for="inputFirstName" class="sr-only">First name</label>
        <input
          type="text"
          name="firstName"
          id="inputFirstName"
          class="form-control"
          placeholder="Firt name"
          required=""
        />
        <div class="mb-3"></div>
        <label for="inputLastName" class="sr-only">Last name</label>
        <input
          type="text"
          name="lastName"
          id="inputLastName"
          class="form-control"
          placeholder="Last name"
          required=""
        />
        <div class="mb-3"></div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign up
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
      params.age = 20;

      await api.post("/register", params);
      const { data: profile } = await api.post("/login", {
        email: params.email
      });
      emit("login", { ...profile, email: params.email });
    } catch (err) {
      alert(err.message);
    } finally {
      emit("stop-fetching");
    }
  }
}
